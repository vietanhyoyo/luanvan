import { useState } from 'react';
import { Typography, Autocomplete, TextField } from "@mui/material";


const CalendarSubject = ({ title }) => {

    const [selected, setSeleted] = useState(false)

    const top100Films = [
        { label: 'The Shawshank Redemption', year: 1994 },
        { label: 'The Godfather', year: 1972 }
    ]

    if (selected)
        return <Autocomplete
            disablePortal
            freeSolo
            disableClearable
            id="combo-box-demo"
            options={top100Films}
            sx={{ width: 100, margin: "0 auto", padding: '0' }}
            onChange={((e, value) => {
                console.log(value);
                setSeleted(!selected);
            })}
            renderInput={(params) => <TextField {...params} label={""} variant="standard"
            padding={0} sx={{margin: "0px"}}/>}
        />

    return (
        <>
            <Typography
                sx={{ cursor: "pointer" }}
                onClick={() => {
                    setSeleted(!selected);
                }}
            >
                {title}
            </Typography>
        </>
    )
}

export default CalendarSubject;