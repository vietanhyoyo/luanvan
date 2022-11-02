import {
    Button, Dialog, DialogTitle, DialogContent, DialogActions,
    TextField, Box, FormControl, RadioGroup, FormControlLabel,
    Radio
} from '@mui/material';
import { IconPlus } from '@tabler/icons';
import { useState } from 'react'
import QuestionService from 'services/objects/question.service';
import { useParams } from 'react-router-dom';

const questionService = new QuestionService();

const AddNewTest = (props) => {

    const [open, setOpen] = useState(false);
    const [question, setQuestion] = useState({
        question: '',
        correct: '',
        A: '',
        B: '',
        C: '',
    });
    const { id } = useParams();

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    }

    const save = async () => {
        try {
            const result = await questionService.add({
                ...question,
                lesson: id
            });
            handleClose();
            props.getAPI();
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = () => {
        if (validate())
            save();
        else {
            alert('Bạn chưa nhập đủ thông tin.')
        }
    }

    const handleChange = (e) => {
        setQuestion(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const validate = () => {
        let bool = true;
        if (question.question.length === 0) bool = false;
        if (question.correct.length === 0) bool = false;
        if (question.A.length === 0) bool = false;
        if (question.B.length === 0) bool = false;
        if (question.C.length === 0) bool = false;
        return bool;
    }

    return <>
        <Button
            startIcon={<IconPlus />}
            onClick={handleOpen}
        >Thêm câu hỏi trắc nghiệm</Button>
        <Dialog
            open={open}
            onClose={handleClose}
        >
            <DialogTitle>
                {"Thêm câu hỏi"}
            </DialogTitle>
            <DialogContent>
                <Box sx={{ width: 400, paddingTop: 3 }}>
                    <TextField
                        name="question"
                        label="Nội dung câu hỏi"
                        placeholder="Hãy nhập câu hỏi"
                        onChange={handleChange}
                        multiline
                        rows={4}
                        sx={{ width: '100%' }}
                    />
                    <FormControl
                        sx={{ paddingTop: 1, width: '100%' }}
                    >
                        <RadioGroup
                            name="correct"
                            onChange={handleChange}
                        >
                            <Box sx={{ width: '100%', display: 'flex', paddingTop: 1 }}>
                                <FormControlLabel value="A" control={<Radio />} label="A" />
                                <TextField
                                    name='A'
                                    sx={{ flex: 1 }}
                                    multiline rows={3}
                                    onChange={handleChange}
                                ></TextField>
                            </Box>
                            <Box sx={{ width: '100%', display: 'flex', paddingTop: 1 }}>
                                <FormControlLabel value="B" control={<Radio />} label="B" />
                                <TextField
                                    name='B'
                                    sx={{ flex: 1 }}
                                    multiline rows={3}
                                    onChange={handleChange}
                                ></TextField>
                            </Box>
                            <Box sx={{ width: '100%', display: 'flex', paddingTop: 1 }}>
                                <FormControlLabel value="C" control={<Radio />} label="C" />
                                <TextField
                                    name='C'
                                    sx={{ flex: 1 }}
                                    multiline
                                    rows={3}
                                    onChange={handleChange}
                                ></TextField>
                            </Box>
                        </RadioGroup>
                    </FormControl>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Hủy</Button>
                <Button autoFocus onClick={handleSubmit}>
                    Thêm
                </Button>
            </DialogActions>
        </Dialog>
    </>
}

export default AddNewTest;