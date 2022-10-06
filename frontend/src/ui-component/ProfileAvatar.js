import { Box, Typography, Avatar, Divider, Button } from "@mui/material"
import { styled, useTheme } from "@mui/system";

const Input = styled('input')({
    display: 'none',
});

const ProfileAvatar = () => {
    const theme = useTheme();
    return (
        <Box
            sx={{
                textAlign: "center"
            }}
        >
            <Avatar
                alt="profile"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9d0FxkqjeagODizu4EZbMXw_-OFAF2Go0J0RJjGgYMHIB_ilFiIc8YipxLobRhQlQYiI&usqp=CAU"
                sx={{ width: 70, height: 70, margin: "auto" }}
            />
            <Typography variant="h2" sx={{ margin: 2 }} >
                Bùi Việt Anh
            </Typography>
            <Typography variant="body1" sx={{ margin: 2 }} >
                Lớp 3A
            </Typography>
            <Divider />
            <label htmlFor="contained-button-file">
                <Input accept="image/*" id="contained-button-file" multiple type="file" />
                <Button component="span">
                    Tải ảnh lên
                </Button>
            </label>
            <input accept="video/mp4" type="file" />
        </Box >
    )
}
export default ProfileAvatar;