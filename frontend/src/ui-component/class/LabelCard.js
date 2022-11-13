import PropTypes from 'prop-types';

// material-ui
import { styled } from '@mui/material/styles';
import {
    Box, List, Badge, Typography
}
    from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import TotalIncomeCard from 'ui-component/cards/Skeleton/TotalIncomeCard';
import io from 'socket.io-client';
import { useRef, useEffect, useState } from 'react';
import ManagementService from 'services/objects/management.service';
import ScheduleService from 'services/objects/schedule.service';

const managementService = new ManagementService();
const scheduleService = new ScheduleService();
const baseUrl = process.env.REACT_APP_BASE_URL;

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));

// styles
const CardWrapper = styled(MainCard)(({ theme }) => ({
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.light,
    overflow: 'hidden',
    position: 'relative',
    '&:after': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: `linear-gradient(210.04deg, ${theme.palette.primary[200]} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
        borderRadius: '50%',
        top: -30,
        right: -180
    },
    '&:before': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: `linear-gradient(140.9deg, ${theme.palette.primary[200]} -14.02%, rgba(144, 202, 249, 0) 77.58%)`,
        borderRadius: '50%',
        top: -160,
        right: -130
    }
}));

const AnimateText = styled(Typography)(({ theme }) => ({
    animation: 'tiptak 1s infinite linear',
    '@keyframes tiptak': {
        '0%': {
            color: theme.palette.grey[50]
        },
        '25%': {
            color: theme.palette.warning.dark
        },
        '75%': {
            color: theme.palette.success.main
        },
        '100%': {
            color: theme.palette.grey[50]
        },
    },
}));

// ==============================|| DASHBOARD - TOTAL INCOME DARK CARD ||============================== //

const LabelCard = ({ isLoading, classroomName, classID }) => {

    const [learnStatus, setLearnStatus] = useState('offline');
    const [subject, setSubject] = useState(null)
    const [link, setLink] = useState(null)
    /**Socket để kết nối đến server */
    const socket = useRef();

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
            }
            else {
                setSubject(null);
                setLink(null);
            }
        });
    }

    const getSubject = async (number) => {
        try {
            const result = await scheduleService.getScheduleLessonByClass(classID, number);
            if (result.data.status === 'on') {
                if (result.data.data.subject) {
                    setSubject(result.data.data.subject)
                    if (result.data.link) {
                        setLink(result.data.link.link)
                    }
                }
                else setSubject(null)
            } else setSubject(null)
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

    /**Kết nối với socket */
    useEffect(() => {
        const socketIO = io(baseUrl, { transports: ['websocket'] })
        socket.current = socketIO;

        getAPI()

        return () => {
            if (learnStatus === 'online')
                socket.current.removeAllListeners('online-meeting-client');
        }
    }, [classID]);

    return (
        <>
            {isLoading ? (
                <TotalIncomeCard />
            ) : (
                <CardWrapper border={false} content={false}>
                    <Box sx={{ p: 2 }}>
                        <List sx={{ py: 0 }}>
                            <Typography variant="h2" sx={{ color: '#fff' }}>
                                Lớp {classroomName || " "}
                            </Typography>
                            {subject ?
                                <StyledBadge
                                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                                    variant="dot"
                                >
                                    <a href={link || ''} target={link && "_blank"}>
                                        <AnimateText>
                                            Môn " {subject.name} " đang diễn ra...
                                        </AnimateText>
                                    </a>
                                </StyledBadge> : <div></div>
                            }
                        </List>
                    </Box>
                </CardWrapper>
            )}
        </>
    );
};

LabelCard.propTypes = {
    isLoading: PropTypes.bool
};

export default LabelCard;
