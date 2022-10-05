import { Link } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Divider, Grid, Stack, Typography, useMediaQuery } from '@mui/material';

// project imports
import AuthWrapper1 from '../AuthWrapper1';
import AuthCardWrapper from '../AuthCardWrapper';
import AuthLogin from '../auth-forms/AuthLogin';
import Logo from 'ui-component/Logo';
import AuthFooter from 'ui-component/cards/AuthFooter';
import LoginLogo from 'assets/images/logoLogin.png'
import useRole from 'hooks/useRole'
import { Navigate, useLocation } from "react-router-dom"
// ================================|| AUTH3 - LOGIN ||================================ //

const Login = () => {

    const location = useLocation();
    const role = useRole();
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

    if (role === 0) return <Navigate to={'/dashboard'} state={{ from: location }} />
    else if (role === 1) return <Navigate to={'/teacher/teacher-route'} state={{ from: location }} />
    else if (role === 2) return <Navigate to={'/student/home'} state={{ from: location }} />
    else
        return (
            <AuthWrapper1>
                <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh' }}>
                    <Grid item xs={12}>
                        <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
                            <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
                                <AuthCardWrapper>
                                    <Grid container spacing={2} alignItems="center" justifyContent="center">
                                        <Grid item sx={{ mb: 3 }}>
                                            <Link to="#">
                                                <img alt="login" src={LoginLogo} width="200" />
                                            </Link>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Grid
                                                container
                                                direction={matchDownSM ? 'column-reverse' : 'row'}
                                                alignItems="center"
                                                justifyContent="center"
                                                marginTop={-5}
                                            >
                                                <Grid item>
                                                    <Stack alignItems="center" justifyContent="center" spacing={1}>
                                                        <Typography
                                                            color={theme.palette.secondary.main}
                                                            gutterBottom
                                                            variant={matchDownSM ? 'h3' : 'h2'}
                                                            textAlign={'center'}
                                                        >
                                                            Trường Tiểu Học Lê Quý Đôn
                                                        </Typography>
                                                        <Typography
                                                            variant="caption"
                                                            fontSize="14px"
                                                            textAlign={'center'}
                                                            width={260}
                                                        >
                                                            Bạn vui lòng nhập tài khoản và mật khẩu để sử dụng hệ thống
                                                        </Typography>
                                                    </Stack>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <AuthLogin />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Divider />
                                        </Grid>
                                    </Grid>
                                </AuthCardWrapper>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
                        <AuthFooter />
                    </Grid>
                </Grid>
            </AuthWrapper1>
        );
};

export default Login;
