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
import Content from './teacher-week-lesson/Content';
import WeekList from './teacher-week-list/WeekList';
import AddLesson from './teacher-week-lesson/AddLesson';
import ClassService from 'services/objects/class.service';
import LessonService from 'services/objects/lesson.service';
import { useParams } from 'react-router-dom';

const classService = new ClassService();
const lessonService = new LessonService();

const TeacherWeekLesson = () => {

    const { classID } = useParams();
    const [loading, setLoading] = useState(true)
    const [week, setWeek] = useState({
        _id: "",
        name: "",
        semester: "",
        startDate: "",
        endDate: "",
        isDelete: ""
    });
    const [classObject, setClassObject] = useState({
        _id: "",
        grade: ""
    });
    const [subjectLessonList, setSubjectLessonList] = useState([]);
    const [subjectSelect, setSubjectSelect] = useState(0);
    const [lessonList, setLessonList] = useState([]);

    const getClass = async () => {
        try {
            const result = await classService.getClassById(classID);
            setClassObject(result.data);
        } catch (error) {
            console.log(error);
        }
    }

    const getLessonList = async () => {
        if (week._id === "" ||
            classObject.grade === "" ||
            subjectLessonList.length === 0)
            return;
        else
            try {
                const result = await lessonService.getLessonsBySubjectWeekGrade(
                    classObject.grade,
                    week._id,
                    subjectLessonList[subjectSelect]._id
                )
                if (result.data === "") {
                    setLessonList([])
                }
                else {
                    setLessonList(result.data)
                    if (loading)
                        setLoading(false)
                }
            } catch (error) {
                console.log(error);
            }
    }

    const getLessonListBySubject = async (index) => {
        if (week._id === "" ||
            classObject.grade === "" ||
            subjectLessonList.length === 0)
            return;
        else
            try {
                const result = await lessonService.getLessonsBySubjectWeekGrade(
                    classObject.grade,
                    week._id,
                    subjectLessonList[index]._id
                )
                if (result.data === "") {
                    setLessonList([])
                }
                else {
                    setLessonList(result.data)
                }
            } catch (error) {
                console.log(error);
            }
    }

    const changeWeek = (input) => {
        setWeek(input)
    }

    const getSubjectLessonList = async () => {
        try {
            const result = await lessonService.getSubjectInWeek(classObject.grade, week._id);
            if (result.data === "") {
                setSubjectLessonList([]);
            } else {
                setSubjectLessonList(result.data);
            }
            if (loading)
                setLoading(false)
        } catch (error) {
            console.log(error);
        }
    }

    const getSubjectLessonListWeekID = async (weekID) => {
        try {
            const result = await lessonService.getSubjectInWeek(classObject.grade, weekID);
            if (result.data === "") {
                setSubjectLessonList([]);
            } else {
                setSubjectLessonList(result.data);
            }
            if (loading)
                setLoading(false)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (classObject._id === "") {
            getClass();
        }
        if (week._id !== "" && classObject.grade !== "" && subjectLessonList.length === 0 && loading) {
            getSubjectLessonList();
        }
        if (subjectLessonList.length > 0) {
            getLessonList()
        }
    }, [week, classObject, subjectSelect, subjectLessonList])

    return (
        <>
            <Grid container spacing={gridSpacing} >
                <Grid item xs={12}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item lg={9} md={9} sm={12} xs={12}>
                            <Grid container spacing={gridSpacing}>
                                <Grid item sm={12} xs={12} md={12} lg={12}>
                                    <LabelCard isLoading={false} classroomName={classObject.name} />
                                </Grid>
                                <Grid item sm={12} xs={12} md={12} lg={12}>
                                    <MainCard title={
                                        <Box sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            width: "100%"
                                        }}>
                                            <Typography variant="h3">Thông tin tuần học {week.name}</Typography>
                                            <Box display={'flex'}>
                                                <AddLesson
                                                    grade={classObject.grade}
                                                    week={week}
                                                    getLessonList={getLessonList}
                                                    getSubjectLessonList={getSubjectLessonList} />
                                                <FormControl>
                                                    <Select
                                                        labelId="mon"
                                                        value={subjectSelect}
                                                        size="small"
                                                        onChange={(event) => setSubjectSelect(event.target.value)}
                                                    >
                                                        {
                                                            subjectLessonList === []
                                                                ?
                                                                <MenuItem value={0}>Rỗng</MenuItem>
                                                                :
                                                                subjectLessonList.map((row, index) => {
                                                                    return <MenuItem key={index} value={index}>
                                                                        {row.name}
                                                                    </MenuItem>
                                                                })
                                                        }
                                                    </Select>
                                                </FormControl>
                                            </Box>
                                        </Box>
                                    }>
                                        {
                                            lessonList.length === 0
                                                ? <p>Chưa có nội dung</p>
                                                : lessonList.map((row, index) =>
                                                    <Content
                                                        key={index}
                                                        lesson={row}
                                                        grade={classObject.grade}
                                                        week={week}
                                                        getLessonList={getLessonList} />
                                                )
                                        }
                                    </MainCard>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item lg={3} md={3} sm={12} xs={12}>
                            <WeekList
                                changeWeek={changeWeek}
                                getSubjectLessonList={(weekID) => {
                                    getSubjectLessonListWeekID(weekID);
                                    setLoading(true)
                                    setSubjectSelect(0)
                                }} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

export default TeacherWeekLesson;