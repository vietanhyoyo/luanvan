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
import { useState } from 'react'
import AddNews from "./teacher-news/AddNews";

const borderColor = '#F4F6F8'

const TeacherNews = () => {

    return <>
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12} display='flex' justifyContent='center'>
                <Grid container spacing={gridSpacing} maxWidth={'1200px'}>
                    <Grid item lg={8} md={8} sm={12} xs={12}>
                        <MainCard>
                            <Box display="flex">
                                <Avatar>B</Avatar>
                                <Box sx={{ marginLeft: '10px' }}>
                                    <Typography variant={'subtitle1'}>Trần Thị Điệp</Typography>
                                    <Typography variant={'subtitle2'}>03/09/2022</Typography>
                                </Box>
                            </Box>
                            <Box>
                                <Box sx={{ paddingTop: '14px' }}>
                                    <Typography>
                                        Hello! Xin chào các bạn mình là Tôi Đi Code Dạo!
                                        <img
                                            style={{ width: '100%' }}
                                            alt={'dd'}
                                            src={'https://znews-photo.zingcdn.me/w660/Uploaded/mdf_rkxrxd/2019_05_03/Avengers_1_1.jpg'}
                                        />
                                    </Typography>
                                </Box>
                                <Box sx={{ borderBottom: `1px solid ${borderColor}`, marginBottom: 1 }}>
                                    <Box display="flex" marginLeft={"-11px"}>
                                        <IconButton>
                                            <IconHeart />
                                        </IconButton>
                                        <IconButton disabled sx={{ fontSize: '20px' }}>
                                            12
                                        </IconButton>
                                    </Box>
                                </Box>
                            </Box>
                            <Box>
                                <Box>
                                    <Box display="flex" marginBottom={2}>
                                        <Avatar>F</Avatar>
                                        <Box sx={{
                                            position: 'relative',
                                            backgroundColor: borderColor,
                                            marginLeft: '10px',
                                            padding: '10px',
                                            borderRadius: '10px',
                                            flex: 1
                                        }}>
                                            <Box display="flex" justifyContent="space-between">
                                                <Typography variant="subtitle1">Hà Minh Thu</Typography>
                                                <Typography variant="caption">02/09/2022</Typography>
                                            </Box>
                                            <Box display="flex">
                                                <Typography variant="body2">Xin chào bạn Tôi Đi Code Dạo!
                                                    Bạn có khỏe không bạn!</Typography>
                                                <Box width={100}></Box>
                                            </Box>
                                            <Box
                                                display="flex"
                                                sx={{
                                                    position: 'absolute',
                                                    right: 10,
                                                    bottom: -10,
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
                                                    120
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Box display="flex" marginBottom={2}>
                                        <Box width={'46px'}
                                            sx={{
                                                borderTop: `2px solid ${borderColor}`,
                                                marginTop: '13px',
                                                marginRight: '4px'
                                            }}></Box>
                                        <Avatar sx={{ width: 28, height: 28 }}>G</Avatar>
                                        <Box sx={{
                                            position: 'relative',
                                            backgroundColor: borderColor,
                                            marginLeft: '10px',
                                            padding: '10px',
                                            borderRadius: '10px'
                                        }}>
                                            <Box display="flex" justifyContent="space-between">
                                                <Typography variant="subtitle1">Lê Minh Tới</Typography>
                                                <Typography variant="caption">02/09/2022</Typography>
                                            </Box>
                                            <Box display="flex">
                                                <Typography variant="body2">
                                                    Xin chào bạn Tôi Đi Code Dạo!
                                                    Bạn có khỏe không bạn! dfds Bạn có khỏe không bạn! dfds
                                                    Bạn có khỏe không bạn! dfds Bạn có khỏe không bạn! dfds
                                                    Bạn có khỏe không bạn! dfds Bạn có khỏe không bạn! dfds

                                                </Typography>
                                                <Box width={100}></Box>
                                            </Box>
                                            <Box
                                                display="flex"
                                                sx={{
                                                    position: 'absolute',
                                                    right: 10,
                                                    bottom: -10,
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
                                                    0
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Box display="flex" marginBottom={2}>
                                        <Box width={46}
                                            sx={{
                                                borderTop: `2px solid ${borderColor}`,
                                                marginTop: '13px',
                                                marginRight: '4px'
                                            }}></Box>
                                        <Avatar sx={{ width: 28, height: 28 }}>G</Avatar>
                                        <Box sx={{
                                            position: 'relative',
                                            backgroundColor: borderColor,
                                            marginLeft: '10px',
                                            padding: '10px',
                                            borderRadius: '10px'
                                        }}>
                                            <Box display="flex" justifyContent="space-between">
                                                <Typography variant="subtitle1">Lê Minh Tới</Typography>
                                                <Typography variant="caption">02/09/2022</Typography>
                                            </Box>
                                            <Box display="flex">
                                                <Typography variant="body2">
                                                    Xin chào bạn Tôi Đi Code Dạo!
                                                    Bạn có khỏe không bạn!
                                                </Typography>
                                                <Box width={100}></Box>
                                            </Box>
                                            <Box
                                                display="flex"
                                                sx={{
                                                    position: 'absolute',
                                                    right: 10,
                                                    bottom: -10,
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
                                                    12
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                                <Box>
                                    <Box display="flex" marginBottom={2}>
                                        <Avatar>P</Avatar>
                                        <Box sx={{
                                            position: 'relative',
                                            backgroundColor: borderColor,
                                            marginLeft: '10px',
                                            padding: '10px',
                                            borderRadius: '10px',
                                            flex: 1
                                        }}>
                                            <Box display="flex" justifyContent="space-between">
                                                <Typography variant="subtitle1">Trần Phi Long</Typography>
                                                <Typography variant="caption">10/09/2022</Typography>
                                            </Box>
                                            <Box>
                                                <Typography variant="body2">Xin chào bạn Tôi Đi Code Dạo!
                                                    Bạn có khỏe không bạn!</Typography>
                                            </Box>
                                            <Box
                                                display="flex"
                                                sx={{
                                                    position: 'absolute',
                                                    right: 10,
                                                    bottom: -10,
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
                                                    12
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                            </Box>
                            <Box>
                                <Box display="flex" marginTop={1}>
                                    <Avatar>F</Avatar>
                                    <Input sx={{
                                        position: 'relative',
                                        marginLeft: '10px',
                                        padding: '10px',
                                        borderRadius: '10px',
                                        border: `1px solid ${borderColor}`,
                                        flex: 1
                                    }}
                                        variant="outlined"
                                        fullWidth
                                    />
                                    <IconButton color="primary">
                                        <SendIcon />
                                    </IconButton>
                                </Box>
                            </Box>
                        </MainCard>
                    </Grid>
                    <Grid item lg={4} md={4} sm={12} xs={12}>
                        <MainCard>
                            <AddNews />
                        </MainCard>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </>
}

export default TeacherNews;