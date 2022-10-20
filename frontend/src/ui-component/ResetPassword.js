import MainCard from "./cards/MainCard"
import { Box, TextField, Button } from "@mui/material"
import { useState } from 'react'
import PasswordInput from "./form/PasswordInput"
import AccountService from "services/objects/account.service"

const emptyPassword = {
    old: "",
    new: "",
    reNew: ""
}

const accountService = new AccountService();

const ResetPassword = () => {

    const [password, setPassword] = useState(emptyPassword);
    const [warning, setWarning] = useState(emptyPassword)

    const handleChange = e => {
        const name = e.target.name
        setPassword(prev => ({
            ...prev,
            [name]: e.target.value
        }))
    }

    const resetPassword = () => {
        setPassword(emptyPassword)
    }

    const handleSubmit = async () => {
        if (validateForm()) {
            try {
                const result = await accountService.changePassword(password.old, password.new)
                if(result.data.status === 500) {
                    setWarning(prev => ({ ...prev, old: result.data.message }));
                }
                if(result.data.status === 200) {
                    alert('Bạn đã đổi mật khẩu thành công!')
                    resetPassword()
                }
                console.log(result)
            } catch (error) {
                console.log(error)
            }
        }
        else {
            console.log('Error')
        }
    }

    const validateForm = () => {
        let bool = true
        if (password.old.length === 0) {
            setWarning(prev => ({ ...prev, old: "Chưa nhập" }));
            bool = false;
        }
        if (password.new.length === 0) {
            setWarning(prev => ({ ...prev, new: "Chưa nhập" }));
            bool = false;
        }
        if (password.reNew.length === 0) {
            setWarning(prev => ({ ...prev, reNew: "Chưa nhập" }));
            bool = false;
        }
        if (password.reNew !== password.new) {
            setWarning(prev => ({ ...prev, reNew: "Mật khẩu nhập lại không khớp!" }));
            bool = false;
        }
        return bool
    }

    return <>
        <MainCard title="Thay đổi mật khẩu">
            <Box width={"100%"} pr={2} >
                <PasswordInput sx={{ margin: 1, width: "100%" }}
                    name="old"
                    required
                    label="Nhập mật khẩu hiện tại"
                    variant="outlined"
                    value={password.old}
                    onChange={handleChange}
                    onFocus={() => setWarning(prev => ({ ...prev, old: '' }))}
                    error={warning.old ? true : false}
                    helpertext={warning.old}
                />
                <PasswordInput sx={{ margin: 1, width: "100%" }}
                    name="new"
                    required
                    label="Nhập mật khẩu mới"
                    variant="outlined"
                    value={password.new}
                    onChange={handleChange}
                    onFocus={() => {
                        setWarning(prev => ({ ...prev, reNew: '' }))
                        setWarning(prev => ({ ...prev, new: '' }))
                    }}
                    error={warning.new ? true : false}
                    helpertext={warning.new}
                />
                <PasswordInput sx={{ margin: 1, width: "100%" }}
                    name="reNew"
                    required
                    label="Nhập lại mật khẩu mới"
                    variant="outlined"
                    value={password.reNew}
                    onChange={handleChange}
                    onFocus={() => setWarning(prev => ({ ...prev, reNew: '' }))}
                    error={warning.reNew ? true : false}
                    helpertext={warning.reNew}
                />
                <Box sx={{
                    display: 'flex',
                    width: '100%',
                    justifyContent: 'end',
                    marginTop: 1
                }}>
                    <Button sx={{ marginRight: 2 }} onClick={resetPassword}>Trả lại</Button>
                    <Button
                        variant="contained"
                        onClick={handleSubmit}
                    >Lưu</Button>
                </Box>
            </Box>
        </MainCard>
    </>
}

export default ResetPassword