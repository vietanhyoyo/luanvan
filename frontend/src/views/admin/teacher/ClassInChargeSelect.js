import { useState, useEffect } from 'react'
import {
    Box, Button, Chip, Dialog, DialogTitle, DialogContent,
    DialogActions, Typography, FormControlLabel, Label,
    Checkbox
} from '@mui/material'
import ClassService from 'services/objects/class.service';

const classService = new ClassService();

const ClassInChargeSelect = (props) => {

    const [open, setOpen] = useState(false);
    const [classList, setClassList] = useState([]);
    const [checkBoxList, setCheckBoxList] = useState([]);
    const [chipList, setChipList] = useState([]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        let array = checkBoxList.filter((row) => {
            return row.checked === true;
        })
        array = array.map(row => {
            return row._id
        })
        props.changeClassList(array);
        const chips = checkBoxList.filter(row => {
            return row.checked;
        })

        setChipList(chips);
        handleClose();
    }

    const getClassList = async () => {
        try {
            const result = await classService.getNowClasses();
            const docs = result.data;
            setClassList(docs)
            return docs
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(async () => {
        let subList = classList;
        if (classList.length === 0) {
            subList = await getClassList();
        }
        subList = subList.map((row) => {
            const found = props.classList.find(element => element === row._id);
            if (found)
                return {
                    ...row,
                    checked: true
                }
            else return {
                ...row,
                checked: false
            }
            return { ...row, checked: true }
        })
        setCheckBoxList(subList);

        const chips = subList.filter(row => {
            return row.checked;
        })
        setChipList(chips);
    }, [classList, props.classList])

    const handleChange = (event, index) => {
        const list = checkBoxList.map((row, indexRow) => {
            if (index === indexRow) {
                row.checked = event.target.checked;
            }
            return row;
        });
        setCheckBoxList(list);
    }

    return (<>
        <Box>
            <Chip
                label="thêm" size="small"
                variant="outlined" onClick={handleClickOpen}
                sx={{ marginRight: "4px", marginBottom: "8px" }} />
            {chipList.map((row, index) => {
                const labelString = `Lớp ${row.name}`
                return <Chip label={labelString} size="small"
                    sx={{ marginRight: "4px", marginBottom: "8px" }}
                    key={index} />
            })}
        </Box>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Chọn lớp phụ trách</DialogTitle>
            <DialogContent>{
                checkBoxList.length <= 0
                    ?
                    <Typography>Không có dữ liệu</Typography>
                    :
                    checkBoxList.map((row, index) => {
                        const labelString = `Lớp ${row.name}`;

                        return <FormControlLabel
                            sx={{ display: "block" }}
                            key={index}
                            label={labelString}
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
    </>)

}

export default ClassInChargeSelect;