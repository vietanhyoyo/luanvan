import MainCard from "ui-component/cards/MainCard";
import {
    Grid, Box, Avatar, Typography, Button,
    IconButton, TextField, Input, Divider,
    Dialog, DialogTitle, DialogContent, DialogActions
} from "@mui/material"
import { gridSpacing } from 'store/constant';
import { IconHeart } from '@tabler/icons';
import AddIcon from '@mui/icons-material/Add';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SendIcon from '@mui/icons-material/Send';
import { useState, useEffect } from 'react'
import AddNews from "./teacher-news/AddNews";
import News from "./teacher-news/News";
import NewsService from "services/objects/news.service";
import AdminService from "services/objects/admin.service";
import { verify } from 'jsonwebtoken'
import { ApiPath, StorageKeys } from "store/constant";

const newsService = new NewsService()
const adminService = new AdminService()

const borderColor = '#F4F6F8'

const TeacherNews = () => {

    const [loading, setLoading] = useState(true)
    const [newsList, setNewsList] = useState([])
    const [user, setUser] = useState({
        _id: ''
    })

    const getAll = async () => {
        try {
            const result = await newsService.getAll()
            setLoading(false)
            setNewsList(result.data)
        } catch (error) {
            console.log(error)
        }
    }

    const getUser = async () => {
        try {
            const result = await adminService.getUserInfo()
            setUser(result.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAll()
        getUser()
    }, [])

    return loading ?
        <div>Chưa load xong</div> :
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12} display='flex' justifyContent='center'>
                <Grid container spacing={gridSpacing} maxWidth={'1200px'}>
                    <Grid item lg={8} md={8} sm={12} xs={12}>
                        {
                            newsList.map((row, index) => {
                                return <News
                                    newsData={row}
                                    key={index}
                                    userID={user._id}
                                />
                            })
                        }
                    </Grid>
                    <Grid item lg={4} md={4} sm={12} xs={12}>
                        <MainCard>
                            <AddNews />
                        </MainCard>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
}

export default TeacherNews;