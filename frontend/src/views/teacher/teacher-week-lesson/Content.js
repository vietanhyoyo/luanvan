
import React from 'react'
import { useTheme } from "@mui/material/styles"
import { Box, Typography, Button, IconButton, Stack, Snackbar, Avatar, Input } from "@mui/material";
import Text from "ui-component/Text";
import EditContent from "./EditContent";
import moment from "moment";
import { useState, useEffect, useRef } from 'react'
import LessonService from "services/objects/lesson.service";
import EditLesson from "./EditLesson";
import { IconSquareX, IconTools } from '@tabler/icons';
import MuiAlert from '@mui/material/Alert';
import DeleteLesson from './DeleteLesson';
import ReactPlayer from 'react-player'
import AdminService from 'services/objects/admin.service';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';
import NewsService from 'services/objects/news.service';
import Comment from '../teacher-news/Comment';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const baseUrl = process.env.REACT_APP_BASE_URL
const borderColor = '#F4F6F8'

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

const newsService = new NewsService();
const adminService = new AdminService();
const lessonService = new LessonService();

const Content = (props) => {

    const [disabledEdit, setDisabledEdit] = useState(false);
    const navigate = useNavigate();
    const theme = useTheme();
    const [lessonContent, setLessonContent] = useState({
        _id: '',
        text: ''
    });
    const [user, setUser] = useState({
        _id: ''
    })
    const [commentList, setCommentList] = useState([]);
    const [alertMessage, setAlertMessage] = useState('Thêm thành công!');
    const [status, setStatus] = useState('success');
    const [open, setOpen] = useState(false);
    const [video, setVideo] = useState(null);
    const [comment, setComment] = useState({
        text: '',
        news: null
    })

    const getUser = async () => {
        try {
            const result = await adminService.getUserInfo()
            setUser(result.data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleAlert = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const getComments = async () => {
        try {
            const result = await newsService.getCommentsByLesson(props.lesson._id)
            setCommentList(result.data);
            // console.log(result.data)
        } catch (error) {
            console.log(error)
        }
    }

    const addComment = async (e) => {
        e.preventDefault();
        try {
            const result = await newsService.addCommentQA(comment.text, props.lesson._id);
            setComment(prev => ({
                ...prev, text: ''
            }));
            getComments();
        } catch (error) {
            console.log(error)
        }
    }

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
        getUser();
        getComments();
        return () => {
            setLessonContent({
                _id: '',
                text: ''
            })
        }
    }, [props.lesson])

    useEffect(() => {
        setVideo(null);
        if (lessonContent.video !== '' && lessonContent.video !== undefined)
            downloadVideo();
    }, [lessonContent])

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

    const downloadVideo = async () => {
        try {
            const result = await axios.get(`http://localhost:5000/upload/${lessonContent.video}`)
            console.log(result)
            setVideo(result.data)
        } catch (error) {
            console.log(error)
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

    const checkDisabled = (bool) => {
        setDisabledEdit(bool)
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
                            checkDisabled={checkDisabled}
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
                        !video ? <div></div>
                            :
                            // <ReactPlayer
                            //     url={`http://localhost:5002/?id=${lessonContent.video}`}
                            //     controls
                            // />
                            // <video
                            //     // src={`http://localhost:5002/?id=${lessonContent.video}`} 
                            //     controls
                            //     style={{ width: '100%' }}
                            // >
                            //     <source src={`http://localhost:5002/?id=${lessonContent.video}`} type="video/mp4"></source>
                            // </video>
                            <video
                                controls
                                style={{ width: '100%' }}
                                muted="muted"
                            >
                                <source src={`http://localhost:5000/upload/${lessonContent.video}`} type="video/mp4"></source>
                            </video>
                    }
                    <EditContent lesson={props.lesson} reLoad={getAPI} grade={props.grade} />
                    {
                        disabledEdit ?
                            <Button
                                startIcon={<IconTools />}
                                onClick={() => {
                                    navigate(`/teacher/add-content-test/${props.lesson ? props.lesson._id : '0'}`)
                                }}
                            >Thêm bài tập trắc nghiệm</Button> : <div></div>
                    }
                    <Box mt={4}>
                        <Typography>Phần thảo luận</Typography>
                        <form onSubmit={addComment}>
                            <Box display="flex" marginTop={1}>
                                {user.avatar ? <Avatar
                                    alt="profile"
                                    src={baseUrl + "/image/" + user.avatar}
                                    sx={{ width: 28, height: 28 }}
                                /> : <Avatar
                                    alt="profile"
                                    label='T'
                                    sx={{ width: 28, height: 28 }}
                                />}
                                <Input sx={{
                                    position: 'relative',
                                    marginLeft: '10px',
                                    padding: '10px',
                                    borderRadius: '10px',
                                    border: `1px solid ${borderColor}`,
                                    flex: 1
                                }}
                                    name="commentInput"
                                    value={comment.text}
                                    onChange={(e) => {
                                        setComment(prev => ({ ...prev, text: e.target.value }))
                                    }}
                                    variant="outlined"
                                    fullWidth
                                />
                                <IconButton color="primary" type="submit">
                                    <SendIcon />
                                </IconButton>
                            </Box>
                        </form>
                    </Box>
                    <Box mt={4}>
                        {commentList.length !== 0 ?
                            commentList.map((row, index) => {
                                return <Comment
                                    key={index}
                                    comment={row}
                                    userID={user._id}
                                    userInfor={user}
                                />
                            })
                            : <div></div>}
                    </Box>
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