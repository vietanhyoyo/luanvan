

// material-ui
import {
    Grid, IconButton, Select, Button,
    MenuItem, FormControl, InputLabel, Paper, TableContainer,
    Table, TableHead, TableRow, TableCell, TableBody, LinearProgress
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { useEffect, useState } from 'react';
import ClassService from 'services/objects/class.service';
import StudentService from 'services/objects/student.service';
import { useNavigate } from 'react-router-dom';

import { styled } from '@mui/material/styles';

import { tableCellClasses } from '@mui/material/TableCell';

const classService = new ClassService();
const studentService = new StudentService();

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const StudentAccount = () => {
    const navigate = useNavigate();

    const [classList, setClassList] = useState([]);
    const [selectClass, setSelectClass] = useState(-1);
    const [studentList, setStudentList] = useState([]);
    console.log(studentList);

    const getNowClassList = async () => {
        try {
            const result = await classService.getNowClasses();
            setClassList(result.data);
            console.log(result.data);
        } catch (error) {
            console.log(error);
        }
    }

    const getStudentList = async (id) => {
        try {
            const result = await studentService.getAll(id);
            setStudentList(result.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (classList.length === 0)
            getNowClassList();
        if (selectClass === -1)
            getStudentList(null);
        else getStudentList(classList[selectClass]._id);
    }, [selectClass])

    const handleDelete = async (index) => {
        try {
            const bool = window.confirm('B???n c?? mu???n x??a h???c sinh n??y kh??ng?');
            if (!bool) return;
            const result = await studentService.deleteOne(
                studentList[index].account._id,
                studentList[index]._id
            );
            console.log(result);
            getStudentList(classList[selectClass]._id);
        } catch (error) {
            console.log(error)
        }
    }

    const handleEdit = (idStudent) => {
        navigate(`/manager/update-student/${idStudent}`);
    }

    return <>
        <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12}>
                <MainCard>
                    <FormControl variant="standard" sx={{ minWidth: 120, marginRight: '14px' }}>
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
                            <MenuItem value={-1}>Ch??a c?? l???p</MenuItem>
                            {

                                classList.length > 0 &&
                                classList.map((row, index) => {
                                    return <MenuItem key={index} value={index}>{row.name}</MenuItem>
                                })
                            }
                        </Select>
                    </FormControl>
                    <Button variant='contained' onClick={() => {
                        navigate('/manager/add-student');
                    }}>Th??m h???c sinh</Button>
                </MainCard>
            </Grid>
            <Grid item xs={12}>
                <MainCard title="T??i kho???n h???c sinh">
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table" size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>#</TableCell>
                                    <TableCell align="left">H??? v?? t??n</TableCell>
                                    <TableCell align="left">M?? h???c sinh</TableCell>
                                    <TableCell align="left">T??n ph??? huynh</TableCell>
                                    <TableCell align="center">S??? ??i???n tho???i</TableCell>
                                    <TableCell align="left">Email</TableCell>
                                    <TableCell align="center">T??i kho???n</TableCell>
                                    <TableCell align="center">D??n t???c</TableCell>
                                    <TableCell align="left">Qu?? qu??n</TableCell>
                                    <TableCell align="left">N??i ???</TableCell>
                                    <TableCell align="right">
                                        <IconButton component="span">
                                            <AddCircleOutlineIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>{studentList.length === 0
                                ?
                                <TableRow
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell width={"100%"}>
                                        <LinearProgress />
                                    </TableCell>
                                </TableRow>
                                :
                                studentList.map((row, index) => (
                                    <StyledTableRow
                                        key={index}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell width={"30px"}>{index + 1}</TableCell>
                                        <TableCell align="left" sx={{ minWidth: '160px' }}>{row.account.name}</TableCell>
                                        <TableCell align="left" sx={{ minWidth: '120px' }}>{row.idStudent}</TableCell>
                                        <TableCell align="left" sx={{ minWidth: '160px' }}>{row.parent}</TableCell>
                                        <TableCell align="center" sx={{ minWidth: '120px' }}>{row.phoneNumber}</TableCell>
                                        <TableCell align="left" sx={{ minWidth: '120px' }}>{row.email}</TableCell>
                                        <TableCell align="center" sx={{ minWidth: '100px' }}>{row.account.username}</TableCell>
                                        <TableCell align="center" sx={{ minWidth: '80px' }}>{row.ethnic}</TableCell>
                                        <TableCell align="left" sx={{ minWidth: '300px'}}>{row.homeTown}</TableCell>
                                        <TableCell align="left" sx={{ minWidth: '300px' }}>{row.address}</TableCell>
                                        <TableCell align="right" sx={{ width: '70px', display: 'flex', justifyContent: 'right' }}>
                                            <IconButton color="error" component="span" onClick={() => handleDelete(index)}>
                                                <DeleteIcon />
                                            </IconButton>
                                            <IconButton color="primary" component="span" onClick={() => handleEdit(row._id)}>
                                                <EditIcon />
                                            </IconButton>
                                        </TableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </MainCard>
            </Grid>
        </Grid>
    </>
};

export default StudentAccount;
