import { Box, Typography, Avatar, Divider, Button } from "@mui/material"
import { styled, useTheme } from "@mui/system";
import { useEffect } from "react";
import AccountService from "services/objects/account.service";

const Input = styled('input')({
    display: 'none',
});

const accountService = new AccountService()

const ProfileAvatar = ({ fullname, title }) => {
    const theme = useTheme();

    const getAccountInfor = async () => {
        try {
            const result = await accountService.getUserInfo();
            // console.log(result)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAccountInfor();
    }, [])

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
                {fullname ?? "Không tên"}
            </Typography>
            <Typography variant="body1" sx={{ margin: 2 }} >
                {title ?? "---"}
            </Typography>
            <Divider />
            <label htmlFor="contained-button-file">
                <Input accept="image/*" id="contained-button-file" type="file" />
                <Button component="span">
                    Tải ảnh lên
                </Button>
            </label>
            <input accept="video/mp4" type="file" />
        </Box >
    )
}
export default ProfileAvatar;