import MainCard from "ui-component/cards/MainCard";
import moment from "moment";
import {
    Grid, Box, Avatar, Typography, Button,
    IconButton
} from "@mui/material"
import { IconHeart } from '@tabler/icons';
import { useState, useEffect } from 'react'
import ReplyIcon from '@mui/icons-material/Reply';

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
            name: 'No name'
        },
        text: '',
        usersLike: []
    })

    useEffect(() => {
        setReComment(props.recomment)
    })

    return <><Box display="flex" marginBottom={2}>
        <Avatar sx={{ width: 28, height: 28, marginLeft: '40px' }}>G</Avatar>
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
                    <IconButton sx={{ width: '34px', height: '34px' }}>
                        <IconHeart />
                    </IconButton>
                    <Typography sx={{ marginRight: '10px', height: '34px', fontSize: '16px', lineHeight: '34px' }}>
                        {reComment.usersLike.length}
                    </Typography>
                </Box>
            </Box>
        </Box>
    </Box>
    </>
}

export default ReComment