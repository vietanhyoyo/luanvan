

import * as React from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead,
    TableRow, AccordionDetails,
    Typography, Accordion, AccordionSummary, Box
} from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ScheduleService from 'services/objects/schedule.service';
import ScheduleHover from './ScheduleHover';
import { useTheme } from '@emotion/react';
import { useSelector } from 'react-redux';
import ScheduleLesson from './ScheduleLesson'

function createData(number, monday, tuesday, wednesday, thursday, friday) {
    return { number, monday, tuesday, wednesday, thursday, friday };
}

const scheduleService = new ScheduleService()

const rows = [
    createData('1', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu'),
    createData('2', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu'),
    createData('3', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu'),
    createData('4', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu'),
    createData('5', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu'),
    createData('', '', '', '', '', ''),
    createData('6', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu'),
    createData('7', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu'),
    createData('8', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu'),
    createData('9', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu'),
];

const Schedule = () => {
    const theme = useTheme();
    const customization = useSelector((state) => state.customization);
    const [schedule, setSchedule] = React.useState({
        _id: ""
    })
    const [classID, setClassID] = React.useState("")

    React.useEffect(async () => {
        try {
            const result = await scheduleService.getScheduleOfUser()
            console.log(result)
            setSchedule(result.data.schedule)
            setClassID(result.data.classID)
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
                    <TableContainer>
                        <Table sx={{ minWidth: 450 }} aria-label="simple table" size='small'>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Tiết</TableCell>
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
                                        <TableCell align="center">{row.number}</TableCell>
                                        <TableCell align="center">
                                            <ScheduleLesson
                                                scheduleID={schedule._id}
                                                classID={classID}
                                                weekday={row.monday}
                                                lessonNumber={row.number}
                                            />
                                        </TableCell>
                                        <TableCell align="center">
                                            <ScheduleLesson
                                                scheduleID={schedule._id}
                                                classID={classID}
                                                weekday={row.tuesday}
                                                lessonNumber={row.number}
                                            />
                                        </TableCell>
                                        <TableCell align="center">
                                            <ScheduleLesson
                                                scheduleID={schedule._id}
                                                classID={classID}
                                                weekday={row.wednesday}
                                                lessonNumber={row.number}
                                            />
                                        </TableCell>
                                        <TableCell align="center">
                                            <ScheduleLesson
                                                scheduleID={schedule._id}
                                                classID={classID}
                                                weekday={row.thursday}
                                                lessonNumber={row.number}
                                            />
                                        </TableCell>
                                        <TableCell align="center">
                                            <ScheduleLesson
                                                scheduleID={schedule._id}
                                                classID={classID}
                                                weekday={row.friday}
                                                lessonNumber={row.number}
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

export default Schedule;