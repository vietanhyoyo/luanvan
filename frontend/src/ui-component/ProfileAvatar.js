import { Box, Typography, Avatar, Divider, Button, IconButton } from "@mui/material"
import { styled, useTheme } from "@mui/system";
import { useEffect, useState } from "react";
import AccountService from "services/objects/account.service";
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import ImageService from "services/media/image.service";

const Input = styled('input')({
    display: 'none',
});

const accountService = new AccountService()
const imageService = new ImageService()
const baseUrl = process.env.REACT_APP_BASE_URL

const ProfileAvatar = ({ fullname, title }) => {
    const theme = useTheme();
    const [image, setImage] = useState(null)
    const [account, setAccount] = useState({
        avatar: null
    })

    const getAccountInfor = async () => {
        try {
            const result = await accountService.getUserInfo();
            setAccount(result.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAccountInfor();
    }, [])

    const changefile = async (e) => {
        const file = e.target.files[0];
        file.preview = await URL.createObjectURL(file);
        setImage(file);
        setAccount(prev => ({ ...prev, avatar: file.name }));
    }

    const handleSave = async () => {
        try {
            await upImage()
            await updateAccount()
        } catch (error) {
            console.log(error)
        }
    }

    const upImage = async () => {
        const formData = new FormData();
        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }
        formData.append('fileImage', image)

        try {
            const result = await imageService.upload(formData, config)
            console.log(result)
        } catch (error) {
            console.log(error)
        }
    }

    const updateAccount = async () => {
        try {
            const result = await accountService.editAccount(account)
            console.log(result)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Box
            sx={{
                textAlign: "center"
            }}
        >
            {image ? <Avatar
                alt="profile"
                src={image.preview}
                sx={{ width: 100, height: 100, margin: "auto" }}
            /> :
                (account.avatar ? <Avatar
                    alt="profile"
                    src={baseUrl + "/image/" + account.avatar}
                    sx={{ width: 100, height: 100, margin: "auto" }}
                /> : <Avatar
                    alt="profile"
                    label='T'
                    sx={{ width: 100, height: 100, margin: "auto" }}
                />)}
            <Typography variant="h2" sx={{ margin: 2 }} >
                {fullname ?? "Không tên"}
            </Typography>
            <Typography variant="body1" sx={{ margin: 2 }} >
                {title ?? "---"}
            </Typography>
            <Divider />
            <label htmlFor="contained-button-file">
                <IconButton color="primary" aria-label="upload picture" component="label">
                    <Input hidden accept="image/*" id="contained-button-file" type="file" onChange={changefile} />
                    <PhotoCamera />
                </IconButton>
            </label>
            <Box>
                <Button onClick={handleSave}>Lưu ảnh</Button>
            </Box>
        </Box >
    )
}
export default ProfileAvatar;