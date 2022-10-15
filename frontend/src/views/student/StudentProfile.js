// material-ui
import { Grid, TextField, Typography, Box, Button } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
// material-ui
import { styled, useTheme } from '@mui/material/styles';
import ProfileAvatar from 'ui-component/ProfileAvatar';
import { useState, useEffect } from 'react'
import { gridSpacing } from 'store/constant';
import StudentService from 'services/objects/student.service';
import moment from 'moment';

const studentService = new StudentService()

function formatInputDate(dateString) {
    let date = new Date(Date.now());
    if (dateString !== '')
        date = new Date(dateString);
    return moment(date).format('YYYY-MM-DD');
}

const StudentProfile = () => {

    const [user, setUser] = useState({
        name: '',
        account: {
            username: ''
        },
        class: {
            name: ''
        },
        ethnic: '',
        idStudent: '',
        phoneNumber: '',
        email: '',
        parent: '',
        birthday: null,
        homeTown: '',
        address: ''
    })

    const getAPI = async () => {
        try {
            const result = await studentService.getStudentInformation();
            setUser(result.data);
            console.log(result);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAPI();
    }, [])

    const updateInformation = () => {
        console.log(user)
    }

    const handleChange = (e) => {
        const name = e.target.name
        setUser(prev => ({...prev, [name] : e.target.value}))
    }

    return <Grid container spacing={gridSpacing} justifyContent="center">
        <Grid item lg={10} md={10} sm={12} xs={12}>
            <Grid container spacing={gridSpacing} justifyContent={"center"}>
                <Grid item lg={4} md={12} sm={12} xs={12}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item sm={12} xs={12} md={12} lg={12}>
                            <MainCard>
                                <ProfileAvatar fullname={user.name} title={user.class.name} />
                            </MainCard>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item lg={8} md={12} sm={12} xs={12}>
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
                                        name='phoneNumber'
                                        onChange={handleChange}
                                        value={user.phoneNumber}
                                    />
                                    <TextField
                                        sx={{ margin: 1, width: "100%" }}
                                        required
                                        label="Tên phụ huynh"
                                        variant="outlined"
                                        name='parent'
                                        onChange={handleChange}
                                        value={user.parent}
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
                                        label="Mã học sinh"
                                        variant="outlined"
                                        value={user.idStudent}
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
                                    />
                                    <TextField
                                        sx={{ margin: 1, width: "100%" }}
                                        required
                                        label="Nơi cư trú"
                                        variant="outlined"
                                        value={user.address}
                                    />
                                </Box>
                            </Grid>
                        </Grid>
                        <Grid container spacing={1} justifyContent="center">
                            <Grid item xs={12} >
                                <Box pr={2} sx={{
                                    display: 'flex',
                                    width: '100%',
                                    justifyContent: 'end',
                                    marginTop: 1
                                }}>
                                    <Button sx={{marginRight: 2}}>Tải lại</Button>
                                    <Button 
                                    variant="contained" 
                                    onClick={updateInformation}
                                    >Lưu</Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </MainCard>
                </Grid>
            </Grid>
        </Grid>
    </Grid>
};

export default StudentProfile;
