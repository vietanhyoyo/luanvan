import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Avatar,
    Box,
    Button,
    ButtonBase,
    CardActions,
    Chip,
    ClickAwayListener,
    Divider,
    Grid,
    Paper,
    Popper,
    Stack,
    TextField,
    Typography,
    useMediaQuery,
    Badge
} from '@mui/material';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import Transitions from 'ui-component/extended/Transitions';
import NotificationList from './NotificationList';
import { IconBrandTelegram, IconBuildingStore, IconMailbox, IconPhoto, IconBrandZoom } from '@tabler/icons';

// assets
import { IconBell } from '@tabler/icons';
import NoNotification from './NoNotification';
import ManagementService from 'services/objects/management.service';
import ScheduleService from 'services/objects/schedule.service';
import StudentService from 'services/objects/student.service'

const studentService = new StudentService();
const managementService = new ManagementService();
const scheduleService = new ScheduleService();
const baseUrl = process.env.REACT_APP_BASE_URL;

// notification status options
const status = [
    {
        value: 'all',
        label: 'All Notification'
    },
    {
        value: 'new',
        label: 'New'
    },
    {
        value: 'unread',
        label: 'Unread'
    },
    {
        value: 'other',
        label: 'Other'
    }
];

// ==============================|| NOTIFICATION ||============================== //

