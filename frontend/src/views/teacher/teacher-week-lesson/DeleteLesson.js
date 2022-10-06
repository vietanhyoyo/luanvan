
import React from 'react'
import { Box, IconButton, Stack, Snackbar } from "@mui/material";
import { useState, useEffect } from 'react'
import LessonService from "services/objects/lesson.service";
import { IconSquareX } from '@tabler/icons';
import MuiAlert from '@mui/material/Alert';
import TeacherService from 'services/objects/teacher.service';
import SubjectService from 'services/objects/subject.service';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const lessonService = new LessonService();
const teacherService = new TeacherService();
const subjectService = new SubjectService();

export default function DeleteLesson(props) {

    const [status, setStatus] = useState('success');
    const [alertMessage, setAlertMessage] = useState('Thêm thành công!');
    const [open, setOpen] = useState(false);
    const [gradeList, setGradeList] = useState([]);
    const [subjectList, setSubjectList] = useState([]);

    const handleAlert = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

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

    const handleDelete = async () => {
        const bool = window.confirm('Bạn có muốn nội dung này không?');
        if (bool) {
            try {
                const result = await lessonService.deleteLessonById(props.lesson._id)
                setAlertMessage('Đã xóa thành công!');
                setStatus('success');
                handleAlert();
                props.reLoadAPI()
            } catch (error) {
                setAlertMessage('Lỗi khi xóa!');
                setStatus('error');
                handleAlert();
            }
        }
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

    useEffect(() => {
        getAPISubjectList();
        getClassInCharge();
    }, [])

    return checkEdit() ? (<Box sx={{ display: 'inline' }}>
        <IconButton
            size='small'
            color="error"
            onClick={handleDelete}>
            <IconSquareX />
        </IconButton>
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