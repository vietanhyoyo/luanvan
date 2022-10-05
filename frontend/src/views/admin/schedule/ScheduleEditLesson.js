
import {
    TableCell, TextField, Button, Box, Dialog, DialogTitle, FormControl,
    DialogContent, DialogActions, InputLabel, Select, MenuItem,
} from "@mui/material";
import { useState, useEffect } from "react"
import TeacherService from "services/objects/teacher.service";
import ScheduleService from "services/objects/schedule.service";

const teacherService = new TeacherService();
const scheduleService = new ScheduleService();

const ScheduleEditLesson = ({ subjectString, lessonID, classID, subjectProps, onUpdateLesson }) => {

    const [open, setOpen] = useState(false);
    const [edit, setEdit] = useState(false);
    const [subject, setSubject] = useState(-1);
    const [teacher, setTeacher] = useState(-1);
    const [teacherList, setTeacherList] = useState([{
        _id: ' ',
        name: ' '
    }]);

    const handleClose = () => {
        setOpen(false)
    }

    const handleOpen = () => {
        setOpen(true);
    }

    useEffect(async () => {
        if (subject !== -1) {
            try {
                const result = await teacherService.getTeacherBySubject(subjectProps[subject]._id, classID);
                setTeacherList(result.data)
                console.log(result)
            } catch (error) {
                console.log(error);
            }
        }
    }, [subject])

    const handleSave = async () => {
        if (subject !== -1) {
            try {
                let teacherID;
                if (teacher !== -1) {
                    teacherID = teacherList[teacher]._id;
                } else {
                    teacherID = null
                }
                const result = await scheduleService.updateScheduleLesson(lessonID, teacherID, subjectProps[subject]._id);
                onUpdateLesson();
                handleClose();
                console.log(result)
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <>
            <TableCell sx={{minWidth: '120px', paddingRight: 0, paddingLeft: 0}} align="center" onClick={handleOpen}>{
                subjectString
            }</TableCell>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>
                    {"Thêm tiết học"}
                </DialogTitle>
                <DialogContent sx={{ width: '300px' }}>
                    <Box mt={3} sx={{ width: '100%' }}>
                        <FormControl fullWidth>
                            <InputLabel id="year-select-label">Môn học</InputLabel>
                            <Select
                                labelId="year-select-label"
                                id="year-select"
                                value={subject}
                                label="Môn học"
                                onChange={(event) => setSubject(event.target.value)}
                            >
                                <MenuItem value={-1} >--</MenuItem>)
                                {subjectProps.map((row, index) =>
                                    <MenuItem value={index} key={index}>{row.name}</MenuItem>)}
                            </Select>
                        </FormControl>
                    </Box>
                    <Box mt={3} sx={{ width: '100%' }}>
                        <FormControl fullWidth>
                            <InputLabel id="year-select-label">Giáo viên</InputLabel>
                            <Select
                                labelId="year-select-label"
                                id="year-select"
                                value={teacher}
                                label="Giáo viên"
                                onChange={(event) => setTeacher(event.target.value)}
                            >
                                <MenuItem value={-1} >--</MenuItem>)
                                {teacherList.map((row, index) =>
                                    <MenuItem value={index} key={index}>{row.name}</MenuItem>)}
                            </Select>
                        </FormControl>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Hủy</Button>
                    <Button autoFocus onClick={handleSave}>
                        Cập nhật
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default ScheduleEditLesson;