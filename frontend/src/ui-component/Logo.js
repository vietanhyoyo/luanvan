// material-ui
import { useTheme } from '@mui/material/styles';
import logo from 'assets/images/logoSchool.png'
/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';
 * import logo from 'assets/images/logo.svg';
 *
 */

// ==============================|| LOGO SVG ||============================== //

const Logo = (props) => {
    const theme = useTheme();

    return (
        /**
         * if you want to use image instead of svg uncomment following, and comment out <svg> element.
         *
         * <img src={logo} alt="Berry" width="100" />
         *
         */
        <img
            {...props}
            src={logo} alt='logo'
            style={{ width: props.width ? props.width : "55px" }}
        />
    );
};

export default Logo;
