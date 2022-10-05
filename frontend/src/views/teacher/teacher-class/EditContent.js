import {
    Grid, Box, Typography, FormControl, DialogActions, DialogTitle, DialogContent,
    MenuItem, Select, IconButton, Dialog, Button, TextField, InputLabel, Stack,
    Snackbar
} from '@mui/material';
import ReactQuill from "react-quill";
import { IconEditCircle } from '@tabler/icons';
import { useState, useEffect, forwardRef } from 'react';
import ClassContentService from 'services/objects/classContent.service';
import MuiAlert from '@mui/material/Alert';

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const classContentService = new ClassContentService();

const EditContent = (props) => {

    const [openEdit, setOpenEdit] = useState(false);
    const [content, setContent] = useState({});
    const [status, setStatus] = useState('success');
    const [alertMessage, setAlertMessage] = useState('Thêm thành công!');
    const closeDialog = () => {
        setOpenEdit(false)
    }

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
            const result = await classContentService.update(content);
            console.log(result);
            setAlertMessage('Chỉnh sửa thành công!');
            setStatus('success');
            handleAlert();
            setOpenEdit(false);
            props.reLoad();
        } catch (error) {
            console.log(error);
            setAlertMessage('Thất bại!');
            setStatus('error');
            handleAlert();
        }
    }

    useEffect(() => {
        setContent(props.content)
    }, [props.content]);

    return <>
        <IconButton
            size='small'
            color="primary"
            onClick={() => setOpenEdit(true)}
        >
            <IconEditCircle />
        </IconButton>
        <Dialog
            open={openEdit}
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
    </>
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
export default EditContent;