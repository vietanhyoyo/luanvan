

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { useState, useEffect, forwardRef } from 'react';

import ClassService from 'services/objects/class.service';
import { useParams } from 'react-router-dom'

import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Snackbar, LinearProgress
} from '@mui/material';

import { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';

import MuiAlert from '@mui/material/Alert';
import ScheduleOfClass from './schedule/ScheduleOfClass';

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const classService = new ClassService();

const EditSchedule = () => {

    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [classList, setClassList] = useState([
        {
            _id: '63049c0fe2a1574593437711'
        }
    ]);
    const days = ['Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu'];
    const lessonNumbers = ['SÁNG', '1', '2', '3', '4', '5', 'CHIỀU', '6', '7', '8', '9']

    const getAllClass = async () => {
        try {
            const result = await classService.getNowClasses();
            setClassList(result.data)
            setLoading(false)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllClass();
    }, []);

    return (
        <MainCard title={'Quản lý thời khóa biểu'}>
            <TableContainer component={Paper} sx={{ margin: "0px", borderRadius: '0px' }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple" size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell align="center">Tiết</TableCell>
                            {loading
                                ?
                                <TableCell width={"100%"} sx={{ paddingRight: 0, paddingLeft: 0 }}>
                                    <LinearProgress />
                                </TableCell>
                                :
                                classList.map((row, index) =>
                                    <TableCell key={index} align="center" sx={{ paddingRight: 0, paddingLeft: 0 }}>-----</TableCell>
                                )}
                        </TableRow>
                    </TableHead>
                    {loading ?
                        <TableBody>
                            <StyledTableRow>
                                <TableCell>
                                    <LinearProgress />
                                </TableCell>
                            </StyledTableRow>
                        </TableBody>
                        :
                        <TableBody>{
                            days.map((row, index) => (
                                <StyledTableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell width="60px" align="left">{row}</TableCell>
                                    <TableCell width="8px" sx={{ paddingRight: 0, paddingLeft: 0 }}>
                                        <TableContainer >
                                            <Table aria-label="simple table" size="small" >
                                                <TableBody sx={{ paddingRight: 0, paddingLeft: 0 }}>
                                                    {lessonNumbers.map((row, index) => (
                                                        <TableRow key={index}>
                                                            <TableCell
                                                                sx={{ width: '10px', paddingRight: 0, paddingLeft: 0 }}
                                                                align="center"
                                                            >{row}</TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </TableCell>
                                    {classList.map((classChild, index) => (
                                        <TableCell key={index} sx={{ paddingRight: 0, paddingLeft: 0 }}>
                                            <ScheduleOfClass
                                                scheduleID={id}
                                                classID={classChild._id}
                                                weekday={row}
                                                nameOfClass={classChild.name}
                                            ></ScheduleOfClass>
                                        </TableCell>
                                    ))}
                                </StyledTableRow>
                            ))}
                            <StyledTableRow
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            ></StyledTableRow>
                        </TableBody>
                    }
                </Table>
            </TableContainer>
        </MainCard >
    )
};

export default EditSchedule;
