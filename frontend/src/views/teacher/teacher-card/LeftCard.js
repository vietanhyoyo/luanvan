import TeacherService from "services/objects/teacher.service";
import { useEffect, useState } from "react";
import { Avatar, Typography, Divider, Box } from "@mui/material";
import TotalIncomeCard from "ui-component/cards/Skeleton/TotalIncomeCard";
const { default: MainCard } = require("ui-component/cards/MainCard")

const teacherService = new TeacherService();

function formatDateVN(dateString) {
    const date = new Date(dateString);
    const string = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    return string;
}

const LeftCard = () => {

    const [teacher, setTeacher] = useState({});
    const [loading, setLoading] = useState(true)

    const getTeacherInformation = async () => {
        try {
            const result = await teacherService.getInformation();
            setTeacher(result.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getTeacherInformation();
    }, [])

    console.log(teacher)

    return loading ? (
        <TotalIncomeCard />
    ) : (<MainCard>
        <Avatar
            alt="profile"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9d0FxkqjeagODizu4EZbMXw_-OFAF2Go0J0RJjGgYMHIB_ilFiIc8YipxLobRhQlQYiI&usqp=CAU"
            sx={{ width: 80, height: 80, margin: "auto" }}
        />
        <Typography variant="h2" mt={2} sx={{ width: "100%", textAlign: "center" }} >
            {teacher.name}
        </Typography>
        <Typography variant="body1" mt={2} sx={{ width: "100%", textAlign: "center" }} >
            {teacher.homeroomTeacher ?
                `Giáo viên chủ nhiệm lớp ${teacher.homeroomClass.name}`
                : "Giáo viên bộ môn"}
        </Typography>
        <Divider />
        <Box>
            <Typography variant="body1" mt={2} sx={{ width: "100%" }} >
                Chức vụ: { teacher.position }
            </Typography>
            <Typography variant="body1" mt={2} sx={{ width: "100%" }} >
                Ngày sinh: { formatDateVN(teacher.birthday) }
            </Typography>
            <Typography variant="body1" mt={2} sx={{ width: "100%" }} >
                SĐT: { teacher.phone }
            </Typography>
        </Box>
        <Divider />
    </MainCard>)
}

export default LeftCard;