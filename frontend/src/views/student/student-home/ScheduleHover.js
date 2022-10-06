import { Typography, Tooltip } from "@mui/material"

const ScheduleHover = ({ title, tooltip }) => {
    return (
        <Tooltip title={tooltip} arrow>
            <Typography variant="body1">
                {title}
            </Typography>
        </Tooltip>
    )
}

export default ScheduleHover;