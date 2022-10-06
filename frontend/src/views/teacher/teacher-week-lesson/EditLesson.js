import { useState, useEffect, forwardRef } from 'react';
// material-ui
import {
    Grid, Box, Typography, FormControl, DialogActions, DialogTitle, DialogContent,
    MenuItem, Select, IconButton, Dialog, Button, TextField, InputLabel, Stack,
    Snackbar
} from '@mui/material';

import { IconEditCircle } from '@tabler/icons';
import SubjectService from 'services/objects/subject.service';
import moment from 'moment';
import TeacherService from 'services/objects/teacher.service';
import LessonService from 'services/objects/lesson.service';
import MuiAlert from '@mui/material/Alert';

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const subjectService = new SubjectService();
const lessonService = new LessonService();
const teacherService = new TeacherService();

function formatInputDate(dateString) {
    let date = new Date(Date.now());
    if (dateString !== '')
        date = new Date(dateString);
    return moment(date).format('YYYY-MM-DD');
}

const EditLesson = (props) => {
    const [openAddLesson, setOpenAddLesson] = useState(false);
    const [subjectList, setSubjectList] = useState([]);
    const [subjectSelect, setSubjectSelect] = useState(-1);
    const [status, setStatus] = useState('success');
    const [alertMessage, setAlertMessage] = useState('Thêm thành công!');
    const [gradeList, setGradeList] = useState([]);
    const [lesson, setLesson] = useState({
        _id: "",
        title: "",
        note: "",
        date: null,
        subject: "",
    });
    const [open, setOpen] = useState(false);

    const handleAlert = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const closeDialog = () => {
        setOpenAddLesson(false)
    }

    const getClassInCharge = async () => {
        try {
            const result = await teacherService.getClassInCharge();
            if (result.status === 200) {
                const docs = result.data;
                if (docs.classInCharge !== []) {
                    const array = docs.classInCharge.map(row => row.grade)
                    setGradeList(array)
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    const getAPISubjectList = async () => {
        try {
            const result = await subjectService.getSubjectsByTeacher();
            const docs = result.data;
            // console.log(result)
            setSubjectList(docs);
        } catch (error) {
            console.log(error);
        }
    }

    const lessonValidate = () => {
        if (subjectSelect === -1) {
            setAlertMessage('Chưa chọn môn học!');
            setStatus('error');
            handleAlert();
            return false;
        }
        if (lesson.title.length === 0) {
            setAlertMessage('Tiêu đề chưa hợp lệ!');
            setStatus('error');
            handleAlert();
            return false;
        }
        return true;
    }

    const checkEdit = () => {
        if (gradeList.length === 0) return false;
        const bool1 = gradeList.includes(props.grade);
        let bool2 = true;
        if (props.lesson) {
            const idSubjectArray = subjectList.map(row => row._id);
            bool2 = idSubjectArray.includes(props.lesson.subject);
        }
        return bool1 & bool2;
    }

    const handleSubmit = async () => {

        if (!lessonValidate()) return;

        try {
            const postData = {
                ...lesson,
                subject: subjectList[subjectSelect]._id,
                week: props.week._id,
                grade: props.grade
            };

            const result = await lessonService.updateLesson(postData);
            setAlertMessage('Đã thay đổi bài học!');
            setStatus('success');
            handleAlert();
            closeDialog();
            props.reLoadAPI();
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (subjectList.length === 0) {
            getAPISubjectList();
        }
        getClassInCharge();
        if (props.lesson) {
            setLesson(props.lesson)
        }
        if (props.lesson && subjectList.length > 0) {
            // console.log(subjectList)
            // console.log(props.lesson)
            let index = -1;
            subjectList.forEach((row, id) => {
                if (row._id === props.lesson.subject) {
                    index = id;
                }
            })
            if (index !== -1) {
                setSubjectSelect(index)
            }
        }
    }, [props.lesson, subjectList])

    return checkEdit() ? (<Box sx={{ display: 'inline' }}>
        <IconButton
            size='small'
            color="primary"
            onClick={() => setOpenAddLesson(true)}>
            <IconEditCircle />
        </IconButton>
        <Dialog
            open={openAddLesson}
            onClose={() => setOpenAddLesson(false)}
        >
            <DialogTitle>
                {"Thêm mới một lớp học"}
            </DialogTitle>
            <DialogContent sx={{}}>
                <Box sx={{ paddingTop: '20px', width: 400 }}>
                    <Box sx={{ padding: '14px 0' }}>
                        <TextField
                            required
                            label="Tiêu đề"
                            variant="outlined"
                            type="text"
                            sx={{ width: '100%' }}
                            InputLabelProps={{ shrink: true, }}
                            value={lesson.title}
                            onChange={(event) => setLesson(prev => ({
                                ...prev,
                                title: event.target.value
                            }))}
                        />
                    </Box>
                    <Box sx={{ padding: '14px 0' }}>
                        <TextField
                            label="Ghi chú nội dung"
                            variant="outlined"
                            multiline
                            rows={4}
                            type="text"
                            sx={{ width: '100%' }}
                            InputLabelProps={{ shrink: true, }}
                            value={lesson.note}
                            onChange={(event) => setLesson(prev => ({
                                ...prev,
                                note: event.target.value
                            }))}
                        />
                    </Box>
                    <Box sx={{ padding: '14px 0', display: "flex", justifyContent: "space-between" }}>
                        <TextField
                            label="Ngày dạy"
                            variant="outlined"
                            type="date"
                            sx={{ width: '48%' }}
                            InputLabelProps={{ shrink: true, }}
                            value={lesson.date ? formatInputDate(lesson.date) : formatInputDate('')}
                            onChange={(event) => setLesson(prev => ({
                                ...prev,
                                date: event.target.value
                            }))}
                        />
                        <FormControl sx={{ width: '48%' }}>
                            <InputLabel id="monhoc">Môn</InputLabel>
                            <Select
                                labelId="monhoc"
                                value={subjectSelect}
                                label="Môn"
                                onChange={event => setSubjectSelect(event.target.value)}
                            >
                                <MenuItem value={-1}>---</MenuItem>
                                {
                                    subjectList.length < 0 ? <MenuItem value={0}>---</MenuItem> :
                                        subjectList.map((row, index) => {
                                            return <MenuItem value={index} key={index}>{row.name}</MenuItem>
                                        })
                                }
                            </Select>
                        </FormControl>
                    </Box>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpenAddLesson(false)}>Hủy</Button>
                <Button autoFocus onClick={handleSubmit}>
                    Lưu
                </Button>
            </DialogActions>
        </Dialog>
        <Stack spacing={2} sx={{ width: '100%' }}>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={status} sx={{ width: '100%' }}>
                    {alertMessage}
                </Alert>
            </Snackbar>
        </Stack>
    </Box>
    ) : <div></div>
}

export default EditLesson;