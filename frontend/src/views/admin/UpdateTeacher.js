
import moment from 'moment';
// material-ui
import {
    Typography, Button, InputLabel, FormControl, LinearProgress,
    CardContent, TextField, Box, FormControlLabel, Checkbox,
    MenuItem, Select
} from '@mui/material';

// project imports
import ChooseSubject from './teacher/ChooseSubject';
import MainCard from 'ui-component/cards/MainCard';
import { useEffect, useState } from 'react';
import TeacherService from 'services/objects/teacher.service';
import ClassService from 'services/objects/class.service';
import { useParams } from 'react-router-dom';
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

function formatInputDate(dateString) {
    let date = new Date(Date.now());
    if (dateString !== '')
        date = new Date(dateString);
    return moment(date).format('YYYY-MM-DD');
}

const inputStyle = { marginRight: '14px', marginBottom: '14px' };

const UpdateTeacher = () => {

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
        email: null,
        avatar: null,
        socialInsurance: null
    })
    const [teacher, setTeacher] = useState({
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
        avatar: "",
        birthday: " ",
        createdAt: " ",
        email: " ",
        ethnic: " ",
        homeTown: " ",
        homeroomClass: null,
        homeroomTeacher: false,
        identityCard: " ",
        isDelete: false,
        subjects: [],
        classInCharge: [],
        phone: " ",
        residence: " ",
        socialInsurance: " ",
        _id: " "
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
    const [selectClass, setSelectClass] = useState(0);

    const getNowClassList = async () => {
        try {
            const result = await classService.getNowClasses();
            setClassList(result.data);
        } catch (error) {
            console.log(error);
        }
    }

    const getAPI = async () => {
        try {
            const result = await teacherService.getOneTeacher(id);
            setTeacher(result.data.data);
            setAccount(result.data.data.account);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(async () => {
        await getNowClassList();
        await getAPI();
    }, [])

    useEffect(() => {
        let chooseClass = 0;
        console.log(classList);
        if (teacher.homeroomTeacher) {
            chooseClass = classList.findIndex(element => element._id === teacher.homeroomClass);
            console.log(chooseClass);
        }
        if (chooseClass !== -1 && chooseClass !== 0) setSelectClass(chooseClass);
    }, [teacher.homeroomTeacher, selectClass])

    const navigate = useNavigate();

    const handleSave = async () => {
        const postData = teacher;
        const postAccount = account;

        postData.homeroomClass = teacher.homeroomTeacher ? classList[selectClass]._id : null;
        postData.account = account._id;

        try {
            const result = await teacherService.update(postAccount, postData);
            navigate('/manager/teacher');
        } catch (error) {
            console.log(error);
        }
    }

    const handleCancel = () => {
        navigate('/manager/teacher');
    }

    const handleChangeSubject = (array) => {
        setTeacher(prev => ({
            ...prev,
            subjects: array
        }))
    }

    const handleChangeClass = (array) => {
        setTeacher(prev => ({
            ...prev,
            classInCharge: array
        }))
    }

    return teacher._id === " "
        ?
        <Box sx={{ width: '100%' }}>
            <LinearProgress />
        </Box>
        :
        <MainCard title="C???p nh???t t??i kho???n gi??o vi??n">
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
                                value={account.name}
                                onChange={(event) => setAccount(prev => ({
                                    ...prev,
                                    name: event.target.value
                                }))}
                                sx={inputStyle}
                                error={warning.name ? true : false}
                                helpertext={warning.name}
                                onBlur={(event) => {
                                    if (event.target.value === '') {
                                        setWarning(prev => ({ ...prev, name: 'Ch??a nh???p t??n.' }))
                                    }
                                }}
                                onFocus={() => setWarning(prev => ({ ...prev, name: null }))}
                                inputProps={offAutoComplete} />
                            <TextField label="T??i kho???n ????ng nh???p"
                                required
                                value={account.username}
                                error={warning.username ? true : false}
                                helpertext={warning.username}
                                onBlur={(event) => {
                                    if (event.target.value === '') {
                                        setWarning(prev => ({ ...prev, username: 'Ch??a nh???p t??i kho???n.' }))
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
                            Th??ng tin c?? nh??n
                        </Typography>
                        <Box mt={2}>
                            <TextField label="D??n t???c"
                                required
                                variant="standard"
                                error={warning.ethnic ? true : false}
                                helpertext={warning.ethnic}
                                onBlur={(event) => {
                                    if (event.target.value === '') {
                                        setWarning(prev => ({ ...prev, ethnic: 'C???n b??? xung' }))
                                    }
                                }}
                                onFocus={() => setWarning(prev => ({ ...prev, ethnic: null }))}
                                sx={inputStyle}
                                value={teacher.ethnic}
                                onChange={(event) => setTeacher(prev => ({
                                    ...prev,
                                    ethnic: event.target.value
                                }))}
                                inputProps={offAutoComplete} />
                            <TextField label="S??? ??i???n tho???i"
                                required
                                variant="standard"
                                value={teacher.phone}
                                onChange={(event) => setTeacher(prev => ({
                                    ...prev,
                                    phone: event.target.value
                                }))}
                                error={warning.phone ? true : false}
                                helpertext={warning.phone}
                                onBlur={(event) => {
                                    if (event.target.value === '') {
                                        setWarning(prev => ({ ...prev, phone: 'B???n c???n nh???p s??? ??i???n tho???i' }))
                                    }
                                }}
                                onFocus={() => setWarning(prev => ({ ...prev, phone: null }))}
                                sx={inputStyle}
                                inputProps={offAutoComplete} />
                            <TextField label="Email"
                                required
                                type="email"
                                value={teacher.email}
                                error={warning.email ? true : false}
                                helpertext={warning.email}
                                onBlur={(event) => {
                                    if (event.target.value === '') {
                                        setWarning(prev => ({ ...prev, email: 'Nh???p v??o email' }))
                                    }
                                }}
                                onFocus={() => setWarning(prev => ({ ...prev, email: null }))}
                                onChange={(event) => setTeacher(prev => ({
                                    ...prev,
                                    email: event.target.value
                                }))}
                                variant="standard"
                                sx={inputStyle}
                                inputProps={offAutoComplete} />
                        </Box>
                        <Box mt={2}>
                            <TextField label="S??? CMND/CCCD"
                                required
                                variant="standard"
                                value={teacher.identityCard}
                                onChange={(event) => setTeacher(prev => ({
                                    ...prev,
                                    identityCard: event.target.value
                                }))}
                                error={warning.identityCard ? true : false}
                                helpertext={warning.identityCard}
                                onBlur={(event) => {
                                    if (event.target.value === '') {
                                        setWarning(prev => ({ ...prev, identityCard: 'Ch??a ??i???n th??ng tin' }))
                                    }
                                }}
                                onFocus={() => setWarning(prev => ({ ...prev, identityCard: null }))}
                                sx={inputStyle}
                                inputProps={offAutoComplete} />
                            <TextField label="S??? b???o hi???m y t???"
                                required
                                variant="standard"
                                value={teacher.socialInsurance}
                                onChange={(event) => setTeacher(prev => ({
                                    ...prev,
                                    socialInsurance: event.target.value
                                }))}
                                error={warning.socialInsurance ? true : false}
                                helpertext={warning.socialInsurance}
                                onBlur={(event) => {
                                    if (event.target.value === '') {
                                        setWarning(prev => ({ ...prev, socialInsurance: 'C???n b??? xung' }))
                                    }
                                }}
                                onFocus={() => setWarning(prev => ({ ...prev, socialInsurance: null }))}
                                sx={inputStyle}
                                inputProps={offAutoComplete} />
                            <TextField
                                id="date"
                                required
                                label="Ng??y sinh"
                                variant="standard"
                                type="date"
                                sx={inputStyle}
                                InputLabelProps={{ shrink: true, }}
                                value={teacher.birthday ? formatInputDate(teacher.birthday) : formatInputDate('')}
                                onChange={(event) => setTeacher(prev => ({
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
                                value={teacher.homeTown}
                                onChange={(event) => setTeacher(prev => ({
                                    ...prev,
                                    homeTown: event.target.value
                                }))}
                                sx={[inputStyle, { width: '280px' }]}
                                inputProps={offAutoComplete} />
                            <TextField label="N??i ??? th?????ng tr??"
                                required
                                value={teacher.residence}
                                onChange={(event) => setTeacher(prev => ({
                                    ...prev,
                                    residence: event.target.value
                                }))}
                                variant="standard"
                                error={warning.residence ? true : false}
                                helpertext={warning.residence}
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
                    <CardContent>
                        <Typography gutterBottom variant="h4" component="div">
                            Ch???c v???
                        </Typography>
                        <Box mt={2}>
                            <TextField label="Ch???c v??? trong tr?????ng"
                                value={teacher.position}
                                onChange={(event) => setTeacher(prev => ({
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
                                            checked={teacher.homeroomTeacher}
                                            onChange={(event) => setTeacher(prev => ({
                                                ...prev,
                                                homeroomTeacher: event.target.checked
                                            }))}
                                        />
                                    }
                                    label="Gi??o vi??n ch??? nhi???m" />
                            </FormControl>
                            <FormControl variant="standard" sx={{ minWidth: 120 }}>
                                <InputLabel id="year-filter-select-label">L???p c???a nhi???m</InputLabel>
                                <Select
                                    labelId="homeroomClass-select-label"
                                    id="homeroomClass-select"
                                    value={selectClass}
                                    label="Class"
                                    onChange={(event) => {
                                        setSelectClass(event.target.value);
                                    }}
                                    disabled={!teacher.homeroomTeacher}
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
                            M??n h???c gi???ng d???y
                        </Typography>
                        <Box mt={2}>
                            <ChooseSubject changeSubject={handleChangeSubject} subjectProps={teacher.subjects} />
                        </Box>
                    </CardContent>
                    <CardContent>
                        <Typography gutterBottom variant="h4" component="div">
                            L???p gi???ng d???y
                        </Typography>
                        <Box mt={2}>
                            <ClassInChargeSelect changeClassList={handleChangeClass} classList={teacher.classInCharge} />
                        </Box>
                    </CardContent>
                    <CardContent sx={{ display: 'flex' }}>
                        <Box mr={2}>
                            <Button variant="outlined" onClick={handleCancel}>H???y</Button>
                        </Box>
                        <Box>
                            <Button variant="contained" onClick={handleSave}>L??u thay ?????i</Button>
                        </Box>
                    </CardContent>
                </Box>
            </Box>
        </MainCard>

}

export default UpdateTeacher;
