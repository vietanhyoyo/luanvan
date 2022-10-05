
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
import TeacherService from 'services/objects/teacher.service';
import ClassService from 'services/objects/class.service';
import SubjectService from 'services/objects/subject.service';
import ChooseSubject from './teacher/ChooseSubject';
import ClassInChargeSelect from './teacher/ClassInChargeSelect';

import { useNavigate } from 'react-router-dom';

const offAutoComplete = {
    autoComplete: 'new-password',
    form: {
        autoComplete: 'off',
    },
}

const teacherService = new TeacherService();
const classService = new ClassService();
const subjectService = new SubjectService();

function formatInputDate(dateString) {
    let date = new Date(Date.now());
    if (dateString !== '')
        date = new Date(dateString);
    return moment(date).format('YYYY-MM-DD');
}

const inputStyle = { marginRight: '14px', marginBottom: '14px' };

const AddTeacher = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [warning, setWarning] = useState({
        name: null,
        username: null,
        password: null,
        ethnic: null,
        identityCard: null,
        homeTown: null,
        phone: null,
        email: null,
        avatar: null,
        socialInsurance: null
    })
    const [newTeacher, setNewTeacher] = useState({
        name: "",
        username: "",
        password: "",
        ethnic: "",
        sex: 1,
        birthday: null,
        identityCard: "",
        homeTown: "",
        residence: "",
        phone: "",
        email: "",
        avatar: "",
        subjects: [],
        position: "",
        socialInsurance: "",
        homeroomTeacher: false,
        homeroomClass: null,
        classInCharge: []
    })
    const [classList, setClassList] = useState([]);
    const [selectClass, setSelectClass] = useState(0);

    const getNowClassList = async () => {
        try {
            const result = await classService.getNowClasses();
            setClassList(result.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getNowClassList();
    }, [])

    const navigate = useNavigate();

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const addTeacher = async () => {
        console.log(newTeacher);
        if (
            newTeacher.name === "" ||
            newTeacher.username === "" ||
            newTeacher.password === "" ||
            newTeacher.ethnic === "" ||
            newTeacher.birthday === null ||
            newTeacher.identityCard === "" ||
            newTeacher.residence === "" ||
            newTeacher.phone === "" ||
            newTeacher.email === "" ||
            newTeacher.socialInsurance === ""
        ) {
            alert('Bạn chưa nhập đủ thông tin');
            return;
        }
        try {
            const data = {
                ...newTeacher,
                homeroomClass: newTeacher.homeroomTeacher ? classList[selectClass]._id : null,
                sex: newTeacher.sex === 1 ? "name" : "nữ"
            }
            const result = await teacherService.add(data);
            console.log(result)
            navigate('/manager/teacher');
        } catch (error) {
            console.log(error)
        }
    }

    const handleChangeSubject = (array) => {
        setNewTeacher(prev => ({
            ...prev,
            subjects: array
        }))
    }

    const handleChangeClass = (array) => {
        setNewTeacher(prev => ({
            ...prev,
            classInCharge: array
        }))
    }

    const handleChangeHomeroomTeacher = (event) => {
        setNewTeacher(prev => ({
            ...prev,
            homeroomTeacher: event.target.checked
        }))
    }

    const handleSelectClass = async (event) => {
        setSelectClass(event.target.value);
        try {
            const result = await subjectService.getGrade(classList[event.target.value].grade);
            console.log(result);
            if (result.data.status === "Success") {
                setNewTeacher(prev => ({
                    ...prev,
                    subjects: result.data.data
                }))
                setNewTeacher(prev => ({
                    ...prev,
                    classInCharge: [...prev.classInCharge, classList[event.target.value]._id]
                }))
            } else {
                console.log(result.data.message);
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleCancel = () => {
        navigate('/manager/teacher');
    }

    return (
        <MainCard title="Thêm tài khoản giáo viên">
            <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
                <Box sx={{ maxWidth: "700px" }}>
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
                                value={newTeacher.name}
                                onChange={(event) => setNewTeacher(prev => ({
                                    ...prev,
                                    name: event.target.value
                                }))}
                                error={warning.name ? true : false}
                                helperText={warning.name}
                                onBlur={(event) => {
                                    if (event.target.value === '') {
                                        setWarning(prev => ({ ...prev, name: 'Chưa nhập tên.' }))
                                    }
                                }}
                                onFocus={() => setWarning(prev => ({ ...prev, name: null }))}
                                inputProps={offAutoComplete} />
                            <TextField label="Tài khoản đăng nhập"
                                required
                                value={newTeacher.username}
                                error={warning.username ? true : false}
                                helperText={warning.username}
                                onBlur={(event) => {
                                    if (event.target.value === '') {
                                        setWarning(prev => ({ ...prev, username: 'Chưa nhập tài khoản.' }))
                                    }
                                }}
                                onFocus={() => setWarning(prev => ({ ...prev, username: null }))}
                                onChange={(event) => setNewTeacher(prev => ({
                                    ...prev,
                                    username: event.target.value
                                }))}
                                variant="standard"
                                sx={inputStyle}
                                inputProps={offAutoComplete} />
                            <FormControl sx={inputStyle} variant="standard">
                                <InputLabel htmlFor="adornment-password">Mật khẩu*</InputLabel>
                                <Input
                                    required
                                    inputProps={offAutoComplete}
                                    value={newTeacher.password}
                                    onChange={(event) => setNewTeacher(prev => ({
                                        ...prev,
                                        password: event.target.value
                                    }))}
                                    id="adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                autoComplete="new-password"
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Password"
                                    error={warning.password ? true : false}
                                    helpertext={warning.password}
                                    onBlur={(event) => {
                                        if (event.target.value === '') {
                                            setWarning(prev => ({ ...prev, password: 'Chưa nhập mật khẩu.' }))
                                        }
                                    }}
                                    onFocus={() => setWarning(prev => ({ ...prev, password: null }))}
                                />
                            </FormControl>
                        </Box>
                    </CardContent>
                    <CardContent>
                        <Typography gutterBottom variant="h4" component="div">
                            Thông tin cá nhân
                        </Typography>
                        <Box mt={2}>
                            <TextField label="Dân tộc"
                                required
                                variant="standard"
                                error={warning.ethnic ? true : false}
                                helperText={warning.ethnic}
                                onBlur={(event) => {
                                    if (event.target.value === '') {
                                        setWarning(prev => ({ ...prev, ethnic: 'Cần bổ xung' }))
                                    }
                                }}
                                onFocus={() => setWarning(prev => ({ ...prev, ethnic: null }))}
                                sx={inputStyle}
                                value={newTeacher.ethnic}
                                onChange={(event) => setNewTeacher(prev => ({
                                    ...prev,
                                    ethnic: event.target.value
                                }))}
                                inputProps={offAutoComplete} />
                            <FormControl variant="standard" sx={{ minWidth: 120 }}>
                                <InputLabel>Giới tính</InputLabel>
                                <Select
                                    value={newTeacher.sex}
                                    label="Giới tính"
                                    onChange={e => setNewTeacher(prev => ({
                                        ...prev,
                                        sex: e.target.value
                                    }))}
                                    sx={inputStyle}
                                >
                                    <MenuItem value={1}>nam</MenuItem>
                                    <MenuItem value={2}>nữ</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField
                                id="date"
                                required
                                label="Ngày sinh"
                                variant="standard"
                                type="date"
                                sx={inputStyle}
                                InputLabelProps={{ shrink: true, }}
                                value={newTeacher.birthday ? formatInputDate(newTeacher.birthday) : formatInputDate('')}
                                onChange={(event) => setNewTeacher(prev => ({
                                    ...prev,
                                    birthday: event.target.value
                                }))}
                            />
                            <TextField label="Số điện thoại"
                                required
                                variant="standard"
                                value={newTeacher.phone}
                                onChange={(event) => setNewTeacher(prev => ({
                                    ...prev,
                                    phone: event.target.value
                                }))}
                                error={warning.phone ? true : false}
                                helperText={warning.phone}
                                onBlur={(event) => {
                                    if (event.target.value === '') {
                                        setWarning(prev => ({ ...prev, phone: 'Bạn cần nhập số điện thoại' }))
                                    }
                                }}
                                onFocus={() => setWarning(prev => ({ ...prev, phone: null }))}
                                sx={inputStyle}
                                inputProps={offAutoComplete} />
                        </Box>
                        <Box mt={2}>
                            <TextField label="Email"
                                required
                                type="email"
                                value={newTeacher.email}
                                error={warning.email ? true : false}
                                helperText={warning.email}
                                onBlur={(event) => {
                                    if (event.target.value === '') {
                                        setWarning(prev => ({ ...prev, email: 'Nhập vào email' }))
                                    }
                                }}
                                onFocus={() => setWarning(prev => ({ ...prev, email: null }))}
                                onChange={(event) => setNewTeacher(prev => ({
                                    ...prev,
                                    email: event.target.value
                                }))}
                                variant="standard"
                                sx={inputStyle}
                                inputProps={offAutoComplete} />
                            <TextField label="Số CMND/CCCD"
                                required
                                variant="standard"
                                value={newTeacher.identityCard}
                                onChange={(event) => setNewTeacher(prev => ({
                                    ...prev,
                                    identityCard: event.target.value
                                }))}
                                error={warning.identityCard ? true : false}
                                helperText={warning.identityCard}
                                onBlur={(event) => {
                                    if (event.target.value === '') {
                                        setWarning(prev => ({ ...prev, identityCard: 'Chưa điền thông tin' }))
                                    }
                                }}
                                onFocus={() => setWarning(prev => ({ ...prev, identityCard: null }))}
                                sx={inputStyle}
                                inputProps={offAutoComplete} />
                            <TextField label="Số bảo hiểm y tế"
                                required
                                variant="standard"
                                value={newTeacher.socialInsurance}
                                onChange={(event) => setNewTeacher(prev => ({
                                    ...prev,
                                    socialInsurance: event.target.value
                                }))}
                                error={warning.socialInsurance ? true : false}
                                helperText={warning.socialInsurance}
                                onBlur={(event) => {
                                    if (event.target.value === '') {
                                        setWarning(prev => ({ ...prev, socialInsurance: 'Cần bổ xung' }))
                                    }
                                }}
                                onFocus={() => setWarning(prev => ({ ...prev, socialInsurance: null }))}
                                sx={inputStyle}
                                inputProps={offAutoComplete} />
                        </Box>
                    </CardContent>
                    <CardContent>
                        <Typography gutterBottom variant="h4" component="div">
                            Địa chỉ
                        </Typography>
                        <Box mt={2}>
                            <TextField label="Quê quán"
                                variant="standard"
                                value={newTeacher.homeTown}
                                onChange={(event) => setNewTeacher(prev => ({
                                    ...prev,
                                    homeTown: event.target.value
                                }))}
                                sx={[inputStyle, { width: '280px' }]}
                                inputProps={offAutoComplete} />
                            <TextField label="Nơi ở thường trú"
                                required
                                value={newTeacher.residence}
                                onChange={(event) => setNewTeacher(prev => ({
                                    ...prev,
                                    residence: event.target.value
                                }))}
                                variant="standard"
                                error={warning.residence ? true : false}
                                helperText={warning.residence}
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
                    <CardContent>
                        <Typography gutterBottom variant="h4" component="div">
                            Giảng dạy
                        </Typography>
                        <Box mt={2}>
                            <TextField label="Chức vụ"
                                value={newTeacher.position}
                                onChange={(event) => setNewTeacher(prev => ({
                                    ...prev,
                                    position: event.target.value
                                }))}
                                variant="standard"
                                sx={inputStyle}
                                inputProps={offAutoComplete} />
                        </Box>
                        <Box mt={2}>
                            <FormControl>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={newTeacher.homeroomTeacher}
                                            onChange={handleChangeHomeroomTeacher}
                                        />
                                    }
                                    label="Giáo viên chủ nhiệm" />
                            </FormControl>
                            <FormControl variant="standard" sx={{ minWidth: 120 }}>
                                <InputLabel id="year-filter-select-label">Lớp của nhiệm</InputLabel>
                                <Select
                                    labelId="homeroomClass-select-label"
                                    id="homeroomClass-select"
                                    value={selectClass}
                                    label="Class"
                                    onChange={handleSelectClass}
                                    disabled={!newTeacher.homeroomTeacher}
                                >
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
                    <CardContent>
                        <Typography gutterBottom variant="h4" component="div">
                            Môn học giảng dạy
                        </Typography>
                        <Box mt={2}>
                            <ChooseSubject changeSubject={handleChangeSubject} subjectProps={newTeacher.subjects} />
                        </Box>
                    </CardContent>
                    <CardContent>
                        <Typography gutterBottom variant="h4" component="div">
                            Lớp giảng dạy
                        </Typography>
                        <Box mt={2}>
                            <ClassInChargeSelect changeClassList={handleChangeClass} classList={newTeacher.classInCharge} />
                        </Box>
                    </CardContent>
                    <CardContent sx={{
                        display: 'flex',
                        width: '100%',
                        justifyContent: 'right'
                    }}>
                        <Box mr={2}>
                            <Button variant="outlined" onClick={handleCancel}>Hủy</Button>
                        </Box>
                        <Box>
                            <Button variant="contained" onClick={addTeacher}>Thêm giáo viên</Button>
                        </Box>
                    </CardContent>
                </Box>
            </Box>
        </MainCard>
    );
}

export default AddTeacher;
