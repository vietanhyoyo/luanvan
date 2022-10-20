import MainCard from "ui-component/cards/MainCard";
import moment from "moment";
import {
    Box, Avatar, Typography,
    IconButton, Input
} from "@mui/material"
import { IconHeart } from '@tabler/icons';
import { useState, useEffect } from 'react'
import ReplyIcon from '@mui/icons-material/Reply';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NewsService from "services/objects/news.service";

import SendIcon from '@mui/icons-material/Send';

const baseUrl = process.env.REACT_APP_BASE_URL
const newsService = new NewsService();
const borderColor = '#F4F6F8'

function formatInputDate(dateString) {
    let date = new Date(Date.now());
    if (dateString !== '')
        date = new Date(dateString);
    return moment(date).format('DD-MM-YYYY');
}

const ReComment = (props) => {

    const [reComment, setReComment] = useState({
        createUser: {
            name: 'No name',
            avatar: ''
        },
        text: '',
        usersLike: []
    })
    const [openInput, setOpenInput] = useState(false)
    const [newReComment, setNewReComment] = useState({
        text: '',
    })

    useEffect(() => {
        setReComment(props.recomment)
    }, [])

    const handleLike = async () => {
        try {
            const result = await newsService.likeReComment(props.recomment._id)
            setReComment(result.data._doc);
        } catch (error) {
            console.log(error)
        }
    }

    const renderHeart = () => {
        const bool = reComment.usersLike.includes(props.userID)
        if (bool) {
            return <IconButton onClick={handleLike} sx={{ color: "#F51E4B", width: '34px', height: '34px' }}>
                <FavoriteIcon />
            </IconButton>
        } else {
            return <IconButton sx={{ width: '34px', height: '34px' }} onClick={handleLike}>
                <IconHeart />
            </IconButton>
        }
    }

    const addReComment = async (e) => {
        e.preventDefault();
        try {
            const result = await newsService.addReComment(newReComment.text, reComment.comment)
            setNewReComment(prev => ({ ...prev, text: "" }))
            props.getReComment();
            setOpenInput(false);
        } catch (error) {
            console.log(error)
        }
    }

    return <><Box display="flex" marginBottom={2}>
        {reComment.createUser.avatar ? <Avatar
            alt="profile"
            src={baseUrl + "/image/" + reComment.createUser.avatar}
            sx={{ width: 28, height: 28, marginLeft: '40px' }}
        /> : <Avatar
            alt="profile"
            label='T'
            sx={{ width: 28, height: 28, marginLeft: '40px' }}
        />}
        <Box sx={{
            position: 'relative',
            backgroundColor: borderColor,
            marginLeft: '10px',
            padding: '10px',
            borderRadius: '10px'
        }}>
            <Box display="flex" justifyContent="space-between">
                <Typography variant="subtitle1">{reComment.createUser.name}</Typography>
                <Typography variant="caption"> {reComment.createdAt ? formatInputDate(reComment.createdAt) : formatInputDate('')}</Typography>
            </Box>
            <Box display="flex">
                <Typography variant="body2">{reComment.text}</Typography>
                <Box width={150}></Box>
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
                    onClick={() => setOpenInput(true)}
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
                        {reComment.usersLike.length}
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
                value={newReComment.text}
                name="recomment"
                onChange={e => setNewReComment(prev => ({ ...prev, text: e.target.value }))}
                variant="outlined"
                fullWidth
            />
            <IconButton color="primary" type="submit">
                <SendIcon />
            </IconButton>
        </form>}
    </>
}

export default ReComment