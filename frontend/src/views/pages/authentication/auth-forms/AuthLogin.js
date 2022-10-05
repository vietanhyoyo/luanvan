import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormHelperText,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Stack,
    Typography
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import useScriptRef from 'hooks/useScriptRef';
import AnimateButton from 'ui-component/extended/AnimateButton';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { useNavigate } from 'react-router';
import axios from 'axios';

// ============================|| FIREBASE - LOGIN ||============================ //

const FirebaseLogin = ({ ...others }) => {

    const navigate = useNavigate();
    const [account, setAccount] = useState({
        username: "",
        password: ""
    })

    const theme = useTheme();
    const scriptedRef = useScriptRef();
    const [checked, setChecked] = useState(true);

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const [errorAccount, setErrorAccount] = useState({
        username: false,
        password: false
    })

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const validationAccount = () => {
        let bool = true;
        if (errorAccount.username) bool = false;
        if (errorAccount.password) bool = false;
        return bool;
    }

    //Su kien submit
    const handleLogin = () => {

        if (!validationAccount()) {
            alert('Thông tin chưa hợp lệ!');
            return
        }

        axios.post(process.env.REACT_APP_BASE_URL + "/author/login", account)
            .then(res => res.data)
            .then(res => {
                if (res.status === "Error") {
                    console.log(res);
                }
                else {
                    sessionStorage.setItem('ACCESS_TOKEN', res.accessToken);
                    localStorage.setItem('REFRESH_TOKEN', res.refreshToken);
                    if (res.role === 0)
                        navigate('/dashboard')
                    else if (res.role === 1)
                        navigate('/teacher/teacher-route')
                    else
                        navigate('/student/home')
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <>
            <Formik
                initialValues={{
                    email: 'info@codedthemes.com',
                    password: '123456',
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string().max(255).required('Email is required'),
                    password: Yup.string().max(255).required('Password is required')
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                        if (scriptedRef.current) {
                            setStatus({ success: true });
                            setSubmitting(false);
                            console.log('Dang nhap');
                        }
                    } catch (err) {
                        console.error(err);
                        if (scriptedRef.current) {
                            setStatus({ success: false });
                            setErrors({ submit: err.message });
                            setSubmitting(false);
                        }
                    }
                }}
            >
                {({ errors, handleBlur, handleChange, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={(e) => {
                        e.preventDefault();
                        handleLogin();
                    }} {...others}>
                        <FormControl fullWidth error={errorAccount.username} sx={{ ...theme.typography.customInput }}>
                            <InputLabel htmlFor="outlined-adornment-email-login">Tài khoản</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-email-login"
                                type="email"
                                value={account.username}
                                name="email"
                                onBlur={() => {
                                    if (account.username === "") {
                                        setErrorAccount(prev => ({
                                            ...prev,
                                            username: true
                                        }))
                                    }
                                }}
                                onFocus={() => {
                                    setErrorAccount(prev => ({
                                        ...prev,
                                        username: false
                                    }))
                                }}
                                onChange={(event) => {
                                    setAccount(prev => ({
                                        ...prev,
                                        username: event.target.value
                                    }))
                                }}
                                label="Tài khoản"
                                inputProps={{}}
                            />
                            {touched.email && errors.email && (
                                <FormHelperText error id="standard-weight-helper-text-email-login">
                                    Bạn chưa điền tài khoản
                                </FormHelperText>
                            )}
                        </FormControl>

                        <FormControl
                            fullWidth
                            error={errorAccount.password}
                            sx={{ ...theme.typography.customInput }}
                        >
                            <InputLabel htmlFor="outlined-adornment-password-login">Mật khẩu</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password-login"
                                type={showPassword ? 'text' : 'password'}
                                value={account.password}
                                name="password"
                                onBlur={() => {
                                    if (account.password === "") {
                                        setErrorAccount(prev => ({
                                            ...prev,
                                            password: true
                                        }))
                                    }
                                }}
                                onFocus={() => {
                                    setErrorAccount(prev => ({
                                        ...prev,
                                        password: false
                                    }))
                                }}
                                onChange={(event) => {
                                    setAccount(prev => ({
                                        ...prev,
                                        password: event.target.value
                                    }))
                                }}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                            size="large"
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Mật khẩu"
                                inputProps={{}}
                            />
                            {touched.password && errors.password && (
                                <FormHelperText error id="standard-weight-helper-text-password-login">
                                    Bạn chưa điền mật khẩu
                                </FormHelperText>
                            )}
                        </FormControl>
                        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={checked}
                                        onChange={(event) => setChecked(event.target.checked)}
                                        name="checked"
                                        color="primary"
                                    />
                                }
                                label="Ghi nhớ đăng nhập"
                            />
                            <Typography variant="subtitle1" color="secondary" sx={{ textDecoration: 'none', cursor: 'pointer' }}>
                                Quên mật khẩu?
                            </Typography>
                        </Stack>
                        {errors.submit && (
                            <Box sx={{ mt: 3 }}>
                                <FormHelperText error>{errors.submit}</FormHelperText>
                            </Box>
                        )}

                        <Box sx={{ mt: 2 }}>
                            <AnimateButton>
                                <Button
                                    disableElevation
                                    disabled={isSubmitting}
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    color="secondary"
                                >
                                    Đăng nhập
                                </Button>
                            </AnimateButton>
                        </Box>
                    </form>
                )}
            </Formik>
        </>
    );
};

export default FirebaseLogin;
