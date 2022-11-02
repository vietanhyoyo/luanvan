import { Grid, Box, Typography } from '@mui/material';
import {
    Button, Dialog, DialogTitle, DialogContent, DialogActions,
    TextField, FormControl, RadioGroup, FormControlLabel,
    Radio, IconButton, Snackbar
} from '@mui/material';
import { IconBackspace } from '@tabler/icons';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import AddNewTest from './content-test/AddNewTest';
import QuestionService from 'services/objects/question.service';
import { useParams } from 'react-router-dom';
import MuiAlert from '@mui/material/Alert';
import { styled } from '@mui/material/styles';
import { useEffect, useState, forwardRef } from 'react'
import LessonService from 'services/objects/lesson.service';

const questionSerive = new QuestionService();
const lessonSerive = new LessonService();

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AddContentTest = () => {

    const { id } = useParams();
    const [questionList, setQuestionList] = useState([])
    const [lesson, setLesson] = useState({
        title: '',
        subject: {
            name: '',
        }
    })

    const [notification, setNotification] = useState({
        open: false,
        message: 'Đã xóa một câu hỏi!',
        status: 'success'
    });

    const getAPI = async () => {
        try {
            const result = await questionSerive.getAll(id);
            setQuestionList(result.data);
        } catch (error) {
            console.log(error);
        }
    }

    const getLesson = async () => {
        try {
            const result = await lessonSerive.getLessonById(id);
            setLesson(result.data)
        }
        catch (error) {
            console.log(error)
        }
    }

    const handleDelete = async (idQuestion) => {
        const bool = window.confirm('Bạn muốn xóa câu hỏi này!');
        if (bool) {
            try {
                const result = await questionSerive.delete(idQuestion);
                setNotification({
                    open: true,
                    message: 'Đã xóa thành công!',
                    status: 'success'
                })
                getAPI();
            } catch (error) {
                console.log(error)
                setNotification({
                    open: true,
                    message: 'Có lỗi xảy ra!',
                    status: 'error'
                })
            }
        }
    }

    const handleCloseAlert = () => {
        setNotification(prev => ({
            ...prev,
            open: false
        }))
    }

    useEffect(() => {
        getAPI();
        getLesson();
    }, [])

    return <>
        <Grid container spacing={gridSpacing} >
            <Grid item xs={12}>
                <MainCard title={'Câu hỏi môn ' + lesson.subject.name + ' bài ' + lesson.title}>
                    {
                        questionList.length !== 0 ?
                            questionList.map((row, index) => {
                                return (<Box key={index} mb={4}>
                                    <Typography>Câu {index + 1}: {row.question}
                                        <IconButton color='error' onClick={() => handleDelete(row._id)}>
                                            <IconBackspace />
                                        </IconButton></Typography>
                                    <FormControl
                                        sx={{ paddingTop: 1, width: '100%' }}
                                    >
                                        <RadioGroup
                                            name="correct"
                                            value={row.correct}
                                        >
                                            <Box sx={{ width: '100%', display: 'flex', paddingTop: 1 }}>
                                                <FormControlLabel value="A" control={<Radio />} label={row.A} />
                                            </Box>
                                            <Box sx={{ width: '100%', display: 'flex', paddingTop: 1 }}>
                                                <FormControlLabel value="B" control={<Radio />} label={row.B} />
                                            </Box>
                                            <Box sx={{ width: '100%', display: 'flex', paddingTop: 1 }}>
                                                <FormControlLabel value="C" control={<Radio />} label={row.C} />
                                            </Box>
                                        </RadioGroup>
                                    </FormControl>
                                </Box>)
                            }) : <div></div>
                    }
                    <AddNewTest getAPI={getAPI} />
                </MainCard>
            </Grid>
        </Grid>
        <Snackbar open={notification.open} autoHideDuration={6000} onClose={handleCloseAlert}>
            <Alert onClose={handleCloseAlert} severity={notification.status} sx={{ width: '100%' }}>
                {notification.message}
            </Alert>
        </Snackbar>
    </>
}

export default AddContentTest;