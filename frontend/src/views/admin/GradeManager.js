
// material-ui
import { Typography, Grid, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import AddIcon from '@mui/icons-material/Add';
import ClassService from 'services/objects/class.service';
import GradeService from 'services/objects/grade.service';
import ChooseSubject from './teacher/ChooseSubject';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { useState, useEffect, forwardRef } from 'react';

import {
    Table, TableBody, TableCell, TableContainer, TextField, Box, Snackbar,
    TableHead, TableRow, Paper, Button, DialogContent, InputLabel,
    Dialog, DialogTitle, DialogActions, Select, MenuItem, FormControl
} from '@mui/material';

import MuiAlert from '@mui/material/Alert';

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const gradeService = new GradeService();

const GradeManager = () => {

    const [gradeList, setGradeList] = useState([]);
    const [selectGrade, setSelectGrade] = useState('');

    const getAPI = async () => {
        try {
            const result = await gradeService.getAll();
            setGradeList(result.data);
            console.log(result);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAPI();
    }, [])

    const handleClickGrade = (id) => {
        setSelectGrade(id);
        console.log(id);
    }

    const handleChangeSubject = async (array) => {
        try {
            const result = await gradeService.setSubjects(selectGrade, array);
            console.log(result.data);
        } catch (error) {
            console.log(error);
        }
    }

    return <MainCard title="Quản lý khối">
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Khối</TableCell>
                        <TableCell align="left">Các môn học chủ nhiệm</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {gradeList.length > 0 && gradeList.map((row, index) => (
                        <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="center" width={"30px"}>{row.name}</TableCell>
                            <TableCell align="left" onClick={() => handleClickGrade(row._id)}>
                                <ChooseSubject changeSubject={handleChangeSubject} subjectProps={row.subjects} />
                            </TableCell>
                        </TableRow>))
                    }
                </TableBody>
            </Table>
        </TableContainer>
    </MainCard>

};

export default GradeManager;