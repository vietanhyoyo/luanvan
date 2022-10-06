
import { useEffect } from "react";
import TeacherService from "services/objects/teacher.service";
import { useNavigate } from "react-router-dom";

const teacherService = new TeacherService();
const TeacherRoute = () => {
    const navigate = useNavigate()

    useEffect(async () => {
        try {
            const result = await teacherService.getInformation();
            const data = result.data;
            if (data) {
                if (data.homeroomTeacher) {
                    navigate(`/teacher/home`);
                } else {
                    navigate('/teacher/subject-teacher-class');
                }
            }
        } catch (error) {
            console.log(error);
        }
    }, [])

    return <div>Teacher Route</div>
}

export default TeacherRoute;