

// material-ui
import { Typography, Grid, IconButton, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import * as React from 'react';

import ClassService from 'services/objects/class.service';

import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Snackbar,
} from '@mui/material';

import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// ==============================|| SAMPLE PAGE ||============================== //

const classService = new ClassService();

const SchoolYear = () => {

    const [data, setData] = React.useState([]);
    const [notification, setNotification] = React.useState({
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

    const getAPI = async () => {
        try {
            const result = await classService.getAllSchoolYear();
            setData(result.data);
        } catch (err) {
            console.log(err);
        }
    }

    const handleDeleteButton = async (id) => {
        try {
            const bool = window.confirm('Bạn có muốn xóa năm học này không');
            if (bool) {
                const result = await classService.deleteSchoolYear(id);
                getAPI();
                console.log(result);
            }
        } catch (error) {
            console.log(error);
        }
    }

    React.useEffect(() => {
        getAPI();
    }, [])

    const addSchoolYear = async () => {
        const text = prompt('Nhập tên năm học mới');
        if (text !== '')
            try {
                const result = await classService.addSchoolYear(text);
                if (result.data.status === "Error") {
                    setNotification({
                        open: true,
                        message: 'Thêm thất bại đã có lỗi!',
                        status: 'error'
                    })
                }
                else {
                    setNotification({
                        open: true,
                        message: 'Đã thêm 1 năm học mới',
                        status: 'success'
                    })
                }
                getAPI();
            } catch (err) {
                console.log(err);
            }
    }

    return (
        <MainCard title={'Quản lý năm học'}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table" size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell align="left">Năm học</TableCell>
                            <TableCell align="right">
                                <Button variant="contained" startIcon={<AddIcon />} onClick={addSchoolYear}>
                                    Thêm năm học
                                </Button></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.length === 0
                            ?
                            <TableRow
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell width={"30px"}>No</TableCell>
                                <TableCell align="left">No data</TableCell>
                                <TableCell align="right">No data</TableCell>
                            </TableRow>
                            :
                            data.map((row, index) => (
                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell width={"30px"}>{index + 1}</TableCell>
                                    <TableCell align="left">{row.name}</TableCell>
                                    <TableCell align="right">
                                        <IconButton color="primary" component="span">
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
            <Snackbar open={notification.open} autoHideDuration={6000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity={notification.status} sx={{ width: '100%' }}>
                    {notification.message}
                </Alert>
            </Snackbar>
        </MainCard>)
};

export default SchoolYear;
