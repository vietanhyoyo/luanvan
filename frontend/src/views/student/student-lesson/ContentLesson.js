
import React from 'react'
import { useTheme } from "@mui/material/styles"
import { Box, Typography, Button, Avatar, Input, IconButton } from "@mui/material";
import Text from "ui-component/Text";
import moment from "moment";
import { useState, useEffect, useRef } from 'react'
import LessonService from "services/objects/lesson.service";
import MuiAlert from '@mui/material/Alert';
import QuestionService from 'services/objects/question.service';
import { useNavigate } from 'react-router-dom'
import AdminService from 'services/objects/admin.service';
import Comment from 'views/teacher/teacher-news/Comment';
import SendIcon from '@mui/icons-material/Send';
import NewsService from 'services/objects/news.service';

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

const baseUrl = process.env.REACT_APP_BASE_URL

const newsService = new NewsService();
const adminService = new AdminService();
const questionService = new QuestionService();
const lessonService = new LessonService();

const borderColor = '#F4F6F8'

const ContentLesson = (props) => {

    const theme = useTheme();
    const [lessonContent, setLessonContent] = useState({
        _id: '',
        text: ''
    });
    const [user, setUser] = useState({
        _id: ''
    })
    const [commentList, setCommentList] = useState([]);
    const [isQuestionTest, setIsQuestionTest] = useState(false);
    const divRender = useRef();
    const navigate = useNavigate()
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

    const getQuestionTest = async () => {
        try {
            const result = await questionService.getQuestionTest(props.lesson._id)
            console.log(result)
            if (result.data.status) {
                setIsQuestionTest(true)
            } else {
                setIsQuestionTest(false)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAPI();
        getQuestionTest();
        getUser();
        getComments();
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
                                controls
                                style={{ width: '100%' }}
                                muted="muted"
                            >
                                <source src={`http://localhost:5000/upload/${lessonContent.video}`} type="video/mp4"></source>
                            </video>
                    }
                </Box>
                {isQuestionTest ?
                    <Button onClick={() => navigate(`/student/question-test/${props.lesson._id}`)}>Làm bài tập trắc nghiệm</Button>
                    : <div></div>
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

export default ContentLesson;