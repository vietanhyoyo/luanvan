// material-ui
import { Grid, TextField, Typography, Box, Button, Snackbar } from '@mui/material';
// project imports
import MainCard from 'ui-component/cards/MainCard';
// material-ui
import { styled, useTheme } from '@mui/material/styles';
import ProfileAvatar from 'ui-component/ProfileAvatar';
import { useState, useEffect, forwardRef } from 'react'
import { gridSpacing } from 'store/constant';
import TeacherService from 'services/objects/teacher.service';
import moment from 'moment';
import MuiAlert from '@mui/material/Alert';
import ResetPassword from 'ui-component/ResetPassword';

const teacherService = new TeacherService()

function formatInputDate(dateString) {
    let date = new Date(Date.now());
    if (dateString !== '')
        date = new Date(dateString);
    return moment(date).format('YYYY-MM-DD');
}

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


const TeacherProfile = () => {
    const [notification, setNotification] = useState({
        open: false,
        message: 'Đã thêm 1 năm học mới!',
        status: 'success'
    })
    const [user, setUser] = useState({
        name: '',
        account: {
            _id: '',
            username: ''
        },
        sex: '',
        classInCharge: [],
        ethnic: '',
        idStudent: '',
        phone: '',
        email: '',
        birthday: null,
        homeTown: '',
        residence: '',
        position: '',
        socialInsurance: '',
        identityCard: ''
    })


    const getAPI = async () => {
        try {
            const result = await teacherService.getInformation();
            setUser(result.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAPI();
    }, [])

    const updateInformation = async () => {
        const data = {
            ...user,
            account: user.account._id
        }

        try {
            const result = await teacherService.update(user.account, data)
            getAPI();
            setNotification({
                open: true,
                message: 'Đã thay đổi thành công',
                status: 'success'
            })
        } catch (error) {
            console.log(error)
            setNotification({
                open: true,
                message: 'Lỗi server',
                status: 'error'
            })
        }
    }

    const handleReset = () => {
        getAPI();
    }

    const handleChange = (e) => {
        const name = e.target.name
        setUser(prev => ({ ...prev, [name]: e.target.value }))
    }

    const handleCloseAlert = () => {
        setNotification(prev => ({
            ...prev,
            open: false
        }))
    }


    return <><Grid container spacing={gridSpacing} justifyContent="center">
        <Grid item lg={10} md={10} sm={12} xs={12}>
            <Grid container spacing={gridSpacing} justifyContent={"center"}>
                <Grid item lg={4} md={12} sm={12} xs={12}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item sm={12} xs={12} md={12} lg={12}>
                            <MainCard>
                                <ProfileAvatar
                                    fullname={user.name}
                                    title={user.homeroomTeacher ? "Chủ nhiệm " + user.homeroomClass.name : "Giáo viên bộ môn"}
                                />
                            </MainCard>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item lg={8} md={12} sm={12} xs={12}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item sm={12} xs={12} md={12} lg={12}>
                            <MainCard title="Thông tin cá nhân">
                                <Grid container spacing={1} justifyContent="center">
                                    <Grid item sm={12} xs={12} md={12} lg={6} >
                                        <Box width={"100%"} pr={2} >
                                            <TextField sx={{ margin: 1, width: "100%" }}
                                                required
                                                label="Tên của bạn"
                                                value={user.name}
                                                variant="outlined"
                                                disabled={true}
                                            />
                                            <TextField
                                                sx={{ margin: 1, width: "100%" }}
                                                required
                                                label="Giới tính"
                                                variant="outlined"
                                                value={user.sex}
                                                disabled={true}
                                            />
                                            <TextField
                                                sx={{ margin: 1, width: "100%" }}
                                                required
                                                label="Dân tộc"
                                                variant="outlined"
                                                value={user.ethnic}
                                                name='ethnic'
                                                onChange={handleChange}
                                            />
                                            <TextField
                                                sx={{ margin: 1, width: "100%" }}
                                                required
                                                label="Số điện thoại"
                                                variant="outlined"
                                                name='phone'
                                                onChange={handleChange}
                                                value={user.phone}
                                            />
                                            <TextField
                                                sx={{ margin: 1, width: "100%" }}
                                                required
                                                label="CMDN/CCCD"
                                                variant="outlined"
                                                name='identityCard'
                                                onChange={handleChange}
                                                value={user.identityCard}
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid item sm={12} xs={12} md={12} lg={6}>
                                        <Box width={"100%"} pr={2}>
                                            <TextField
                                                sx={{ margin: 1, width: "100%" }}
                                                required
                                                label="Tên tài khoản"
                                                variant="outlined"
                                                value={user.account.username}
                                                disabled={true}
                                            />
                                            <TextField
                                                sx={{ margin: 1, width: "100%" }}
                                                required
                                                label="Email"
                                                variant="outlined"
                                                value={user.email}
                                                name='email'
                                                onChange={handleChange}
                                            />
                                            <TextField
                                                sx={{ margin: 1, width: "100%" }}
                                                required
                                                label="Ngày sinh"
                                                variant="outlined"
                                                type={'date'}
                                                value={user.birthday ? formatInputDate(user.birthday) : formatInputDate('')}
                                                name='birthday'
                                                onChange={handleChange}
                                            />
                                            <TextField
                                                sx={{ margin: 1, width: "100%" }}
                                                required
                                                label="Số bảo hiểm y tế"
                                                variant="outlined"
                                                value={user.socialInsurance}
                                                disabled={true}
                                            />
                                            <TextField
                                                sx={{ margin: 1, width: "100%" }}
                                                required
                                                label="Chức vụ"
                                                variant="outlined"
                                                value={user.position}
                                                disabled={true}
                                            />
                                        </Box>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={1} justifyContent="center">
                                    <Grid item xs={12} >
                                        <Box width={"100%"} pr={2}>
                                            <TextField
                                                sx={{ margin: 1, width: "100%" }}
                                                required
                                                label="Quê quán"
                                                variant="outlined"
                                                value={user.homeTown}
                                                name='homeTown'
                                                onChange={handleChange}
                                            />
                                            <TextField
                                                sx={{ margin: 1, width: "100%" }}
                                                required
                                                label="Nơi cư trú"
                                                variant="outlined"
                                                value={user.residence}
                                                name='residence'
                                                onChange={handleChange}
                                            />
                                        </Box>
                                    </Grid>
                                </Grid>
                                <Grid container justifyContent="center">
                                    <Grid item xs={12} >
                                        <Box pr={2} sx={{
                                            display: 'flex',
                                            width: '100%',
                                            justifyContent: 'end',
                                            marginTop: 1
                                        }}>
                                            <Button sx={{ marginRight: 2 }} onClick={handleReset}>Trở lại</Button>
                                            <Button
                                                variant="contained"
                                                onClick={updateInformation}
                                            >Lưu</Button>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </MainCard>
                        </Grid>
                        <Grid item xs={12}>
                            <ResetPassword userID={user.account._id} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </Grid>
        <Snackbar open={notification.open} autoHideDuration={6000} onClose={handleCloseAlert}>
            <Alert onClose={handleCloseAlert} severity={notification.status} sx={{ width: '100%' }}>
                {notification.message}
            </Alert>
        </Snackbar>
    </>
}

export default TeacherProfile