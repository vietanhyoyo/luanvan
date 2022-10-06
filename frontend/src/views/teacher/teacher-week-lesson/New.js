import { Box, Typography, Avatar } from "@mui/material"
import { useTheme } from "@mui/system";

const New = () => {
    const theme = useTheme();
    return (
        <Box marginBottom={1}>
            <Box display="flex">
                <Box display="flex">
                    <Avatar
                        sx={{ width: 34, height: 34, marginRight: 1 }}
                        alt="user"
                        src="https://th.bing.com/th/id/R.25905326d345f14c1cace42187e520a2?rik=nzI04jZX29GPXA&pid=ImgRaw&r=0&sres=1&sresct=1" />
                    <Box>
                        <Typography
                            variant={"subtitle2"}
                            color={theme.palette.grey[800]}
                        >
                            Nguyễn Thị Thanh Thủy
                        </Typography>
                        <Typography
                            variant={"caption"}
                        >
                            01/05/2022
                        </Typography>
                    </Box>
                </Box>
            </Box>
            <Typography marginTop={1}>
                Thông báo với toàn trường là ngày 1/5 chúng ta sẽ không có học
            </Typography>
        </Box>
    )
}

export default New;
