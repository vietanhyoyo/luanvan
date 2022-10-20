// material-ui
import { Grid, Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import LabelCard from 'ui-component/class/LabelCard'
import Schedule from './student-home/Schedule';
import New from './student-home/New'
// material-ui
import { styled, useTheme } from '@mui/material/styles';

import { gridSpacing } from 'store/constant';
import { useState, useEffect } from 'react'
import NewsService from "services/objects/news.service";
import AdminService from "services/objects/admin.service";
import StudentService from 'services/objects/student.service';
import News from "views/teacher/teacher-news/News";
import InforCard from './student-card/InforCard';

// ==============================|| SAMPLE PAGE ||============================== //
const newsService = new NewsService()
const adminService = new AdminService()
const studentService = new StudentService()
// styles

const StudentHome = () => {

    const [loading, setLoading] = useState(true)
    const [newsList, setNewsList] = useState([])
    const [student, setStudent] = useState({
        class: {
            name: null
        }
    })
    const [user, setUser] = useState({
        _id: ''
    })

    const getStudentInfor = async () => {
        try {
            const result = await studentService.getStudentInformation();
            setStudent(result.data)
        } catch (error) {
            console.log(error)
        }
    }

    const getAll = async () => {
        try {
            const result = await newsService.getAll()
            setLoading(false)
            setNewsList(result.data)
        } catch (error) {
            console.log(error)
        }
    }

    const getUser = async () => {
        try {
            const result = await adminService.getUserInfo()
            setUser(result.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAll()
        getUser()
        getStudentInfor()
    }, [])

    return (
        <Grid container spacing={gridSpacing} justifyContent="center">
            <Grid item lg={10} md={10} sm={12} xs={12}>
                <Grid container spacing={gridSpacing} justifyContent={"center"}>
                    <Grid item lg={8} md={12} sm={12} xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item sm={12} xs={12} md={12} lg={12}>
                                <Schedule />
                            </Grid>
                            <Grid item xs={12}>
                                {
                                    newsList.map((row, index) => {
                                        return <News
                                            newsData={row}
                                            key={index}
                                            userID={user._id}
                                            userInfor={user}
                                        />
                                    })
                                }
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item lg={4} md={12} sm={12} xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item sm={12} xs={12} md={12} lg={12}>
                                <LabelCard 
                                isLoading={false} 
                                classroomName={student.class.name || " "}
                                />
                            </Grid>
                            <Grid item sm={12} xs={12} md={12} lg={12}>
                                <InforCard />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
};

export default StudentHome;
