
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

import { useNavigate } from 'react-router-dom';

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

const AddStudent = () => {
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
    const [newStudent, setNewStudent] = useState({
        name: "",
        idStudent: "",
        username: "",
        password: "",
        class: "",
        address: "",
        parent: "",
        homeTown: "",
        ethnic: "",
        birthday: null,
        phoneNumber: "",
        email: "",
        avatar: "",
    })
    const [classList, setClassList] = useState([]);
    const [selectClass, setSelectClass] = useState(-1);

    const getNowClassList = async () => {
        try {
            const result = await classService.getNowClasses();
            setClassList(result.data);
            console.log(result.data);
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

    const handleAddStudent = async () => {
        try {
            if (
                newStudent.name === "" ||
                newStudent.username === "" ||
                newStudent.password === "" ||
                newStudent.ethnic === "" ||
                newStudent.birthday === null ||
                newStudent.phoneNumber === "" ||
                newStudent.idStudent === ""
            ) {
                alert('B???n ch??a nh???p ????? th??ng tin');
                return;
            }
            const postData = newStudent;

            if (selectClass === -1) postData.class = null;
            else postData.class = classList[selectClass]._id;

            const result = await studentService.add(postData);
            console.log(result);
            navigate('/manager/student');
        } catch (error) {
            console.lod(error);
        }
    }

    const handleCancel = () => {
        navigate('/manager/student');
    }

    return (
        <MainCard title="Th??m m???t h???c sinh m???i">
            <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
                <Box sx={{ maxWidth: "700px" }}>
                    <CardContent>
                        <Typography gutterBottom variant="h4" component="div">
                            Th??ng tin t??i kho???n
                        </Typography>
                        <Box mt={3}>
                            <TextField
                                label="H??? v?? t??n"
                                required
                                variant="standard"
                                sx={inputStyle}
                                value={newStudent.name}
                                onChange={(event) => setNewStudent(prev => ({
                                    ...prev,
                                    name: event.target.value
                                }))}
                                error={warning.name ? true : false}
                                helperText={Boolean(warning.name)
                                    ? warning.name
                                    : null}
                                onBlur={(event) => {
                                    if (event.target.value === '') {
                                        setWarning(prev => ({ ...prev, name: 'Ch??a nh???p t??n.' }))
                                    }
                                }}
                                onFocus={() => setWarning(prev => ({ ...prev, name: null }))}
                                inputProps={offAutoComplete} />
                            <TextField label="T??i kho???n ????ng nh???p"
                                required
                                value={newStudent.username}
                                error={warning.username ? true : false}
                                helperText={Boolean(warning.username)
                                    ? warning.username
                                    : null}
                                onBlur={(event) => {
                                    if (event.target.value === '') {
                                        setWarning(prev => ({ ...prev, username: 'Ch??a nh???p t??i kho???n.' }))
                                    }
                                }}
                                onFocus={() => setWarning(prev => ({ ...prev, username: null }))}
                                onChange={(event) => setNewStudent(prev => ({
                                    ...prev,
                                    username: event.target.value
                                }))}
                                variant="standard"
                                sx={inputStyle}
                                inputProps={offAutoComplete} />
                            <FormControl sx={inputStyle} variant="standard">
                                <InputLabel htmlFor="adornment-password">M???t kh???u*</InputLabel>
                                <Input
                                    required
                                    inputProps={offAutoComplete}
                                    value={newStudent.password}
                                    onChange={(event) => setNewStudent(prev => ({
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
                                    onBlur={(event) => {
                                        if (event.target.value === '') {
                                            setWarning(prev => ({ ...prev, password: 'Ch??a nh???p m???t kh???u.' }))
                                        }
                                    }}
                                    onFocus={() => setWarning(prev => ({ ...prev, password: null }))}
                                />
                            </FormControl>
                        </Box>
                    </CardContent>
                    <CardContent>
                        <Typography gutterBottom variant="h4" component="div">
                            Th??ng tin c?? nh??n
                        </Typography>
                        <Box mt={2}>
                            <TextField label="T??n ph??? huynh"
                                variant="standard"
                                value={newStudent.parent}
                                onChange={(event) => setNewStudent(prev => ({
                                    ...prev,
                                    parent: event.target.value
                                }))}
                                sx={inputStyle}
                                inputProps={offAutoComplete} />
                            <TextField label="S??? ??i???n tho???i"
                                required
                                variant="standard"
                                value={newStudent.phoneNumber}
                                onChange={(event) => setNewStudent(prev => ({
                                    ...prev,
                                    phoneNumber: event.target.value
                                }))}
                                error={warning.phone ? true : false}
                                helperText={Boolean(warning.phone)
                                    ? warning.phone
                                    : null}
                                onBlur={(event) => {
                                    if (event.target.value === '') {
                                        setWarning(prev => ({ ...prev, phone: 'B???n c???n nh???p s??? ??i???n tho???i' }))
                                    }
                                }}
                                onFocus={() => setWarning(prev => ({ ...prev, phone: null }))}
                                sx={inputStyle}
                                inputProps={offAutoComplete} />
                            <TextField
                                label="Email"
                                type="email"
                                value={newStudent.email}
                                onChange={(event) => setNewStudent(prev => ({
                                    ...prev,
                                    email: event.target.value
                                }))}
                                variant="standard"
                                sx={inputStyle}
                                inputProps={offAutoComplete} />
                        </Box>
                        <Box mt={2}>
                            <TextField label="D??n t???c"
                                required
                                variant="standard"
                                error={warning.ethnic ? true : false}
                                helperText={Boolean(warning.ethnic)
                                    ? warning.ethnic
                                    : null}
                                onBlur={(event) => {
                                    if (event.target.value === '') {
                                        setWarning(prev => ({ ...prev, ethnic: 'C???n b??? xung' }))
                                    }
                                }}
                                onFocus={() => setWarning(prev => ({ ...prev, ethnic: null }))}
                                sx={inputStyle}
                                value={newStudent.ethnic}
                                onChange={(event) => setNewStudent(prev => ({
                                    ...prev,
                                    ethnic: event.target.value
                                }))}
                                inputProps={offAutoComplete} />
                            <TextField
                                id="date"
                                required
                                label="Ng??y sinh"
                                variant="standard"
                                type="date"
                                sx={inputStyle}
                                InputLabelProps={{ shrink: true, }}
                                value={newStudent.birthday ? formatInputDate(newStudent.birthday) : formatInputDate('')}
                                onChange={(event) => setNewStudent(prev => ({
                                    ...prev,
                                    birthday: event.target.value
                                }))}
                            />

                        </Box>
                    </CardContent>
                    <CardContent>
                        <Typography gutterBottom variant="h4" component="div">
                            ?????a ch???
                        </Typography>
                        <Box mt={2}>
                            <TextField label="Qu?? qu??n"
                                variant="standard"
                                value={newStudent.homeTown}
                                onChange={(event) => setNewStudent(prev => ({
                                    ...prev,
                                    homeTown: event.target.value
                                }))}
                                sx={[inputStyle, { width: '280px' }]}
                                inputProps={offAutoComplete} />
                            <TextField label="N??i ??? th?????ng tr??"
                                required
                                value={newStudent.address}
                                onChange={(event) => setNewStudent(prev => ({
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
                                        setWarning(prev => ({ ...prev, residence: 'B??? xung n??i ???' }))
                                    }
                                }}
                                onFocus={() => setWarning(prev => ({ ...prev, residence: null }))}
                                sx={[inputStyle, { width: '280px' }]}
                                inputProps={offAutoComplete} />
                        </Box>
                    </CardContent>
                    <CardContent >
                        <Typography gutterBottom variant="h4" component="div">
                            Th??ng tin h???c sinh
                        </Typography>
                        <Box mt={2}>
                            <TextField label="M?? h???c sinh"
                                required
                                variant="standard"
                                value={newStudent.idStudent}
                                onChange={(event) => setNewStudent(prev => ({
                                    ...prev,
                                    idStudent: event.target.value
                                }))}
                                error={warning.idStudent ? true : false}
                                helperText={Boolean(warning.idStudent)
                                    ? warning.idStudent
                                    : null}
                                onBlur={(event) => {
                                    if (event.target.value === '') {
                                        setWarning(prev => ({ ...prev, idStudent: 'H??y nh???p m?? h???c sinh' }))
                                    }
                                }}
                                onFocus={() => setWarning(prev => ({ ...prev, idStudent: null }))}
                                sx={inputStyle}
                                inputProps={offAutoComplete} />
                            <FormControl variant="standard" sx={{ minWidth: 120 }}>
                                <InputLabel id="year-filter-select-label">L???p</InputLabel>
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
                    <CardContent sx={{
                        display: 'flex',
                        width: '100%',
                        justifyContent: 'right'
                    }}>
                        <Box mr={2}>
                            <Button variant="outlined" onClick={handleCancel}>H???y</Button>
                        </Box>
                        <Box>
                            <Button variant="contained" onClick={handleAddStudent}>Th??m h???c sinh</Button>
                        </Box>
                    </CardContent>
                </Box>
            </Box>
        </MainCard>
    );
}

export default AddStudent;
