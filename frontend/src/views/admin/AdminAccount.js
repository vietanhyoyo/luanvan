

// material-ui
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { useState, useEffect, forwardRef } from 'react';
import {
    Table, TableBody, TableCell, TableContainer, DialogActions, TextField,
    TableHead, TableRow, Paper, Dialog, DialogTitle, Box, Button, DialogContent,
    InputAdornment, InputLabel, FormControl, OutlinedInput, LinearProgress,
    Snackbar
} from '@mui/material';

import moment from 'moment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import AdminService from 'services/objects/admin.service';
import MuiAlert from '@mui/material/Alert';
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

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const adminService = new AdminService();

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

const offAutoComplete = {
    autoComplete: 'new-password',
    form: {
        autoComplete: 'off',
    },
}

// ==============================|| SAMPLE PAGE ||============================== //

const AdminAccount = () => {

    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [newAccount, setNewAccount] = useState({
        username: '',
        password: '',
        name: ''
    });
    const [accountList, setAccountList] = useState([]);
    const [accountSelect, setAccountSelect] = useState({
        username: '',
        password: '',
        name: '',
    });
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

    const handleClose = () => {
        setOpen(false)
    }

    const handleAdd = async () => {
        if (newAccount.username === '' ||
            newAccount.password === '' ||
            newAccount.name === '') {
            setOpen(false)
            return;
        }
        try {
            const result = await adminService.addAdmin(newAccount);
            if (result.data.status === "Error") {
                setNotification({
                    open: true,
                    message: result.data.message,
                    status: 'error'
                })
            }
            else {
                getAPI();
                console.log(result);
                setNotification({
                    open: true,
                    message: 'Đã thay đổi!',
                    status: 'success'
                })
            }
        } catch (error) {
            console.log(error)
        }
        setNewAccount({
            username: '', password: '', name: ''
        })
        setOpen(false)
    }

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const getAPI = async () => {
        try {
            const result = await adminService.getAdminAccount();
            setAccountList(result.data);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAPI();
    }, [])

    const handleEdit = (index) => {
        setAccountSelect(accountList[index]);
        setOpenEdit(true);
    };

    const handleSubmitEdit = async () => {
        try {
            const result = await adminService.editAccount(accountSelect);
            console.log(result);
            if (result.data.status === "Error") {
                setNotification({
                    open: true,
                    message: result.data.message,
                    status: 'error'
                })
            }
            else {
                getAPI();
                setNotification({
                    open: true,
                    message: 'Đã thay đổi!',
                    status: 'success'
                })
            }
        } catch (error) {
            console.log(error);
        }
        setOpenEdit(false);
    };

    const handleDeleteAccount = async (id) => {
        const bool = window.confirm('Bạn có muốn xóa lớp này không?');
        if (bool) {
            try {
                const result = await adminService.deleteAccount(id);
                if (result.data.status === "Error") {
                    setNotification({
                        open: true,
                        message: result.data.message,
                        status: 'error'
                    })
                }
                else {
                    getAPI();
                    setNotification({
                        open: true,
                        message: 'Đã xóa một tài khoản!',
                        status: 'success'
                    })
                }
            } catch (error) {
                console.log(error);
            }
        }
        else return
    }

    return accountList.length === 0
        ?
        <Box sx={{ width: '100%' }}>
            <LinearProgress />
        </Box>
        :
        <MainCard title="Tài khoản quản trị">
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table" size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell align="left">Tài khoản</TableCell>
                            <TableCell align="left">Tên</TableCell>
                            <TableCell align="left">Ngày tạo</TableCell>
                            <TableCell align="left">Ngày sinh</TableCell>
                            <TableCell align="right">
                                <IconButton component="span" onClick={() => {
                                    setOpen(true)
                                }}>
                                    <AddCircleOutlineIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {accountList.map((row, index) => (
                            <StyledTableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell width={"30px"}>{index + 1}</TableCell>
                                <TableCell align="left">{row.username}</TableCell>
                                <TableCell align="left">{row.name}</TableCell>
                                <TableCell align="left">{formatDateVN(row.createdAt)}</TableCell>
                                <TableCell align="left">{row.birthday ? formatDateVN(row.birthday) : ''}</TableCell>
                                <TableCell align="right">
                                    <IconButton color="primary" component="span" onClick={() => handleEdit(index)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton color="error" component="span" onClick={() => handleDeleteAccount(row._id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </StyledTableRow>
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
                    Thêm tài khoản quản trị mới
                </DialogTitle>
                <DialogContent sx={{ width: 400 }}>
                    <Box mt={3} sx={{ width: '100%' }}>
                        <TextField
                            sx={{ width: '100%' }}
                            label="Tên tài khoản"
                            variant="outlined"
                            value={newAccount.username}
                            onChange={(event) => setNewAccount(prev => ({
                                ...prev,
                                username: event.target.value
                            }))}
                            autoComplete="off"
                            inputProps={offAutoComplete}
                        />
                    </Box>
                    <Box mt={3}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel htmlFor="adornment-password">Password</InputLabel>
                            <OutlinedInput
                                autoComplete="off"
                                id="adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                value={newAccount.password}
                                inputProps={offAutoComplete}
                                onChange={(event) => setNewAccount(prev => ({
                                    ...prev,
                                    password: event.target.value
                                }))}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
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
                            />
                        </FormControl>
                    </Box>
                    <Box mt={3}>
                        <TextField
                            sx={{ width: '100%' }}
                            label="Họ và tên"
                            variant="outlined"
                            value={newAccount.name}
                            onChange={(event) => setNewAccount(prev => ({
                                ...prev,
                                name: event.target.value
                            }))}
                            autoComplete="off"
                            inputProps={offAutoComplete}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Hủy</Button>
                    <Button onClick={handleAdd} autoFocus>
                        Thêm
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={openEdit}
                onClose={() => setOpenEdit(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Chỉnh sửa thông tin tài khoản
                </DialogTitle>
                <DialogContent sx={{ width: 400 }}>
                    <Box mt={3} sx={{ width: '100%' }}>
                        <TextField
                            sx={{ width: '100%' }}
                            label="Tên tài khoản"
                            variant="outlined"
                            value={accountSelect.username}
                            onChange={(event) => setAccountSelect(prev => ({
                                ...prev,
                                username: event.target.value
                            }))}
                            autoComplete="off"
                        />
                    </Box>
                    <Box mt={3}>
                        <TextField
                            sx={{ width: '100%' }}
                            label="Họ và tên"
                            variant="outlined"
                            value={accountSelect.name}
                            onChange={(event) => setAccountSelect(prev => ({
                                ...prev,
                                name: event.target.value
                            }))}
                            autoComplete="off"
                        />
                    </Box>
                    <Box mt={3}>
                        <TextField
                            id="date"
                            label="Ngày sinh"
                            type="date"
                            sx={{ width: '100%' }}
                            value={accountSelect.birthday ? formatInputDate(accountSelect.birthday) : formatInputDate('')}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={(event) => setAccountSelect(prev => ({
                                ...prev,
                                birthday: event.target.value
                            }))}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenEdit(false)}>Hủy</Button>
                    <Button onClick={handleSubmitEdit} autoFocus>
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
}

export default AdminAccount;
