// material-ui
import {
    Grid, Box, Typography, FormControl,
    MenuItem, Select
} from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import LabelCard from 'ui-component/class/LabelCard';
import { useState, useEffect } from 'react'
import { gridSpacing } from 'store/constant';
import Content from './teacher-class/Content';
import AddContent from './teacher-class/AddContent';
import ClassService from 'services/objects/class.service';
import LessonService from 'services/objects/lesson.service';
import ClassContentService from 'services/objects/classContent.service';
import LeftCard from './teacher-card/LeftCard';

const classService = new ClassService();
const lessonService = new LessonService();
const classContentService = new ClassContentService();

const TeacherClass = () => {

    const [loading, setLoading] = useState(true)
    const [classObject, setClassObject] = useState({
        _id: "",
        grade: "",
        name: ""
    });
    const [lessonList, setLessonList] = useState([]);
    const [classContents, setClassContents] = useState([])

    const getClass = async () => {
        try {
            // const result = await classService.getClassById(classID);
            const result = await classService.getHomeroomClassByTeacher();
            setClassObject(result.data);
        } catch (error) {
            console.log(error);
        }
    }

    const getClassContentList = async () => {
        try {
            const result = await classContentService.getALL(classObject._id);
            setClassContents(result.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (classObject._id === "") {
            getClass();
        } else {
            getClassContentList();
        }
    }, [classObject])

    return (
        <>
            <Grid container spacing={gridSpacing} >
                <Grid item xs={12}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item lg={8} md={8} sm={12} xs={12}>
                            <Grid container spacing={gridSpacing}>
                                {/* <Grid item sm={12} xs={12} md={12} lg={12}>
                                    <LabelCard isLoading={false} classroomName={classObject.name} />
                                </Grid> */}
                                <Grid item sm={12} xs={12} md={12} lg={12}>
                                    <MainCard title={
                                        <Box sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            width: "100%"
                                        }}>
                                            <Typography variant="h3">Lớp {classObject.name}</Typography>
                                            <Box display={'flex'}>
                                                {console.log("class: ", classObject._id)}
                                                <AddContent
                                                    classID={classObject._id}
                                                    getAPI={getClassContentList}
                                                />
                                            </Box>
                                        </Box>
                                    }>
                                        {classContents.length === 0
                                            ? <p>Chưa có nội dung</p>
                                            : classContents.map((row, index) =>
                                                <Content
                                                    key={index}
                                                    contentId={row._id}
                                                    reLoadAPI={getClassContentList}
                                                />
                                            )}
                                    </MainCard>
                                </Grid>
                            </Grid>
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
        </>
    )
}

export default TeacherClass;