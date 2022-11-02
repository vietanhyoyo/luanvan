import { Grid, Box, Typography } from '@mui/material';
import {
    Button, Dialog, DialogTitle, DialogContent, DialogActions,
    TextField, FormControl, RadioGroup, FormControlLabel,
    Radio, IconButton, Snackbar, Slide, DialogContentText
} from '@mui/material';
import { IconAward, IconCheck } from '@tabler/icons';
import { gridSpacing } from 'store/constant';
import MainCard from 'ui-component/cards/MainCard';
import QuestionService from 'services/objects/question.service';
import { useParams } from 'react-router-dom';
import MuiAlert from '@mui/material/Alert';
import { styled } from '@mui/material/styles';
import { useEffect, useState, forwardRef } from 'react'
import LessonService from 'services/objects/lesson.service';
import { useNavigate } from 'react-router-dom';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const questionServive = new QuestionService();
const lessonSerive = new LessonService();

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const StudentTestQuestion = () => {

    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const { id } = useParams();
    const [questionList, setQuestionList] = useState([]);
    const [answerList, setAnswerList] = useState([]);
    const [point, setPoint] = useState(0);
    const [lesson, setLesson] = useState({
        title: '',
        subject: {
            name: '',
        }
    })
    const [isSubmit, setIsSubmit] = useState(false);

    const [notification, setNotification] = useState({
        open: false,
        message: 'Đã xóa một câu hỏi!',
        status: 'success'
    });

    const getAPI = async () => {
        try {
            const result = await questionServive.getAll(id);
            const data = result.data;
            setQuestionList(data);
            const arr = [];
            for (const element of data) {
                const row = {
                    ...element,
                    answer: '',
                }
                arr.push(row)
            }
            setAnswerList(arr);
        } catch (error) {
            console.log(error);
        }
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const getLesson = async () => {
        try {
            const result = await lessonSerive.getLessonById(id);
            setLesson(result.data)
        }
        catch (error) {
            console.log(error)
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

    const changeAnswer = (event, index) => {
        let arr = [...answerList];
        arr[index] = {
            ...arr[index],
            answer: event.target.value
        }
        console.log(arr);
        setAnswerList(arr);
    }

    const handleSubmit = () => {
        let bool = true;
        let npoint = 0;
        answerList.forEach(row => {
            if (row.answer === row.correct) {
                npoint++;
            }
            if (row.answer === "") {
                bool = false;
            }
        });
        setPoint(npoint);
        if (bool) {
            handleClickOpen();
        }
        else {
            alert('Bạn chưa chọn hết câu hỏi.')
        }
        setIsSubmit(true);
    }

    const bindColor = (input, correct) => {
        if (isSubmit)
            return input === correct ? 'success' : 'error';
        else return 'primary'
    }

    const bindTextColor = (correct, input, index) => {
        if (isSubmit) {
            if (answerList[index].answer === input) {
                return answerList[index].answer === correct ? 'success' : 'error';
            }
            else return ''
        }
        else return ''
    }

    const showChecked = (correct, input, index) => {
        if (isSubmit) {
            if (answerList[index].answer === input) {
                return answerList[index].answer === correct ?
                    <IconCheck width={14} height={14} color="#65C18C"/> : '';
            }
            else return ''
        }
        else return ''
    }

    const prevPage = () => {
        navigate(-1);
    }

    return <>
        <Grid container spacing={gridSpacing} >
            <Grid item xs={12}>
                <MainCard title={'Câu hỏi môn ' + lesson.subject.name + ' bài ' + lesson.title}>
                    {
                        answerList.length !== 0 ?
                            answerList.map((row, index) => {
                                return (<Box key={index} mb={4}>
                                    <Typography>Câu {index + 1}: {row.question}</Typography>
                                    <FormControl sx={{ paddingTop: 1, width: '100%' }}>
                                        <RadioGroup
                                            name="correct"
                                            value={row.answer}
                                            onChange={(event) => changeAnswer(event, index)}
                                        >
                                            <Box sx={{ width: '100%', display: 'flex', paddingTop: 1 }}>
                                                <FormControlLabel
                                                    value="A"
                                                    control={<Radio
                                                        color={bindColor(row.correct, 'A')}
                                                    />}
                                                    label={<Typography color={bindTextColor(row.correct, 'A', index)}>
                                                        A - {row.A} {showChecked(row.correct, 'A', index)}
                                                    </Typography>}
                                                />
                                            </Box>
                                            <Box sx={{ width: '100%', display: 'flex', paddingTop: 1 }}>
                                                <FormControlLabel
                                                    value="B"
                                                    control={<Radio
                                                        color={bindColor(row.correct, 'B')}
                                                    />}
                                                    label={<Typography color={bindTextColor(row.correct, 'B', index)}>
                                                        B - {row.B} {showChecked(row.correct, 'B', index)}
                                                    </Typography>}
                                                />
                                            </Box>
                                            <Box sx={{ width: '100%', display: 'flex', paddingTop: 1 }}>
                                                <FormControlLabel
                                                    value="C"
                                                    control={<Radio
                                                        color={bindColor(row.correct, 'C')}
                                                    />}
                                                    label={<Typography color={bindTextColor(row.correct, 'C', index)}>
                                                        C - {row.C} {showChecked(row.correct, 'C', index)}
                                                    </Typography>}
                                                />
                                            </Box>
                                        </RadioGroup>
                                    </FormControl>
                                </Box>)
                            }) : <div>
                            </div>
                    }
                    <Button variant="contained" onClick={handleSubmit}>Nộp bài</Button>
                    <Button variant='outlined' onClick={prevPage} sx={{ marginLeft: '10px' }}>Trở về</Button>
                </MainCard>
            </Grid>
        </Grid>
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>Kết quả của bạn</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    <Box display={'flex'} justifyContent={'center'} mb={3} >
                        <IconAward width={130} height={130} color="#e2da67" />
                    </Box>
                    <Typography variant='h4'>
                        Bạn đã làm đúng <Typography variant='h2' display={"inline"}>{point}/{questionList.length}</Typography> câu hỏi.
                    </Typography>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Đóng</Button>
            </DialogActions>
        </Dialog>
        <Snackbar open={notification.open} autoHideDuration={6000} onClose={handleCloseAlert}>
            <Alert onClose={handleCloseAlert} severity={notification.status} sx={{ width: '100%' }}>
                {notification.message}
            </Alert>
        </Snackbar>
    </>
}

export default StudentTestQuestion;