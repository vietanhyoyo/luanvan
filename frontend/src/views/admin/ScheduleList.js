// material-ui
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { useState, useEffect } from 'react';

import {
    Table, TableBody, TableCell, TableContainer, Button,
    TableHead, TableRow, Paper, LinearProgress, Box, Dialog, DialogTitle,
    DialogContent, DialogActions, TextField
} from '@mui/material';
import ScheduleService from 'services/objects/schedule.service';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

function formatDateVN(dateString) {
    const date = new Date(dateString);
    const string = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    return string;
}

function formatInputDate(dateString) {
    let date = new Date(Date.now());
    if (dateString !== '')
        date = new Date(dateString);
    return moment(date).format('YYYY-MM-DD');
}

const scheduleService = new ScheduleService();

const ScheduleList = () => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false);
    const [scheduleList, setScheduleList] = useState([])
    const [schedule, setSchedule] = useState({
        startDate: null,
        endDate: null
    })

    const getAPI = async () => {
        try {
            const result = await scheduleService.getAll();
            setScheduleList(result.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAPI();
    }, [])

    const handleClose = () => {
        setOpen(false);
    };

    const handleAddSchedule = async () => {
        try {
            await scheduleService.addSchedule(schedule);
            getAPI()
            handleClose();
        } catch (error) {
            console.log(error);
        }
    }

    const handleEdit = (id) => {
        navigate(`/manager/edit-schedule/${id}`)
    }

    const handleDelete = async (id) => {
        try {
            const bool = window.confirm('B???n c?? mu???n x??a th???i kh??a bi???u n??y?');
            if (!bool) return;
            await scheduleService.delete(id)
            getAPI();
        } catch (error) {
            console.log(error);
        }
    }

    return <>
        <MainCard title={<Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpen(true)}
        >
            T???o th???i kh??a bi???u
        </Button>}>
            <TableContainer component={Paper} >
                <Table sx={{ minWidth: 650 }} aria-label="simple table" size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                #
                            </TableCell>
                            <TableCell>
                                H???c k??
                            </TableCell>
                            <TableCell>
                                Ng??y b???t ?????u
                            </TableCell>
                            <TableCell>
                                Ng??y k???t th??c
                            </TableCell>
                            <TableCell>

                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {!loading > 0 && scheduleList.map((row, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell width={"30px"}>{index + 1}</TableCell>
                                <TableCell align="left">{row.semester}</TableCell>
                                <TableCell align="left">{formatDateVN(row.startDate)}</TableCell>
                                <TableCell align="left">{formatDateVN(row.endDate)}</TableCell>
                                <TableCell align="right">
                                    <IconButton color="primary" component="span" onClick={() => handleEdit(row._id)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton color="error" component="span" onClick={() => handleDelete(row._id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </MainCard>
        <Dialog
            open={open}
            onClose={handleClose}
        >
            <DialogTitle>
                {"Th??m m???i m???t l???p h???c"}
            </DialogTitle>
            <DialogContent>
                <Box sx={{ paddingTop: '20px', width: 400, display: 'flex', justifyContent: 'space-between' }}>
                    <TextField
                        required
                        label="Ng??y b???t ?????u"
                        variant="standard"
                        type="date"
                        sx={{ width: '46%' }}
                        InputLabelProps={{ shrink: true, }}
                        value={schedule.startDate ? formatInputDate(schedule.startDate) : formatInputDate('')}
                        onChange={(event) => setSchedule(prev => ({
                            ...prev,
                            startDate: event.target.value
                        }))}
                    />
                    <TextField
                        required
                        label="Ng??y b???t ?????u"
                        variant="standard"
                        type="date"
                        sx={{ width: '46%' }}
                        InputLabelProps={{ shrink: true, }}
                        value={schedule.endDate ? formatInputDate(schedule.endDate) : formatInputDate('')}
                        onChange={(event) => setSchedule(prev => ({
                            ...prev,
                            endDate: event.target.value
                        }))}
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>H???y</Button>
                <Button autoFocus onClick={handleAddSchedule}>
                    Th??m
                </Button>
            </DialogActions>
        </Dialog>
    </>

}

export default ScheduleList;
