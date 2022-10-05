
// project imports
import MainCard from 'ui-component/cards/MainCard';
import { useState, useEffect, memo } from 'react'
// material-ui
import {
    Button, Box, Dialog, DialogTitle, DialogContent, DialogActions,
    TextField, CircularProgress, FormControl, Select, InputLabel, MenuItem
} from '@mui/material'
import moment from 'moment';
import {
    IconPlus
} from '@tabler/icons';
import LessonService from 'services/objects/lesson.service';

function formatInputDate(dateString) {
    let date = new Date(Date.now());
    if (dateString !== '')
        date = new Date(dateString);
    return moment(date).format('YYYY-MM-DD');
}

const lessonService = new LessonService();

const WeekList = (props) => {

    const [loading, setLoading] = useState(true);
    // const [open, setOpen] = useState(false);
    const [weekList, setWeekList] = useState([]);
    const [selectWeek, setSelectWeek] = useState(0);
    const [semester, setSemester] = useState(1)
    // const [week, setWeek] = useState(() => {
    //     const date = new Date(Date.now());
    //     let semester;
    //     if (date.getMonth() + 1 > 6) {
    //         semester = '1';
    //     } else semester = '2';
    //     return {
    //         semester,
    //         name: "1",
    //         startDate: formatInputDate(''),
    //         endDate: formatInputDate('')
    //     }
    // })

    const getAPI = async () => {
        try {
            const result = await lessonService.getAll(semester.toString());
            props.changeWeek(result.data[0]);
            setWeekList(result.data)
            setLoading(false);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAPI();
    }, [semester])

    // const handleClose = () => {
    //     setOpen(false);
    // };

    // const handleOpen = () => {
    //     setOpen(true);
    // }

    // const handleChangeNameWeek = (value) => {
    //     let weekNumber = value;
    //     if (Number(value) < 1) weekNumber = '1';

    //     setWeek(prev => ({
    //         ...prev,
    //         name: weekNumber
    //     }))
    // }

    // const handleAddWeek = () => {
    //     console.log(week);
    // }

    const handleSelectWeek = (index) => {
        setSelectWeek(index)
        props.changeWeek(weekList[index]);
        props.getSubjectLessonList(weekList[index]._id)
    }

    return <>
        <MainCard title={
            <FormControl fullWidth>
                <Select
                    labelId="hocki"
                    size="small"
                    value={semester}
                    onChange={event => setSemester(event.target.value)}
                >
                    <MenuItem value={1}>Học kì 1</MenuItem>
                    <MenuItem value={2}>Học kì 2</MenuItem>
                </Select>
            </FormControl>
        }>{
                loading
                    ?
                    <CircularProgress />
                    :
                    <Box>{weekList.map((row, index) =>
                        <Button
                            variant={index === selectWeek ? "outlined" : "text"}
                            sx={{ width: "100%" }}
                            key={index} onClick={() => handleSelectWeek(index)}
                        >
                            Tuần {row.name}
                        </Button>)}
                    </Box>}
        </MainCard>
        {/* <Dialog
            open={open}
            onClose={handleClose}
        >
            <DialogTitle>
                {"Thêm mới một lớp học"}
            </DialogTitle>
            <DialogContent sx={{}}>
                <Box sx={{ paddingTop: '20px', width: 400 }}>
                    <Box sx={{ padding: '14px 0' }}>
                        <TextField
                            required
                            label="Số tuần"
                            variant="outlined"
                            type="number"
                            sx={{ width: '100%' }}
                            InputLabelProps={{ shrink: true, }}
                            value={week.name}
                            onChange={(event) => handleChangeNameWeek(event.target.value)}
                        />
                    </Box>
                    <Box sx={{ padding: '14px 0' }}>
                        <TextField
                            required
                            label="Ngày bắt đầu"
                            variant="outlined"
                            type="date"
                            sx={{ width: '100%' }}
                            InputLabelProps={{ shrink: true, }}
                            value={week.startDate ? formatInputDate(week.startDate) : formatInputDate('')}
                            onChange={(event) => setWeek(prev => ({
                                ...prev,
                                startDate: event.target.value
                            }))}
                        />
                    </Box>
                    <Box sx={{ padding: '14px 0' }}>
                        <TextField
                            required
                            label="Ngày kết thúc"
                            variant="outlined"
                            type="date"
                            sx={{ width: '100%' }}
                            InputLabelProps={{ shrink: true, }}
                            value={week.endDate ? formatInputDate(week.endDate) : formatInputDate('')}
                            onChange={(event) => setWeek(prev => ({
                                ...prev,
                                endDate: event.target.value
                            }))}
                        />
                    </Box>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Hủy</Button>
                <Button autoFocus onClick={handleAddWeek}>
                    Thêm
                </Button>
            </DialogActions>
        </Dialog> */}
    </>
}

export default memo(WeekList);