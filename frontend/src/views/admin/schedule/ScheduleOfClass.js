import { useEffect, useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import ScheduleService from "services/objects/schedule.service";
import SubjectService from "services/objects/subject.service";
import ScheduleEditLesson from "./ScheduleEditLesson"
import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Snackbar, LinearProgress
} from '@mui/material';

const scheduleService = new ScheduleService();
const subjectService = new SubjectService();

const ScheduleOfClass = ({ scheduleID, classID, weekday, nameOfClass }) => {

    const [loading, setLoading] = useState(true);
    const [lessonList, setLessonList] = useState([])
    const [subjectList, setSubjectList] = useState([]);

    const getAPI = async () => {
        try {
            const result = await scheduleService.getScheduleLessonByWeekdayAndClass(scheduleID, classID, weekday);
            setLessonList(result.data);
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    const getAllSubject = async () => {
        try {
            const result = await subjectService.getAll()
            setSubjectList(result.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAPI();
        getAllSubject();
    }, [])

    const renderMorning = () => {
        const array = [];
        for (let i = 0; i < 5; i++) {
            let string = '--'
            if (lessonList[i].subject) string = lessonList[i].subject.name;
            let row = <TableRow key={i}>
                <ScheduleEditLesson
                    subjectString={string}
                    lessonID={lessonList[i]._id}
                    classID={classID}
                    subjectProps={subjectList}
                    onUpdateLesson={getAPI}
                />
            </TableRow>
            array.push(row)
        }
        return array.map(row => row);
    }

    const renderAfternoon = () => {
        const array = [];
        for (let i = 5; i < 9; i++) {
            let string = '--'
            if (lessonList[i].subject) string = lessonList[i].subject.name;
            let row = <TableRow key={i}>
                <ScheduleEditLesson
                    subjectString={string}
                    lessonID={lessonList[i]._id}
                    classID={classID}
                    subjectProps={subjectList}
                    onUpdateLesson={getAPI}
                />
            </TableRow>
            array.push(row)
        }
        return array.map(row => row);
    }

    return (
        loading
            ?
            <CircularProgress />
            :
            <>
                <TableContainer sx={{ padding: "0px", borderRadius: '0px' }}>
                    <Table aria-label="simple table" size="small">
                        <TableBody>
                            <TableRow>
                                <TableCell min-width="30px" align="center">
                                    <span color="#8492c400"><b>Lớp {nameOfClass}</b></span>
                                </TableCell>
                            </TableRow>
                            {renderMorning()}
                            <TableRow>
                                <TableCell min-width="30px" align="center">
                                    <span sx={{ color: "#fff" }}><b>Lớp {nameOfClass}</b></span>
                                </TableCell>
                            </TableRow>
                            {renderAfternoon()}
                        </TableBody>
                    </Table>
                </TableContainer>
            </>
    )

}
export default ScheduleOfClass;