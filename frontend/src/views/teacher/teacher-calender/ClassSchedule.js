

import * as React from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead,
    TableRow, AccordionDetails,
    Typography, Accordion, AccordionSummary, Box
} from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ScheduleService from 'services/objects/schedule.service';
import { useTheme } from '@emotion/react';
import { useSelector } from 'react-redux';
import ScheduleLesson from './ScheduleLesson'

function createData(time, number, monday, tuesday, wednesday, thursday, friday) {
    return { time, number, monday, tuesday, wednesday, thursday, friday };
}

const scheduleService = new ScheduleService()

const rows = [
    createData('7:00-7:35', '1', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu'),
    createData('7:45-8:20', '2', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu'),
    createData('8:50-9:25', '3', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu'),
    createData('9:35-10:10', '4', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu'),
    createData('10:20-10:55', '5', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu'),
    createData('', '', '', '', '', '', ''),
    createData('14:00-14:35', '6', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu'),
    createData('15:00-15:35', '7', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu'),
    createData('15:45-16:20', '8', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu'),
    createData('16:30-17:05', '9', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu'),
];

const ClassSchedule = () => {
    const theme = useTheme();
    const customization = useSelector((state) => state.customization);
    const [schedule, setSchedule] = React.useState({
        _id: ""
    })
    const [classID, setClassID] = React.useState("")
    const [teacherID, setTeacherID] = React.useState("")

    React.useEffect(async () => {
        try {
            const result = await scheduleService.getScheduleOfUser()
            setSchedule(result.data.schedule)
            setClassID(result.data.classID)
            setTeacherID(result.data.teacherID)
        } catch (error) {
            console.log(error)
        }
    }, [])

    return (<>
        <Box sx={{
            borderRadius: `${customization.borderRadius}px`,
            backgroundColor: theme.palette.background.paper,
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: theme.palette.primary[200] + 75
        }}>
            <Accordion sx={{ background: 'none' }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography>Thời khóa biểu</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ padding: '0px' }}>
                    <TableContainer size='small'>
                        <Table sx={{ minWidth: 450 }} aria-label="simple table" size='small'>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="left">Tiết</TableCell>
                                    <TableCell align="left">Thời gian</TableCell>
                                    <TableCell align="center" flex={1}>Thứ hai</TableCell>
                                    <TableCell align="center" flex={1}>Thứ ba</TableCell>
                                    <TableCell align="center" flex={1}>Thứ tư</TableCell>
                                    <TableCell align="center" flex={1}>Thứ năm</TableCell>
                                    <TableCell align="center" flex={1}>Thứ sáu</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row, index) => (
                                    <TableRow
                                        key={index}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align="left">{row.number}</TableCell>
                                        <TableCell align="left">{row.time}</TableCell>
                                        <TableCell align="center">
                                            <ScheduleLesson
                                                scheduleID={schedule._id}
                                                classID={classID}
                                                weekday={row.monday}
                                                lessonNumber={row.number}
                                                teacherID={teacherID}
                                            />
                                        </TableCell>
                                        <TableCell align="center">
                                            <ScheduleLesson
                                                scheduleID={schedule._id}
                                                classID={classID}
                                                weekday={row.tuesday}
                                                lessonNumber={row.number}
                                                teacherID={teacherID}
                                            />
                                        </TableCell>
                                        <TableCell align="center">
                                            <ScheduleLesson
                                                scheduleID={schedule._id}
                                                classID={classID}
                                                weekday={row.wednesday}
                                                lessonNumber={row.number}
                                                teacherID={teacherID}
                                            />
                                        </TableCell>
                                        <TableCell align="center">
                                            <ScheduleLesson
                                                scheduleID={schedule._id}
                                                classID={classID}
                                                weekday={row.thursday}
                                                lessonNumber={row.number}
                                                teacherID={teacherID}
                                            />
                                        </TableCell>
                                        <TableCell align="center">
                                            <ScheduleLesson
                                                scheduleID={schedule._id}
                                                classID={classID}
                                                weekday={row.friday}
                                                lessonNumber={row.number}
                                                teacherID={teacherID}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </AccordionDetails>
            </Accordion>
        </Box>
    </>
    )
}

export default ClassSchedule;