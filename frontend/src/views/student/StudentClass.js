// material-ui
import { Grid, Typography, Box } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import LabelCard from 'ui-component/class/LabelCard'
import Schedule from './student-home/Schedule';
import New from './student-home/New'
// material-ui
import { styled, useTheme } from '@mui/material/styles';

import { gridSpacing } from 'store/constant';
import Content from './student-class/Content';
import { useState, useEffect } from 'react';
import StudentService from 'services/objects/student.service';
import ClassContentService from 'services/objects/classContent.service';
import LeftCard from './student-card/LeftCard';
import InforCard from './student-card/InforCard';

// ==============================|| SAMPLE PAGE ||============================== //

// styles
const HiddenMiddle = styled('main')(({ theme }) => ({
    [theme.breakpoints.down('md')]: {
        display: 'none'
    }
}));

const studentService = new StudentService();
const classContentService = new ClassContentService();

const StudentClass = () => {

    const [loading, setLoading] = useState(true);
    const [classContents, setClassContents] = useState([])
    const [student, setStudent] = useState({});

    const getClassContentList = async () => {
        try {
            const result = await classContentService.getALL(student.class._id);
            setClassContents(result.data)
        } catch (error) {
            console.log(error);
        }
    }

    const getStudent = async () => {
        try {
            const result = await studentService.getStudentInformation();
            setStudent(result.data);
            setLoading(false);
            console.log(result);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (loading)
            getStudent();
        else {
            getClassContentList();
        }
    }, [loading])

    console.log(student)

    return (
        <Grid container spacing={gridSpacing} >
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing} display='flex' justifyContent='center'>
                    <Grid item lg={8} md={8} sm={12} xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item sm={12} xs={12} md={12} lg={12}>
                                <MainCard title={
                                    <Box sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        width: "100%"
                                    }}>
                                        <Typography variant="h3">Lớp học {student.class ? student.class.name : " "}</Typography>
                                    </Box>
                                }>
                                    {classContents.length === 0
                                        ? <p>Chưa có nội dung</p>
                                        : classContents.map((row, index) =>
                                            <Content
                                                key={index}
                                                contentId={row._id}
                                                reLoadAPI={getClassContentList}
                                            />
                                        )}
                                </MainCard>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item lg={4} md={4} sm={12} xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item sm={12} xs={12} md={12} lg={12}>
                                <LeftCard />
                            </Grid>
                            <Grid item sm={12} xs={12} md={12} lg={12}>
                                <InforCard />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
};

export default StudentClass;
