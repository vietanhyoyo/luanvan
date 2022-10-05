
import moment from 'moment';
// material-ui
import {
    Typography, Button, InputAdornment, InputLabel, FormControl, Input,
    CardContent, TextField, Box, IconButton, FormControlLabel, Checkbox,
    MenuItem, Select
} from '@mui/material';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { useEffect, useState } from 'react';
import StudentService from 'services/objects/student.service';
import ClassService from 'services/objects/class.service';

import { useNavigate, useParams } from 'react-router-dom';

const offAutoComplete = {
    autoComplete: 'new-password',
    form: {
        autoComplete: 'off',
    },
}

const studentService = new StudentService();
const classService = new ClassService();

function formatInputDate(dateString) {
    let date = new Date(Date.now());
    if (dateString !== '')
        date = new Date(dateString);
    return moment(date).format('YYYY-MM-DD');
}

const inputStyle = { marginRight: '14px', marginBottom: '14px' };

const UpdateStudent = () => {

    const { id } = useParams();

    const [showPassword, setShowPassword] = useState(false);
    const [warning, setWarning] = useState({
        name: null,
        username: null,
        password: null,
        ethnic: null,
        identityCard: null,
        homeTown: null,
        phone: null,
        idStudent: null
    })
    const [student, setStudent] = useState({
        account: {
            name: " ",
            password: " ",
            refreshToken: null,
            role: 1,
            updatedAt: " ",
            username: " ",
            _id: " "
        },
        name: "",
        idStudent: "",
        username: "",
        password: "",
        class: "",
        address: "",
        parent: "",
        ethnic: "",
        homeTown: "",
        birthday: null,
        phoneNumber: "",
        email: "",
        avatar: "",
    })
    const [account, setAccount] = useState({
        name: " ",
        password: " ",
        refreshToken: null,
        role: 1,
        updatedAt: " ",
        username: " ",
        _id: " "
    })
    const [classList, setClassList] = useState([]);
    const [selectClass, setSelectClass] = useState(-1);

    const getNowClassList = async () => {
        try {
            const result = await classService.getNowClasses();
            setClassList(result.data);
        } catch (error) {
            console.log(error);
        }
    }

    const getStudent = async () => {
        try {
            const result = await studentService.getOneStudentByID(id);
            const data = result.data.data;
            setStudent(data)
            setAccount(data.account)
            // if (data.class !== null) {
            //     const chooseClass = classList.findIndex(element => element._id === data.class);
            //     console.log(chooseClass);
            // }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(async () => {
        await getNowClassList();
        await getStudent();
    }, [])

    useEffect(() => {
        const chooseClass = classList.findIndex(element => element._id === student.class);
        if (chooseClass !== -1) setSelectClass(chooseClass);
    }, [student])

    const navigate = useNavigate();

    const handleCancel = () => {
        navigate('/manager/student');
    }

    const handleSave = async () => {
        if (
            student.name === "" ||
            student.username === "" ||
            student.password === "" ||
            student.ethnic === "" ||
            student.birthday === null ||
            student.phoneNumber === "" ||
            student.idStudent === ""
        ) {
            alert('Bạn chưa nhập đủ thông tin');
            return;
        }
        const postData = student;
        const postAccount = account;

        postData.class = selectClass !== -1 ? classList[selectClass]._id : null;
        postData.account = account._id;

        try {

            const result = await studentService.update(postAccount, postData);
            console.log(result);
            navigate('/manager/student');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <MainCard title="Cập nhật thông tin học sinh">
            <CardContent>
                <Typography gutterBottom variant="h4" component="div">
                    Thông tin tài khoản
                </Typography>
                <Box mt={3}>
                    <TextField
                        label="Họ và tên"
                        required
                        variant="standard"
                        sx={inputStyle}
                        value={student.name}
                        onChange={(event) => {
                            setStudent(prev => ({
                                ...prev,
                                name: event.target.value
                            }))
                            setAccount(prev => ({
                                ...prev,
                                name: event.target.value
                            }))
                        }}
                        error={warning.name ? true : false}
                        helperText={Boolean(warning.name)
                            ? warning.name
                            : null}
                        onBlur={(event) => {
                            if (event.target.value === '') {
                                setWarning(prev => ({ ...prev, name: 'Chưa nhập tên.' }))
                            }
                        }}
                        onFocus={() => setWarning(prev => ({ ...prev, name: null }))}
                        inputProps={offAutoComplete} />
                    <TextField label="Tài khoản đăng nhập"
                        required
                        value={account.username}
                        error={warning.username ? true : false}
                        helperText={Boolean(warning.username)
                            ? warning.username
                            : null}
                        onBlur={(event) => {
                            if (event.target.value === '') {
                                setWarning(prev => ({ ...prev, username: 'Chưa nhập tài khoản.' }))
                            }
                        }}
                        onFocus={() => setWarning(prev => ({ ...prev, username: null }))}
                        onChange={(event) => setAccount(prev => ({
                            ...prev,
                            username: event.target.value
                        }))}
                        variant="standard"
                        sx={inputStyle}
                        inputProps={offAutoComplete} />
                </Box>
            </CardContent>
            <CardContent>
                <Typography gutterBottom variant="h4" component="div">
                    Thông tin cá nhân
                </Typography>
                <Box mt={2}>
                    <TextField label="Tên phụ huynh"
                        variant="standard"
                        value={student.parent}
                        onChange={(event) => setStudent(prev => ({
                            ...prev,
                            parent: event.target.value
                        }))}
                        sx={inputStyle}
                        inputProps={offAutoComplete} />
                    <TextField label="Số điện thoại"
                        required
                        variant="standard"
                        value={student.phoneNumber}
                        onChange={(event) => setStudent(prev => ({
                            ...prev,
                            phoneNumber: event.target.value
                        }))}
                        error={warning.phone ? true : false}
                        helperText={Boolean(warning.phone)
                            ? warning.phone
                            : null}
                        onBlur={(event) => {
                            if (event.target.value === '') {
                                setWarning(prev => ({ ...prev, phone: 'Bạn cần nhập số điện thoại' }))
                            }
                        }}
                        onFocus={() => setWarning(prev => ({ ...prev, phone: null }))}
                        sx={inputStyle}
                        inputProps={offAutoComplete} />
                    <TextField
                        label="Email"
                        type="email"
                        value={student.email}
                        onChange={(event) => setStudent(prev => ({
                            ...prev,
                            email: event.target.value
                        }))}
                        variant="standard"
                        sx={inputStyle}
                        inputProps={offAutoComplete} />
                </Box>
                <Box mt={2}>
                    <TextField label="Dân tộc"
                        required
                        variant="standard"
                        error={warning.ethnic ? true : false}
                        helperText={Boolean(warning.ethnic)
                            ? warning.ethnic
                            : null}
                        onBlur={(event) => {
                            if (event.target.value === '') {
                                setWarning(prev => ({ ...prev, ethnic: 'Cần bổ xung' }))
                            }
                        }}
                        onFocus={() => setWarning(prev => ({ ...prev, ethnic: null }))}
                        sx={inputStyle}
                        value={student.ethnic}
                        onChange={(event) => setStudent(prev => ({
                            ...prev,
                            ethnic: event.target.value
                        }))}
                        inputProps={offAutoComplete} />
                    <TextField
                        id="date"
                        required
                        label="Ngày sinh"
                        variant="standard"
                        type="date"
                        sx={inputStyle}
                        InputLabelProps={{ shrink: true, }}
                        value={student.birthday ? formatInputDate(student.birthday) : formatInputDate('')}
                        onChange={(event) => setStudent(prev => ({
                            ...prev,
                            birthday: event.target.value
                        }))}
                    />

                </Box>
            </CardContent>
            <CardContent>
                <Typography gutterBottom variant="h4" component="div">
                    Địa chỉ
                </Typography>
                <Box mt={2}>
                    <TextField label="Quê quán"
                        variant="standard"
                        value={student.homeTown}
                        onChange={(event) => setStudent(prev => ({
                            ...prev,
                            homeTown: event.target.value
                        }))}
                        sx={[inputStyle, { width: '280px' }]}
                        inputProps={offAutoComplete} />
                    <TextField label="Nơi ở thường trú"
                        required
                        value={student.address}
                        onChange={(event) => setStudent(prev => ({
                            ...prev,
                            address: event.target.value
                        }))}
                        variant="standard"
                        error={warning.residence ? true : false}
                        helperText={Boolean(warning.residence)
                            ? warning.residence
                            : null}
                        onBlur={(event) => {
                            if (event.target.value === '') {
                                setWarning(prev => ({ ...prev, residence: 'Bổ xung nơi ở' }))
                            }
                        }}
                        onFocus={() => setWarning(prev => ({ ...prev, residence: null }))}
                        sx={[inputStyle, { width: '280px' }]}
                        inputProps={offAutoComplete} />
                </Box>
            </CardContent>
            <CardContent >
                <Typography gutterBottom variant="h4" component="div">
                    Thông tin học sinh
                </Typography>
                <Box mt={2}>
                    <TextField label="Mã học sinh"
                        required
                        variant="standard"
                        value={student.idStudent}
                        onChange={(event) => setStudent(prev => ({
                            ...prev,
                            idStudent: event.target.value
                        }))}
                        error={warning.idStudent ? true : false}
                        helperText={Boolean(warning.idStudent)
                            ? warning.idStudent
                            : null}
                        onBlur={(event) => {
                            if (event.target.value === '') {
                                setWarning(prev => ({ ...prev, idStudent: 'Hãy nhập mã học sinh' }))
                            }
                        }}
                        onFocus={() => setWarning(prev => ({ ...prev, idStudent: null }))}
                        sx={inputStyle}
                        inputProps={offAutoComplete} />
                    <FormControl variant="standard" sx={{ minWidth: 120 }}>
                        <InputLabel id="year-filter-select-label">Lớp</InputLabel>
                        <Select
                            labelId="homeroomClass-select-label"
                            id="homeroomClass-select"
                            value={selectClass}
                            label="Class"
                            onChange={(event) => {
                                setSelectClass(event.target.value);
                            }}
                        >
                            <MenuItem value={-1}> </MenuItem>
                            {

                                classList.length > 0 &&
                                classList.map((row, index) => {
                                    return <MenuItem key={index} value={index}>{row.name}</MenuItem>
                                })
                            }
                        </Select>
                    </FormControl>
                </Box>
            </CardContent>
            <CardContent sx={{ display: 'flex' }}>
                <Box mr={2}>
                    <Button variant="outlined" onClick={handleCancel}>Hủy</Button>
                </Box>
                <Box>
                    <Button variant="contained" onClick={handleSave}>Lưu thay đổi</Button>
                </Box>
            </CardContent>
        </MainCard>
    );
}

export default UpdateStudent;
