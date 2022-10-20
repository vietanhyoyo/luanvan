import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const offAutoComplete = {
    autoComplete: 'new-password',
    form: {
        autoComplete: 'off',
    },
}

export default function PasswordInput(props) {

    const [values, setValues] = React.useState({
        password: '',
        showPassword: false,
    });

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleChange = (e) => {
        if (props.onChange) props.onChange(e);
    }

    return <><FormControl sx={[{ m: 1 }, (props.sx ? props.sx : {})]} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">{props.label ? props.label : ''}</InputLabel>
        <OutlinedInput
            {...props}
            sx={{}}
            inputProps={offAutoComplete}
            id="outlined-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={props.value ? props.value : ''}
            onChange={handleChange}
            endAdornment={
                <InputAdornment position="end">
                    <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                    >
                        {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                </InputAdornment>
            }
        />
        {props.helpertext && <p style={{
            fontSize: '14px',
            color: '#F34949',
            marginTop: '4px',
            marginBottom: 0,
            marginLeft: '5px'
        }}>{props.helpertext}</p>}
    </FormControl>
    </>
}