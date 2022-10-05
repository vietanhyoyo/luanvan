// material-ui
import { styled } from '@mui/material/styles';
import back from 'assets/images/bakgroun.png'

// ==============================|| AUTHENTICATION 1 WRAPPER ||============================== //

const AuthWrapper1 = styled('div')(({ theme }) => ({
    backgroundImage: `url(${back})`,
    backgroundSize: "200px",
    minHeight: '100vh'
}));

export default AuthWrapper1;
