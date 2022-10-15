import MainCard from "ui-component/cards/MainCard";
import {
    Grid, Box, Avatar, Typography, Button,
    IconButton, TextField, Input, Divider,
} from "@mui/material"
import { IconHeart } from '@tabler/icons';
import SendIcon from '@mui/icons-material/Send';
import { useState, useRef, useEffect } from 'react'
import moment from "moment";
import AdminService from "services/objects/admin.service";
import NewsService from "services/objects/news.service";
import FavoriteIcon from '@mui/icons-material/Favorite';
import Comment from "./Comment";

const adminService = new AdminService()
const newsService = new NewsService()

const borderColor = '#F4F6F8'

function formatInputDate(dateString) {
    let date = new Date(Date.now());
    if (dateString !== '')
        date = new Date(dateString);
    return moment(date).format('DD-MM-YYYY');
}

const News = (props) => {

    const divRender = useRef();
    const [newsletter, setNewsletter] = useState({
        usersLike: []
    })
    const [account, setAccount] = useState({
        name: 'No name'
    })
    const [comment, setComment] = useState({
        text: null,
        news: null
    })
    const [commentList, setCommentList] = useState([])

    const getComment = async () => {
        try {
            const result = await newsService.getComment(props.newsData._id)
            setCommentList(result.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        setComment(prev => ({ ...prev, news: props.newsData._id }))
        setAccount(props.newsData.createUser);
        setNewsletter(props.newsData)
        getComment()
    }, [props])

    const convertHtml = (xmlString) => {
        if (!xmlString) return <div></div>
        if (xmlString === "") return <div></div>

        if (!divRender.current) return <div></div>

        const firstIndex = xmlString.indexOf("<iframe ");
        if (firstIndex === -1) {
            divRender.current.innerHTML = xmlString
            return <div></div>
        } else {
            divRender.current.innerHTML = xmlString
            return <div></div>
        }
    }

    const addComment = async () => {
        try {
            const result = await newsService.addComment(comment.text, comment.news);
            console.log(result)
        } catch (error) {
            console.log(error)
        }
    }

    const handleLike = async () => {
        try {
            const result = await newsService.likeNews(props.newsData._id)
            setNewsletter(result.data)
        } catch (error) {
            console.log(error)
        }
    }

    const renderHeart = () => {
        const bool = newsletter.usersLike.includes(props.userID)
        if (bool) {
            return <IconButton onClick={handleLike} sx={{ color: "#F51E4B" }}>
                <FavoriteIcon />
            </IconButton>
        } else {
            return <IconButton onClick={handleLike}>
                <IconHeart />
            </IconButton>
        }
    }

    return <>
        <MainCard sx={{ marginBottom: 3 }}>
            <Box display="flex">
                <Avatar>{account.name && account.name.charAt(0)}</Avatar>
                <Box sx={{ marginLeft: '10px' }}>
                    <Typography variant={'subtitle1'}>{account.name || "Loading"}</Typography>
                    <Typography variant={'subtitle2'}>{
                        props.newsData.createdAt ? formatInputDate(props.newsData.createdAt) : formatInputDate('')
                    }</Typography>
                </Box>
            </Box>
            <Box>
                <Box sx={{ paddingTop: '14px' }}>
                    <div ref={divRender}></div>
                    {convertHtml(props.newsData.text)}
                </Box>
                <Box sx={{ borderBottom: `1px solid ${borderColor}`, marginBottom: 1 }}>
                    <Box display="flex" marginLeft={"-11px"}>
                        {renderHeart()}
                        <IconButton disabled sx={{ fontSize: '20px' }}>{newsletter.usersLike.length}</IconButton>
                    </Box>
                </Box>
            </Box>
            <Box>
                {
                    commentList.length !== 0 ?
                        commentList.map((row, index) => {
                            return <Comment
                                key={index}
                                comment={row}
                                userID={props.userID}
                            />
                        })
                        : <div></div>
                }
            </Box>
            <Box>
                <Box display="flex" marginTop={1}>
                    <Avatar sx={{ width: 28, height: 28 }}>{account.name && account.name.charAt(0)}</Avatar>
                    <Input sx={{
                        position: 'relative',
                        marginLeft: '10px',
                        padding: '10px',
                        borderRadius: '10px',
                        border: `1px solid ${borderColor}`,
                        flex: 1
                    }}

                        onChange={(e) => {
                            setComment(prev => ({ ...prev, text: e.target.value }))
                        }}
                        variant="outlined"
                        fullWidth
                    />
                    <IconButton color="primary" onClick={addComment}>
                        <SendIcon />
                    </IconButton>
                </Box>
            </Box>
        </MainCard>
    </>
}

export default News