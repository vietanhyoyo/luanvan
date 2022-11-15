

// material-ui
import {
    Grid, IconButton, Select, Button,
    MenuItem, FormControl, InputLabel, Paper, TableContainer,
    Table, TableHead, TableRow, TableCell, TableBody, LinearProgress, Typography
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import AddIcon from '@mui/icons-material/Add';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { useEffect, useState } from 'react';
import ClassService from 'services/objects/class.service';
import StudentService from 'services/objects/student.service';
import { useParams } from 'react-router-dom';

import { styled } from '@mui/material/styles';

import { tableCellClasses } from '@mui/material/TableCell';

const classID = '63130713be77ac9f896f79bf';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const studentService = new StudentService();

const TeacherClassRoom = () => {

    const { id } = useParams();
    const [studentList, setStudentList] = useState([]);

    const getStudentList = async (id) => {
        try {
            const result = await studentService.getAll(id);
            setStudentList(result.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getStudentList(id);
    }, [])

    return <>
        <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12}>
                <MainCard title={'Danh sách lớp học gồm có ' + studentList.length + ' học sinh'}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table" size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>#</TableCell>
                                    <TableCell align="left">Họ và tên</TableCell>
                                    <TableCell align="left">Mã học sinh</TableCell>
                                    <TableCell align="left">Tên phụ huynh</TableCell>
                                    <TableCell align="center">Số điện thoại</TableCell>
                                    <TableCell align="left">Email</TableCell>
                                    <TableCell align="center">Tài khoản</TableCell>
                                    <TableCell align="center">Dân tộc</TableCell>
                                    <TableCell align="left">Quê quán</TableCell>
                                    <TableCell align="left">Nơi ở</TableCell>
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
                                        <TableCell align="left" sx={{ minWidth: '300px' }}>{row.homeTown}</TableCell>
                                        <TableCell align="left" sx={{ minWidth: '300px' }}>{row.address}</TableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </MainCard>
            </Grid>
        </Grid>
    </>
}

export default TeacherClassRoom;