// material-ui
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { useState, useEffect } from 'react';

import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, LinearProgress, Box
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import TeacherService from 'services/objects/teacher.service';

import { styled } from '@mui/material/styles';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function createData(name, role, date) {
    return { name, role, date };
}

const rows = [
    createData('Tai khoan 1', 'all', '20/12/2020'),
    createData('Admin 2', 'all', '28/5/2020'),
    createData('Admin 3', 'class', '30/6/2022'),
    createData('Cap quyen', 'class', '20/3/2022')
];

const teacherService = new TeacherService();

const TeacherAccount = () => {

    const [teacherList, setTeacherList] = useState([]);

    const navigate = useNavigate();
    const getAPI = async () => {
        try {
            const result = await teacherService.getAll();
            setTeacherList(result.data);
            console.log(result.data);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAPI();
    }, [])

    const handleDelete = async (index) => {
        try {
            const result = await teacherService.delete(
                teacherList[index].account._id,
                teacherList[index]._id
            );
            console.log(result);
            getAPI();
        } catch (error) {
            console.log(error)
        }
    }

    const handleEdit = (idTeacher) => {
        navigate(`/manager/update-teacher/${idTeacher}`);
    }

    return <MainCard title="Tài khoản giáo viên">
        <TableContainer component={Paper} >
            <Table sx={{ minWidth: 650 }} aria-label="simple table" size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell align="left">Họ và tên</TableCell>
                        <TableCell align="left">Lớp chủ nhiệm</TableCell>
                        <TableCell align="center">Chức vụ</TableCell>
                        <TableCell align="left">Số điện thoại</TableCell>
                        <TableCell align="left">Email</TableCell>
                        <TableCell align="left">Tài khoản</TableCell>
                        <TableCell align="left">CMND/CCCD</TableCell>
                        <TableCell align="left">Số bảo hiểm y tế</TableCell>
                        <TableCell align="left">Dân tộc</TableCell>
                        <TableCell align="left">Quê quán</TableCell>
                        <TableCell align="left">Nơi ở</TableCell>
                        <TableCell align="right">
                            <IconButton component="span"
                                onClick={() => {
                                    navigate('/manager/add-teacher');
                                }}>
                                <AddCircleOutlineIcon />
                            </IconButton>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>{teacherList.length === 0
                    ?
                    <TableRow
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell width={"100%"}>
                            <LinearProgress />
                        </TableCell>
                    </TableRow>
                    :
                    teacherList.map((row, index) => (
                        <StyledTableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell width={"30px"}>{index + 1}</TableCell>
                            <TableCell align="left" sx={{ minWidth: '160px' }}>{row.account.name}</TableCell>
                            <TableCell align="center" sx={{ minWidth: '128px' }}>{row.homeroomTeacher ? row.homeroomClass.name : '-'}</TableCell>
                            <TableCell align="center" sx={{ minWidth: '128px' }}>{row.position || '-'}</TableCell>
                            <TableCell align="center" sx={{ minWidth: '80px' }}>{row.phone}</TableCell>
                            <TableCell align="left" sx={{ minWidth: '120px' }}>{row.email}</TableCell>
                            <TableCell align="center" sx={{ minWidth: '100px' }}>{row.account.username}</TableCell>
                            <TableCell align="left" sx={{ minWidth: '100px' }}>{row.identityCard}</TableCell>
                            <TableCell align="left" sx={{ minWidth: '140px' }}>{row.socialInsurance}</TableCell>
                            <TableCell align="left" sx={{ minWidth: '80px' }}>{row.ethnic}</TableCell>
                            <TableCell align="left" sx={{ minWidth: '300px' }}>{row.homeTown}</TableCell>
                            <TableCell align="left" sx={{ minWidth: '300px' }}>{row.residence}</TableCell>
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

}

export default TeacherAccount;
