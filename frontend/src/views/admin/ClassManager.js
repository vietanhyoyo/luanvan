
// material-ui
import { Typography, Grid, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import AddIcon from '@mui/icons-material/Add';
import ClassService from 'services/objects/class.service';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { useState, useEffect, forwardRef } from 'react';

import {
    Table, TableBody, TableCell, TableContainer, TextField, Box, Snackbar,
    TableHead, TableRow, Paper, Button, DialogContent, InputLabel,
    Dialog, DialogTitle, DialogActions, Select, MenuItem, FormControl
} from '@mui/material';

import MuiAlert from '@mui/material/Alert';

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// ==============================|| SAMPLE PAGE ||============================== //

const classService = new ClassService();

const ClassManager = () => {

    const [schoolYears, setSchoolYears] = useState([]);
    const [classList, setClassList] = useState([]);
    const [yearSelect, setYearSelect] = useState('');
    const [open, setOpen] = useState(false);
    const [newClass, setNewClass] = useState({
        name: '',
        grade: '',
        schoolYear: '',
    })
    const [notification, setNotification] = useState({
        open: false,
        message: 'Đã thêm 1 năm học mới!',
        status: 'success'
    })

    const handleCloseAlert = () => {
        setNotification(prev => ({
            ...prev,
            open: false
        }))
    }

    const getSchoolYears = async () => {
        try {
            const result = await classService.getAllSchoolYear();
            setSchoolYears(result.data);
            setYearSelect(result.data[0].name);
        } catch (err) {
            console.log(err);
        }
    }

    const getAPICLassList = async () => {
        if (yearSelect === '') return;
        try {
            const result = await classService.getClassListByYear(yearSelect);
            setClassList(result.data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getSchoolYears();
    }, [])

    useEffect(() => {
        getAPICLassList();
    }, [yearSelect]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAddClass = async () => {
        if (newClass.name === '' || newClass.grade === '' || newClass.schoolYear === '') {
            return;
        }
        try {
            const result = await classService.addClass(newClass);
            console.log(result);
            if (result.data.status === "Error") {
                setNotification({
                    open: true,
                    message: 'Thêm thất bại đã có lỗi!',
                    status: 'error'
                })
            }
            else {
                if (yearSelect === newClass.schoolYear) {
                    getAPICLassList(yearSelect);
                }
                setNotification({
                    open: true,
                    message: 'Đã thêm 1 một lớp mới',
                    status: 'success'
                })
            }
        } catch (err) {
            console.log(err);
        }
        handleClose();
    }

    const handleDeleteButton = async (id) => {
        try {
            const bool = window.confirm('Bạn có muốn xóa lớp này không?');
            if (bool) {
                const result = await classService.deleteClass(id);
                getAPICLassList();
                console.log(result);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleEditClass = async (index) => {
        const textName = prompt(classList[index].name);
        if (textName === '') return;
        try {
            const result = await classService.editClass({
                id: classList[index]._id,
                name: textName
            });
            console.log(result)
            if (result.data.status === "Error") {
                setNotification({
                    open: true,
                    message: 'Đã có lỗi!',
                    status: 'error'
                })
            }
            else {
                getAPICLassList(yearSelect);
                setNotification({
                    open: true,
                    message: 'Đã thay đổi!',
                    status: 'success'
                })
            }
        } catch (error) {
            console.log(error);
        }
    }

    return schoolYears.length === 0
        ?
        <div>No data</div>
        :
        <MainCard title={
            <Box sx={{ display: "flex" }} maxWidth="450px">
                <Typography mr={3} variant="h2" gutterBottom>Quản lý lớp</Typography>
                <FormControl variant="standard" sx={{ minWidth: 120 }}>
                    <InputLabel id="year-filter-select-label">Năm học</InputLabel>
                    <Select
                        labelId="year-filter-select-label"
                        id="year-filter-select"
                        value={yearSelect}
                        label="Age"
                        onChange={(event) => {
                            setYearSelect(event.target.value);
                        }}
                    >
                        {schoolYears.map((row, index) =>
                            <MenuItem value={row.name} key={index}>{row.name}</MenuItem>)
                        }
                    </Select>
                </FormControl>
            </Box>
        }>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table" size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell align="left">Lớp</TableCell>
                            <TableCell align="right">
                                <Button
                                    variant="contained"
                                    startIcon={<AddIcon />}
                                    onClick={handleClickOpen}
                                >
                                    Thêm lớp học
                                </Button></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {classList.length > 0 && classList.map((row, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell width={"30px"}>{index + 1}</TableCell>
                                <TableCell align="left">{row.name}</TableCell>
                                <TableCell align="right">
                                    <IconButton color="primary" component="span" onClick={() => handleEditClass(index)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton color="error" component="span" onClick={() => handleDeleteButton(row._id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Thêm mới một lớp học"}
                </DialogTitle>
                <DialogContent sx={{ width: 400 }}>
                    <Box mt={3} sx={{ width: '100%' }}>
                        <FormControl fullWidth>
                            <InputLabel id="year-select-label">Năm học</InputLabel>
                            <Select
                                labelId="year-select-label"
                                id="year-select"
                                value={newClass.schoolYear}
                                label="Năm học"
                                onChange={(event) => setNewClass(prev => ({
                                    ...prev,
                                    schoolYear: event.target.value
                                }))}
                            >
                                {schoolYears.map((row, index) =>
                                    <MenuItem value={row.name} key={index}>{row.name}</MenuItem>)}
                            </Select>
                        </FormControl>
                    </Box>
                    <Box mt={3}>
                        <FormControl fullWidth>
                            <InputLabel id="grade-select-label">Khối</InputLabel>
                            <Select
                                labelId="grade-select-label"
                                id="grade-select"
                                value={newClass.grade}
                                label="Khối"
                                onChange={(event) => setNewClass(prev => ({
                                    ...prev,
                                    grade: event.target.value
                                }))}
                            >
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Box mt={3}>
                        <TextField
                            sx={{ width: '100%' }}
                            label="Tên lớp học"
                            variant="outlined"
                            onChange={(event) => setNewClass(prev => ({
                                ...prev,
                                name: event.target.value
                            }))}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Hủy</Button>
                    <Button onClick={handleAddClass} autoFocus>
                        Thêm
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={notification.open} autoHideDuration={6000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity={notification.status} sx={{ width: '100%' }}>
                    {notification.message}
                </Alert>
            </Snackbar>
        </MainCard>

};

export default ClassManager;