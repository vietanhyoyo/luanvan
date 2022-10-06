import MainCard from "ui-component/cards/MainCard";
import {
    Chip, Typography, Button, TextField, Link, Dialog, DialogTitle,
    DialogContent, DialogActions, Box, Paper, Checkbox,
    FormLabel, RadioGroup, FormControlLabel, Radio, FormControl
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useState, useEffect } from 'react'
import LinkService from "services/objects/link.service";
import TeacherService from "services/objects/teacher.service";

const linkService = new LinkService();
const teacherService = new TeacherService();

const LinkEdit = () => {

    const [open, setOpen] = useState(false);
    const [link, setLink] = useState("");
    const [teacher, setTeacher] = useState({})
    const [linkList, setLinkList] = useState([]);
    const [linkSelecter, setLinkSelecter] = useState("")

    const getTeacherInformation = async () => {
        try {
            const result = await teacherService.getInformation();
            const data = result.data;
            setTeacher(data)
        } catch (error) {
            console.log(error);
        }
    }

    const getLinkTeacher = async () => {
        try {
            const result = await linkService.getLinksByTeacher();
            const docs = result.data;
            if (docs !== "") {
                setLinkList(docs);
                if (linkSelecter === "") {
                    docs.forEach(element => {
                        if (element.status === "on") {
                            setLinkSelecter(element._id);
                        }
                    });
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        getTeacherInformation();
        getLinkTeacher();
    }, [])

    const handleChangeRadio = async (event) => {
        try {
            const result = await linkService.changeLink(event.target.value, teacher._id);
            if (result.status === 200) {
                getLinkTeacher();
                setLinkSelecter(event.target.value);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const submit = async () => {
        try {
            const data = {
                link: link,
                teacher: teacher._id
            }
            await linkService.addLink(data);
            getLinkTeacher();
            handleClose();
        } catch (error) {
            console.log(error);
        }
    }

    const handleDelete = async (id) => {
        const bool = window.confirm("Bạn có muốn xóa link này!");
        if (bool) {
            try {
                const result = await linkService.delete(id);
                getLinkTeacher();
                console.log(result);
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <>
            <MainCard title="Quản lý đường link học">
                <Button
                    onClick={handleClickOpen}
                    variant="outlined"
                    startIcon={<AddIcon />}>
                    Thêm đường link
                </Button>
                <Box display={"block"} sx={{ width: "100%" }} mt={1}>
                    <FormControl sx={{ width: "100%" }}>
                        <RadioGroup
                            // defaultValue="female"
                            // name="radio-buttons-group"
                            value={linkSelecter}
                            sx={{ width: "100%" }}
                            onChange={handleChangeRadio}
                        >
                            {
                                linkList.length === 0 ?
                                    <div></div> :
                                    linkList.map((row, index) => {
                                        return <Box key={index} mt={1} mb={1} sx={{ width: "100%" }}>
                                            <Paper elevation={3}>
                                                <Box
                                                    display="flex"
                                                    sx={{
                                                        width: "100%",
                                                        padding: "20px",
                                                        justifyContent: "space-between",
                                                        flexDirection: "row"
                                                    }}>
                                                    <Box
                                                        sx={{ maxWidth: "500px" }}
                                                        display="flex" flexWrap="nowrap">
                                                        <FormControlLabel
                                                            value={row._id}
                                                            control={<Radio />}
                                                            label={
                                                                <Box>
                                                                    <Link
                                                                        href={row.link}
                                                                        target="_blank"
                                                                    >
                                                                        {row.link}
                                                                    </Link>
                                                                </Box>
                                                            } />
                                                        <Chip
                                                            size="small"
                                                            label={row.status === 'off'
                                                                ? "Chưa sử dụng"
                                                                : "Đang áp dụng"}
                                                            color={row.status === 'off'
                                                                ? "warning"
                                                                : "success"} />
                                                    </Box>
                                                    <Box>
                                                        <Button
                                                            size="small"
                                                            variant="text"
                                                            color="error"
                                                            onClick={() => handleDelete(row._id)}
                                                        >Xóa</Button>
                                                    </Box>
                                                </Box>
                                            </Paper>
                                        </Box>
                                    })
                            }
                        </RadioGroup>
                    </FormControl>
                </Box>
            </MainCard>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle id="alert-dialog-title">
                    {"Thêm một đường link mới"}
                </DialogTitle>
                <DialogContent sx={{ width: 400 }}>
                    <Box sx={{ width: "100%", marginTop: "26px" }}>
                        <TextField
                            sx={{ width: "100%" }}
                            onChange={event => setLink(event.target.value)}
                            label="Nhập link vào đây"
                            variant="outlined" />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Hủy</Button>
                    <Button onClick={submit} autoFocus>
                        Thêm
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default LinkEdit;