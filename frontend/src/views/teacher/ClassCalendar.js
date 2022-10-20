import ClassSchedule from "./teacher-calender/ClassSchedule";
import SubjectTeacherSchedule from "./teacher-calender/SubjectTeacherSchedule";
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import TeacherService from "services/objects/teacher.service";
import { useState, useEffect } from "react"

const teacherService = new TeacherService();

const ClassCalendar = () => {

    const [teacher, setTeacher] = useState(null);

    const getTeacher = async () => {
        try {
            const result = await teacherService.getInformation();
            setTeacher(result.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getTeacher();
    }, [])

    if (!teacher) return <Box sx={{ width: '100%' }}>
        <LinearProgress />
    </Box>
    else return <>
        {
            teacher.homeroomTeacher ?
                <ClassSchedule /> : <SubjectTeacherSchedule />
        }
    </>
}

export default ClassCalendar;