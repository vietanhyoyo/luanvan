import TeacherService from "services/objects/teacher.service";
import { useEffect, useState } from "react";
import { Avatar, Typography, Divider, Box } from "@mui/material";
import TotalIncomeCard from "ui-component/cards/Skeleton/TotalIncomeCard";
import StudentService from "services/objects/student.service";
const { default: MainCard } = require("ui-component/cards/MainCard")

const teacherService = new TeacherService();
const studentService = new StudentService();

function formatDateVN(dateString) {
    const date = new Date(dateString);
    const string = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    return string;
}

const InforCard = () => {

    const [student, setStudent] = useState({});
    const [loading, setLoading] = useState(true)

    const getTeacherInformation = async () => {
        try {
            const result = await studentService.getStudentInformation()
            console.log(result.data)
            setStudent(result.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getTeacherInformation();
    }, [])

    console.log(student)

    return loading ? (
        <TotalIncomeCard />
    ) : (<MainCard>
        <Avatar
            alt="profile"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9d0FxkqjeagODizu4EZbMXw_-OFAF2Go0J0RJjGgYMHIB_ilFiIc8YipxLobRhQlQYiI&usqp=CAU"
            sx={{ width: 80, height: 80, margin: "auto" }}
        />
        <Typography variant="h2" mt={2} sx={{ width: "100%", textAlign: "center" }} >
            {student.name}
        </Typography>
        <Typography variant="body1" mt={2} sx={{ width: "100%", textAlign: "center" }} >
            {student.class.name ?
                `Học sinh lớp ${student.class.name}`
                : " "}
        </Typography>
        <Divider />
        <Box>
            <Typography variant="body1" mt={2} sx={{ width: "100%" }} >
                Ngày sinh: {formatDateVN(student.birthday)}
            </Typography>
            <Typography variant="body1" mt={2} sx={{ width: "100%" }} >
                Dân tộc: {student.ethnic}
            </Typography>
            <Typography variant="body1" mt={2} sx={{ width: "100%" }} >
                Phụ huynh: {student.parent}
            </Typography>
        </Box>
        <Divider />
    </MainCard>)
}

export default InforCard;