const NotificationSection = () => {
    const theme = useTheme();
    const matchesXs = useMediaQuery(theme.breakpoints.down('md'));

    const [subject, setSubject] = useState(null)
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');
    const [amount, setAmount] = useState(0);
    const [learnStatus, setLearnStatus] = useState('offline');
    const [classID, setClassID] = useState('')
    const [notificationList, setNotificationList] = useState([])
    /**
     * anchorRef is used on different componets and specifying one type leads to other components throwing an error
     * */
    const socket = useRef();
    const anchorRef = useRef(null);
    const prevOpen = useRef(open);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    const getClassID = async () => {
        try {
            const result = await studentService.getStudentInformation();
            if (result.data.class._id !== undefined) {
                setClassID(result.data.class._id)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const openSocket = () => {
        const nDate = new Date()
        // const nDate = new Date()
        /**Gửi lên socket */
        socket.current.emit('online-meeting', {
            hour: nDate.getHours(),
            minute: nDate.getMinutes()
        });
        /**Lắng nghe socket */
        socket.current.on('online-meeting-client', data => {
            if (data.lessonNumber !== 0) {
                if (classID) getSubject(String(data.lessonNumber));
            } else {
                setNotificationList([])
                setAmount(0)
            }
        });
    }

    const getSubject = async (number) => {
        try {
            const result = await scheduleService.getScheduleLessonByClass(classID, number);
            if (result.data.status === 'on') {
                if(!result.data.data.subject) {
                    setSubject(null);
                setAmount(0);
                setNotificationList([])
                }
                const time = result.data.time;
                const dataSubject = result.data.data.subject;
                setSubject(dataSubject);
                setAmount(1);
                setNotificationList([{
                    icon: <IconBrandZoom stroke={1.5} size="1.3rem" />,
                    type: 'Đang diễn ra',
                    comment: `${time} phút trước`,
                    text: `Một tiết học ${dataSubject.name} đang diễn ra`,
                    buttonText: 'Tham gia lớp học',
                    isButton: true,
                    link: result.data.link !== null ? result.data.link.link : ""
                }])
            }
            else setSubject(null)
        } catch (error) {
            console.log(error)
        }
    }

    /**Lấy dữ liệu */
    const getAPI = async () => {
        try {
            const result = await managementService.get();
            const status = result.data.learnStatus
            if (status === 'online') {
                openSocket()
                setLearnStatus('online')
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (classID === '') {
            getClassID()
        }
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }
        prevOpen.current = open;

        const socketIO = io(baseUrl, { transports: ['websocket'] })
        socket.current = socketIO;

        getAPI()

        return () => {
            if (learnStatus === 'online')
                socket.current.removeAllListeners('online-meeting-client');
        }
    }, [open, classID]);

    const handleChange = (event) => {
        if (event?.target.value) setValue(event?.target.value);
    };

    return (
        <>
            <Box
                sx={{
                    ml: 2,
                    mr: 3,
                    [theme.breakpoints.down('md')]: {
                        mr: 2
                    }
                }}
            >
                <ButtonBase sx={{ borderRadius: '12px' }}>
                    <Badge
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        badgeContent={amount}
                        color="secondary">
                        <Avatar
                            variant="rounded"
                            sx={{
                                ...theme.typography.commonAvatar,
                                ...theme.typography.mediumAvatar,
                                transition: 'all .2s ease-in-out',
                                background: theme.palette.grey[200],
                                color: theme.palette.primary.main,
                                '&[aria-controls="menu-list-grow"],&:hover': {
                                    background: theme.palette.primary.dark,
                                    color: theme.palette.primary.light
                                }
                            }}
                            ref={anchorRef}
                            aria-controls={open ? 'menu-list-grow' : undefined}
                            aria-haspopup="true"
                            onClick={handleToggle}
                            color="inherit"
                        >
                            <IconBell stroke={1.5} size="1.3rem" />
                        </Avatar>
                    </Badge>
                </ButtonBase>
            </Box>
            <Popper
                placement={matchesXs ? 'bottom' : 'bottom-end'}
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                popperOptions={{
                    modifiers: [
                        {
                            name: 'offset',
                            options: {
                                offset: [matchesXs ? 5 : 0, 20]
                            }
                        }
                    ]
                }}
            >
                {({ TransitionProps }) => (
                    <Transitions position={matchesXs ? 'top' : 'top-right'} in={open} {...TransitionProps}>
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MainCard border={false} elevation={16} content={false} boxShadow shadow={theme.shadows[16]}>
                                    <Grid container direction="column" spacing={2}>
                                        <Grid item xs={12}>
                                            <Grid container alignItems="center" justifyContent="space-between" sx={{ pt: 2, px: 2 }}>
                                                <Grid item>
                                                    <Stack direction="row" spacing={2}>
                                                        <Typography variant="subtitle1">Thông báo</Typography>
                                                        <Chip
                                                            size="small"
                                                            label={amount}
                                                            sx={{
                                                                color: theme.palette.background.default,
                                                                bgcolor: theme.palette.warning.dark
                                                            }}
                                                        />
                                                    </Stack>
                                                </Grid>
                                                <Grid item>
                                                    <Typography component={Link} to="#" variant="subtitle2" color="primary">
                                                        Đánh dấu đã đọc
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <PerfectScrollbar
                                                style={{ height: '100%', maxHeight: 'calc(100vh - 205px)', overflowX: 'hidden' }}
                                            >
                                                <Grid container direction="column" spacing={2}>
                                                    {/* <Grid item xs={12}>
                                                        <Box sx={{ px: 2, pt: 0.25 }}>
                                                            <TextField
                                                                id="outlined-select-currency-native"
                                                                select
                                                                fullWidth
                                                                value={value}
                                                                onChange={handleChange}
                                                                SelectProps={{
                                                                    native: true
                                                                }}
                                                            >
                                                                {status.map((option) => (
                                                                    <option key={option.value} value={option.value}>
                                                                        {option.label}
                                                                    </option>
                                                                ))}
                                                            </TextField>
                                                        </Box>
                                                    </Grid> */}
                                                    <Grid item xs={12} p={0}>
                                                        <Divider sx={{ my: 0 }} />
                                                    </Grid>
                                                </Grid>
                                                {
                                                    notificationList.length !== 0 ?
                                                        notificationList.map(
                                                            (row, index) =>
                                                                <NotificationList
                                                                    key={index}
                                                                    icon={row.icon}
                                                                    type={row.type}
                                                                    comment={row.comment}
                                                                    text={row.text}
                                                                    buttonText={row.buttonText}
                                                                    isButton={row.isButton}
                                                                    link={row.link}
                                                                />
                                                        )
                                                        : <NoNotification
                                                            type={"..."}
                                                            comment={"..."}
                                                            text={"Không có thông báo!"}
                                                        />
                                                }
                                            </PerfectScrollbar>
                                        </Grid>
                                    </Grid>
                                    <Divider />
                                    <CardActions sx={{ p: 1.25, justifyContent: 'center' }}>
                                        <Button size="small" disableElevation>
                                            Xem thêm
                                        </Button>
                                    </CardActions>
                                </MainCard>
                            </ClickAwayListener>
                        </Paper>
                    </Transitions>
                )}
            </Popper>
        </>
    );
};

export default NotificationSection;
