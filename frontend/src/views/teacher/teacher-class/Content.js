
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
import EditContent from './EditContent';
import DeleteContent from './DeleteContent';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
// import ReactPlayer from 'react-player'

function formatInputDate(dateString) {
    let date = new Date(Date.now());
    if (dateString !== '')
        date = new Date(dateString);
    const str = moment(date).format('HH:mm') + ' ' + moment(date).format('DD-MM-YYYY');
    return str;
}

const contentStyle = {
    marginTop: "10px",
    paddingRight: "0px",
    paddingLeft: "0px"
}

const lessonService = new LessonService();
const classContentService = new ClassContentService();

const Content = (props) => {

    const caller = useRef();
    const theme = useTheme();
    // const [lessonContent, setLessonContent] = useState({
    //     _id: '',
    //     text: ''
    // });
    const [content, setContent] = useState({
        _id: "",
        text: ""
    });
    const [alertMessage, setAlertMessage] = useState('Thêm thành công!');
    const [status, setStatus] = useState('success');
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

    const getAPI = async () => {
        try {
            const result = await classContentService.getClassContent(props.contentId)
            const data = result.data;
            if (data !== "") {
                setContent(data);
            } else {
                setContent({
                    _id: '',
                    text: '- - - - - - Chưa có nội dung - - - - - -'
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAPI();
    }, [props.contentId])

    const topStyle = {
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        borderBottom: "1px solid",
        borderColor: theme.palette.grey[200],
        paddingBottom: "0px"
    }

    const titleStyle = {
        borderLeft: "2px solid",
        borderColor: theme.palette.primary.main,
        paddingLeft: "16px",
        display: "flex",
        justifyContent: "center",
        paddingBottom: "10px",
        paddingTop: "10px"
    }

    const handleDelete = async () => {
        const bool = window.confirm('Bạn có muốn xóa lớp này không?');
        if (bool) {
            try {
                const result = await lessonService.deleteLessonById(props.lesson._id)
                setAlertMessage('Đã xóa thành công!');
                setStatus('success');
                // props.getLessonList();
                handleAlert();
            } catch (error) {
                console.log(error)
            }
        }
    }

    const convertHtml = (xmlString) => {
        if (!xmlString) return <div></div>
        // const str = `<div class="video-reactiv>`
        if (xmlString === "") return <div></div>

        // const firstIndex = xmlString.indexOf("<oembed url=");
        const firstIndex = xmlString.indexOf("<iframe ");
        if (firstIndex === -1) {
            // div.innerHTML = "jhkjhj";
            // console.log(caller.current.innerHTML)
            if (caller.current.innerHTML)
                caller.current.innerHTML = xmlString
            return <div></div>
        } else {
            // div.innerHTML = "jghjghj";
            if (caller.current.innerHTML)
                caller.current.innerHTML = xmlString
            return <div></div>
        }
    }

    return (
        <>
            <Box marginBottom={"16px"}>
                <Box sx={topStyle}>
                    <Box sx={titleStyle}>
                        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <Typography
                                sx={{ display: 'block', width: "max-content" }}
                                variant="h4"
                                align="justify"
                            >
                                {content.title}
                            </Typography>
                        </Box>
                        <EditContent content={content} reLoad={getAPI} />
                        <DeleteContent content={content} reLoad={props.reLoadAPI} />
                    </Box>
                    <Typography variant="caption" paddingTop="8px">{
                        content.date ? formatInputDate(content.date) : formatInputDate('')
                    }</Typography>
                </Box>
                <Box sx={contentStyle}>
                    <div ref={caller} id="divRender">--No data--</div>
                    {convertHtml(content.text)}
                </Box>
            </Box>
            <Stack spacing={2} sx={{ width: '100%' }}>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity={status} sx={{ width: '100%' }}>
                        {alertMessage}
                    </Alert>
                </Snackbar>
            </Stack>
        </>)
}

const noteText = {
    display: "block",
    textAlign: "right",
    width: "100%",
    fontStyle: 'italic',
    m: 1,
    color: "gray"
}

export default Content;