import { useState, useEffect, forwardRef } from 'react';
// material-ui
import {
    Grid, Box, Typography, FormControl, DialogActions, DialogTitle, DialogContent,
    MenuItem, Select, IconButton, Dialog, Button, TextField, InputLabel, Stack,
    Snackbar
} from '@mui/material';

import { IconSquarePlus } from '@tabler/icons';
import SubjectService from 'services/objects/subject.service';
import moment from 'moment';
import LessonService from 'services/objects/lesson.service';
import MuiAlert from '@mui/material/Alert';
import ReactQuill from "react-quill";
import ClassContentService from 'services/objects/classContent.service';
import 'react-quill/dist/quill.snow.css'
import { propsToClassKey } from '@mui/styles';

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const subjectService = new SubjectService();
const lessonService = new LessonService();
const classContentService = new ClassContentService();

function formatInputDate(dateString) {
    let date = new Date(Date.now());
    if (dateString !== '')
        date = new Date(dateString);
    return moment(date).format('YYYY-MM-DD');
}

const AddContent = (props) => {
    const [openAddLesson, setOpenAddLesson] = useState(false);
    // const [subjectList, setSubjectList] = useState([]);
    // const [subjectSelect, setSubjectSelect] = useState(-1);
    const [status, setStatus] = useState('success');
    const [alertMessage, setAlertMessage] = useState('Thêm thành công!');
    const [content, setContent] = useState({
        title: "",
        text: "",
        date: new Date(),
        class: props.classID
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

    const getAPISubjectList = async () => {
        // try {
        //     const result = await subjectService.getSubjectsByTeacher();
        //     const docs = result.data;
        //     // console.log(result)
        //     setSubjectList(docs);
        // } catch (error) {
        //     console.log(error);
        // }
    }

    const contentValidate = () => {
        if (content.title.length === 0) {
            setAlertMessage('Chưa nhập tiêu đề!');
            setStatus('error');
            handleAlert();
            return false;
        }
        return true;
    }

    const handleSubmit = async () => {

        if (!contentValidate()) return;

        try {
            const data = {
                ...content,
                class: props.classID
            }
            const result = await classContentService.add(data);
            setAlertMessage('Thêm thành công!');
            setStatus('success');
            handleAlert();
            props.getAPI();
            setOpenAddLesson(false)
        } catch (error) {
            console.log(error);
            setAlertMessage('Có lỗi khi thêm');
            setStatus('error');
            handleAlert();
        }
    }

    const closeDialog = () => {
        setOpenAddLesson(false)
    }

    useEffect(() => {
        getAPISubjectList();
    }, [])

    return (<Box sx={{ display: 'inline' }}>
        <IconButton color="primary" onClick={() => setOpenAddLesson(true)}>
            <IconSquarePlus />
        </IconButton>
        <Dialog
            open={openAddLesson}
        // onClose={() => setOpenAddLesson(false)}
        >
            <DialogTitle>
                {"Thêm mới một lớp học"}
            </DialogTitle>
            <DialogContent>
                <Box sx={{ paddingTop: '20px', minWidth: 400 }}>
                    <Box sx={{ padding: '14px 0' }}>
                        <TextField
                            required
                            label="Tiêu đề"
                            variant="outlined"
                            type="text"
                            sx={{ width: '100%' }}
                            value={content.title}
                            onChange={event => setContent(prev => ({
                                ...prev,
                                title: event.target.value
                            }))}
                        />
                    </Box>
                    <ReactQuill
                        theme='snow'
                        value={content.text}
                        onChange={(value) => setContent(prev => ({
                            ...prev,
                            text: value
                        }))}
                        style={{ minHeight: '380px', height: 'auto' }}
                        modules={modules}
                        formats={formats}
                        placeholder={propTypes.placeholder}
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={closeDialog}>Hủy</Button>
                <Button autoFocus onClick={handleSubmit}>
                    Thêm
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
    )
}
const modules = {
    toolbar: [
        [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' },
        { 'indent': '-1' }, { 'indent': '+1' }],
        ['link', 'image', 'video'],
        ['clean']
    ],
    clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
    }
}
/* 
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
]

/* 
 * PropType validation
 */
const propTypes = {
    placeholder: "Place holder",
}
export default AddContent;