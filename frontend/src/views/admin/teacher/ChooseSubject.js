import {
    Typography, Box, TextField, IconButton, Button,
    FormControl, Input, InputLabel, InputAdornment,
    Dialog, DialogTitle, DialogContent, DialogContentText,
    DialogActions, Checkbox, FormControlLabel, Chip
} from "@mui/material"
import { useState, useEffect } from "react"
import SubjectService from "services/objects/subject.service";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const offAutoComplete = {
    autoComplete: 'new-password',
    form: {
        autoComplete: 'off',
    },
}

const subjectService = new SubjectService();

export default function ChooseSubject(props) {

    const [subjectList, setSubjectList] = useState([]);
    const [checkBoxList, setCheckBoxList] = useState([]);
    const [chipList, setChipList] = useState([]);
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const getAPISubjectList = async () => {
        try {
            const result = await subjectService.getAll();
            const docs = result.data;
            setSubjectList(result.data);
            return docs;
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    useEffect(async () => {
        let subList = subjectList;
        if (subjectList.length === 0) {
            subList = await getAPISubjectList();
        }
        subList = subList.map((row) => {
            const found = props.subjectProps.find(element => element === row._id);
            if (found)
                return {
                    ...row,
                    checked: true
                }
            else return {
                ...row,
                checked: false
            }
        })
        setCheckBoxList(subList);

        const chips = subList.filter(row => {
            return row.checked;
        })
        setChipList(chips);

    }, [subjectList, props.subjectProps])

    const handleChange = (event, index) => {
        const list = checkBoxList.map((row, indexRow) => {
            if (index === indexRow) {
                row.checked = event.target.checked;
            }
            return row;
        });
        setCheckBoxList(list);
    }

    const handleSave = () => {
        let array = checkBoxList.filter((row) => {
            return row.checked === true;
        })
        array = array.map(row => {
            return row._id
        })
        props.changeSubject(array);
        const chips = checkBoxList.filter(row => {
            return row.checked;
        })

        setChipList(chips);
        handleClose();
    }

    return (
        <>
            <Box>
                <Chip label="thêm" size="small" variant="outlined" onClick={handleClickOpen} sx={{ marginRight: "4px", marginBottom: "8px" }} />
                {chipList.map((row, index) => {
                    return <Chip label={row.name} size="small" sx={{ marginRight: "4px", marginBottom: "8px" }} key={index} />
                })}
            </Box>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Chọn môn học giảng dạy</DialogTitle>
                <DialogContent>
                    {
                        checkBoxList.length <= 0
                            ?
                            <Typography>Không có dữ liệu</Typography>
                            :
                            checkBoxList.map((row, index) => {
                                return <FormControlLabel key={index}
                                    label={row.name}
                                    checked={row.checked}
                                    onChange={(event) => handleChange(event, index)}
                                    control={<Checkbox />}
                                />
                            })
                    }
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Hủy</Button>
                    <Button onClick={handleSave}>Lưu</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}