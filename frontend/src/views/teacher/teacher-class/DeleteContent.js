import React from 'react'
import { useTheme } from "@mui/material/styles"
import { Box, Typography, Button, IconButton, Stack, Snackbar } from "@mui/material";
import Text from "ui-component/Text";
import moment from "moment";
import { useState, useEffect, useRef } from 'react'
import LessonService from "services/objects/lesson.service";
import { IconSquareX } from '@tabler/icons';
import MuiAlert from '@mui/material/Alert';
import ClassContentService from 'services/objects/classContent.service';
import SubjectService from 'services/objects/subject.service';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const classContentService = new ClassContentService();

const DeleteContent = (props) => {

    const [status, setStatus] = useState('success');
    const [alertMessage, setAlertMessage] = useState('Thêm thành công!');
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

    const handleDelete = async () => {
        const bool = window.confirm('Bạn có muốn xóa nội dung này không?');
        if (bool) {
            try {
                const result = await classContentService.delete(props.content._id);
                setAlertMessage('Đã xóa thành công!');
                setStatus('success');
                handleAlert();
                props.reLoad()
            } catch (error) {
                setAlertMessage('Lỗi khi xóa!');
                setStatus('error');
                handleAlert();
            }
        } else {
            setAlertMessage('Hủy tác vụ!');
            setStatus('info');
            handleAlert();
        }
    }

    return (<>
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
    </>)
}

export default DeleteContent;