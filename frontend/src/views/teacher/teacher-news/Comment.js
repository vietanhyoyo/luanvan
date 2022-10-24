import MainCard from "ui-component/cards/MainCard";
import moment from "moment";
import {
    Box, Avatar, Typography,
    IconButton, Input,
} from "@mui/material"
import { IconHeart } from '@tabler/icons';
import ReplyIcon from '@mui/icons-material/Reply';
import { useState, useEffect } from 'react'
import ReComment from './ReComment'
import SendIcon from '@mui/icons-material/Send';
import NewsService from "services/objects/news.service";
import FavoriteIcon from '@mui/icons-material/Favorite';

function formatInputDate(dateString) {
    let date = new Date(Date.now());
    if (dateString !== '')
        date = new Date(dateString);
    return moment(date).format('DD-MM-YYYY');
}
const baseUrl = process.env.REACT_APP_BASE_URL
const newsService = new NewsService();
const borderColor = '#F4F6F8'

const Comment = (props) => {

    const [comment, setComment] = useState({
        createUser: {
            name: 'No name',
            avatar: ''
        },
        text: '',
        usersLike: []
    })
    const [openInput, setOpenInput] = useState(false)
    const [reComment, setReComment] = useState({
        comment: '',
        text: '',
        createUser: ''
    })
    const [reCommentList, setReCommentList] = useState([])
    const [hidden, setHidden] = useState(true)

    const handleToggle = () => {
        setOpenInput(!openInput)
    }

    const addReComment = async (e) => {
        e.preventDefault();
        try {
            const result = await newsService.addReComment(reComment.text, reComment.comment)
            setReComment(prev => ({ ...prev, text: "" }))
            getReComment();
            setOpenInput(false);
        } catch (error) {
            console.log(error)
        }
    }

    const getReComment = async () => {
        try {
            const result = await newsService.getReComment(props.comment._id)
            setReCommentList(result.data)
        } catch (error) {
            console.log(error)
        }
    }

    useState(() => {
        getReComment()
        setComment(props.comment)
        setReComment(prev => ({ ...prev, comment: props.comment._id }))
    }, [])

    const handleComment = async () => {
        try {
            const result = await newsService.likeComment(props.comment._id)
            setComment(result.data._doc)
        } catch (error) {
            console.log(error)
        }
    }

    const renderHeart = () => {
        const bool = comment.usersLike.includes(props.userID)
        if (bool) {
            return <IconButton onClick={handleComment} sx={{ color: "#F51E4B", width: '34px', height: '34px' }}>
                <FavoriteIcon />
            </IconButton>
        } else {
            return <IconButton sx={{ width: '34px', height: '34px' }} onClick={handleComment}>
                <IconHeart />
            </IconButton>
        }
    }

    return <Box>
        <Box display="flex" marginBottom={2}>
            {comment.createUser.avatar ? <Avatar
                alt="profile"
                src={baseUrl + "/image/" + comment.createUser.avatar}
                sx={{ width: 28, height: 28 }}
            /> : <Avatar
                alt="profile"
                label='T'
                sx={{ width: 28, height: 28 }}
            />}
            <Box sx={{
                position: 'relative',
                backgroundColor: borderColor,
                marginLeft: '10px',
                padding: '10px',
                borderRadius: '10px',
                flex: 1
            }}>
                <Box display="flex" justifyContent="space-between">
                    <Typography variant="subtitle1">{props.comment.createUser.name}</Typography>
                    <Typography variant="caption">
                        {comment.createdAt ? formatInputDate(comment.createdAt) : formatInputDate('')}
                    </Typography>
                </Box>
                <Box display="flex">
                    <Typography variant="body2">{comment.text}</Typography>
                    <Box width={100}></Box>
                </Box>
                <Box
                    display="flex"
                    sx={{
                        position: 'absolute',
                        right: 10,
                        bottom: -10,
                    }}
                >
                    <IconButton sx={{
                        width: '34px',
                        height: '34px',
                        backgroundColor: '#FFFFFF',
                        border: `1px solid ${borderColor}`,
                        marginRight: '3px'
                    }}
                        onClick={handleToggle}
                    >
                        <ReplyIcon />
                    </IconButton>
                    <Box
                        display={'flex'}
                        sx={{
                            backgroundColor: '#FFFFFF',
                            width: 'max-content',
                            borderRadius: '16px',
                            border: `1px solid ${borderColor}`
                        }}
                    >
                        {renderHeart()}
                        <Typography sx={{ marginRight: '10px', height: '34px', fontSize: '16px', lineHeight: '34px' }}>
                            {comment.usersLike.length}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
        {openInput && <form
            style={{
                display: "flex",
                marginBottom: '16px'
            }}
            onSubmit={addReComment}
        >
            {props.userInfor.avatar ? <Avatar
                alt="profile"
                src={baseUrl + "/image/" + props.userInfor.avatar}
                sx={{ width: 28, height: 28, marginLeft: '40px' }}
            /> : <Avatar
                alt="profile"
                label='T'
                sx={{ width: 28, height: 28, marginLeft: '40px' }}
            />}
            <Input sx={{
                position: 'relative',
                marginLeft: '10px',
                padding: '10px',
                borderRadius: '10px',
                border: `1px solid ${borderColor}`,
                flex: 1
            }}
                value={reComment.text}
                name="recomment"
                onChange={e => setReComment(prev => ({ ...prev, text: e.target.value }))}
                variant="outlined"
                fullWidth
            />
            <IconButton color="primary" type="submit">
                <SendIcon />
            </IconButton>
        </form>}
        {

            reCommentList.length !== 0 ?
                (hidden ? <Box
                    onClick={() => setHidden(false)}
                    sx={{ marginTop: '-10px', marginLeft: '40px', marginBottom: '5px' }}
                ><Typography
                    variant="caption"
                >Xem phản hồi</Typography></Box> :
                    reCommentList.map((row, index) => {
                        return <ReComment
                            key={index}
                            recomment={row}
                            userID={props.userID}
                            userInfor={props.userInfor}
                            getReComment={getReComment}
                        />
                    }))
                : <div></div>
        }
    </Box>
}

export default Comment