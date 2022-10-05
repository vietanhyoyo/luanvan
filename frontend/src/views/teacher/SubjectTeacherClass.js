import { Box, Grid } from '@mui/material'
import { Link } from 'react-router-dom';
import TeacherService from "services/objects/teacher.service";
import SiteService from "services/objects/site.service";
import { useEffect, useState } from "react";
import ClassCard from "./teacher-week-lesson/ClassCard";
import { gridSpacing } from 'store/constant';
import LeftCard from './teacher-card/LeftCard';

const teacherService = new TeacherService();

const SubjectTeacherClass = () => {

    const [classList, setClassList] = useState([])

    const getClassInCharge = async () => {
        try {
            const result = await teacherService.getClassInCharge();
            setClassList(result.data.classInCharge);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getClassInCharge();
    }, [])

    return <div>
        <Grid container spacing={gridSpacing} >
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing} >
                    <Grid item lg={8} md={8} sm={12} xs={12}>
                        {
                            classList.length === 0 ? <div>Chưa tìm thấy</div> :
                                classList.map((row, index) => {
                                    return <Box mb={3} key={index}>
                                        <Link to={`/teacher/weeklesson/${row._id}`}>
                                            <ClassCard isLoading={false} classInCharge={row} />
                                        </Link>
                                    </Box>
                                })
                        }
                    </Grid>
                    <Grid item lg={4} md={4} sm={12} xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item sm={12} xs={12} md={12} lg={12}>
                                <LeftCard />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </div>
}

export default SubjectTeacherClass;