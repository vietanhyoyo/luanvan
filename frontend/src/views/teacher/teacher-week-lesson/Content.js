
import React from 'react'
import { useTheme } from "@mui/material/styles"
import { Box, Typography, Button, IconButton, Stack, Snackbar } from "@mui/material";
import Text from "ui-component/Text";
import EditContent from "./EditContent";
import moment from "moment";
import { useState, useEffect, useRef } from 'react'
import LessonService from "services/objects/lesson.service";
import EditLesson from "./EditLesson";
import { IconSquareX } from '@tabler/icons';
import MuiAlert from '@mui/material/Alert';
import DeleteLesson from './DeleteLesson';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
// import ReactPlayer from 'react-player'

function formatInputDate(dateString) {
    let date = new Date(Date.now());
    if (dateString !== '')
        date = new Date(dateString);
    return moment(date).format('DD-MM-YYYY');
}

const contentStyle = {
    marginTop: "10px",
    paddingRight: "0px",
    paddingLeft: "0px"
}

const lessonService = new LessonService();

const Content = (props) => {

    const theme = useTheme();
    const [lessonContent, setLessonContent] = useState({
        _id: '',
        text: ''
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

    const divRender = useRef();

    const getAPI = async () => {
        try {
            const result = await lessonService.getLessonContent(props.lesson._id);
            const data = result.data;
            if (data !== "") {
                setLessonContent(data);
            } else {
                setLessonContent({
                    _id: '',
                    text: '- - - - - - Chưa có nội dung - - - - - -'
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAPI()
        return () => {
            setLessonContent({
                _id: '',
                text: ''
            })
        }
    }, [props.lesson])

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
                props.getLessonList();
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
            divRender.current.innerHTML = xmlString
            return <div></div>
        } else {
            divRender.current.innerHTML = xmlString

            // const endIndex = xmlString.indexOf("></oembed></figure>") + 19;
            /*const endIndex = xmlString.indexOf("></iframe>") + 10;

            let videoString = xmlString.substring(firstIndex, endIndex);
            const first = videoString.indexOf('"');
            const end = videoString.lastIndexOf('"');
            videoString = videoString.substring(first + 1, end);*/

            // return <ReactPlayer width="100%" height="400px" controls={true} url={videoString} />;
            return <div></div>
        }
    }

    return (
        <>
            <Box marginBottom={"16px"}>
                <Box sx={topStyle}>
                    <Box sx={titleStyle}>
                        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            <Typography sx={{ display: 'flex' }} variant="h4" align="justify">
                                {props.lesson.title}
                            </Typography>
                        </Box>
                        <EditLesson
                            grade={props.grade}
                            week={props.week}
                            lesson={props.lesson}
                            reLoadAPI={props.getLessonList}
                        />
                        <DeleteLesson
                            grade={props.grade}
                            week={props.week}
                            reLoadAPI={props.getLessonList}
                            lesson={props.lesson}
                        />
                    </Box>
                    <Typography variant="caption" paddingTop="8px">{
                        props.lesson.date ? formatInputDate(props.lesson.date) : formatInputDate('')
                    }</Typography>
                </Box>
                <Box sx={contentStyle}>
                    <Text
                        sx={noteText}
                    >
                        {props.lesson.note}
                    </Text>
                    <div ref={divRender}></div>
                    {convertHtml(lessonContent.text)}
                    {
                        !lessonContent.video ? <div></div>
                            :
                            <video
                                src={`http://localhost:5002/?id=${lessonContent.video}`} controls
                                style={{width: '100%'}}
                            ></video>
                    }
                    <EditContent lesson={props.lesson} reLoad={getAPI} grade={props.grade} />
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