import ClassCard from "./teacher-week-lesson/ClassCard";
import TeacherService from "services/objects/teacher.service";
import { Box, Grid } from "@mui/material";
import { Link } from 'react-router-dom'
import { useEffect, useState } from "react";
import SubjectCard from "./teacher-home/SubjectCard";
import { useNavigate } from "react-router-dom";
import MainCard from "ui-component/cards/MainCard";
import LeftCardHome from "./teacher-home/LeftCardHome";
import { gridSpacing } from 'store/constant';

const teacherService = new TeacherService();

const TeacherHome = () => {
    const navigate = useNavigate();
    const [teacher, setTeacher] = useState(null);
    const [classList, setClassList] = useState([])

    const getClassInCharge = async () => {
        try {
            const result = await teacherService.getClassInCharge();
            setClassList(result.data.classInCharge);
        } catch (error) {
            console.log(error);
        }
    }

    const getTeacherInformation = async () => {
        try {
            const result = await teacherService.getInformation();
            const data = result.data;
            console.log("homeroom")
            if (data !== "") {
                if (data.homeroomTeacher === false) {
                    navigate("/teacher/subject-teacher-class");
                }
                setTeacher(data)
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (teacher !== null)
            getClassInCharge();
        else {
            console.log("homeroom1")
            getTeacherInformation();
        }
    }, [teacher])

    return <>
        <Grid container spacing={gridSpacing} >
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing} >
                    <Grid item lg={8} md={8} sm={12} xs={12}>
                        {
                            classList.length === 0 ? <div>Chưa tìm thấy</div> :
                                classList.map((row, index) => {
                                    return <Box mb={3} key={index}>
                                        <Link to={`/teacher/class`}>
                                            <ClassCard isLoading={false} classInCharge={row} />
                                        </Link>
                                    </Box>
                                })
                        }
                        {
                            classList.length === 0 ? <div>Chưa tìm thấy</div> :
                                classList.map((row, index) => {
                                    return <Box mb={3} key={index}>
                                        <Link to={`/teacher/weeklesson/${row._id}`}>
                                            <SubjectCard isLoading={false} classInCharge={row} />
                                        </Link>
                                    </Box>
                                })
                        }
                    </Grid>
                    <Grid item lg={4} md={4} sm={12} xs={12}>
                        <LeftCardHome />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </>
}

export default TeacherHome;