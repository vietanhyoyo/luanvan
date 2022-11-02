// material-ui
import { Link, Typography, Stack } from '@mui/material';

// ==============================|| FOOTER - AUTHENTICATION 2 & 3 ||============================== //

const AuthFooter = () => (
    <Stack direction="row" justifyContent="space-between">
        <Typography variant="subtitle2" component={Link} href="https://berrydashboard.io" target="_blank" underline="hover">
            vanhyoyo@gmail.com
        </Typography>
        <Typography variant="subtitle2" component={Link} href="https://codedthemes.com" target="_blank" underline="hover">
            &copy; B1805739 Bui Viet Anh
        </Typography>
    </Stack>
);

export default AuthFooter;
