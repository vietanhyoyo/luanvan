import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Avatar, Button, CardActions, CardContent,
    Divider, Grid, Menu, MenuItem, Typography, Box
} from '@mui/material';

// project imports
import BajajAreaChartCard from './BajajAreaChartCard';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { gridSpacing } from 'store/constant';
import TeacherService from 'services/objects/teacher.service';
// assets
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';

// ==============================|| DASHBOARD DEFAULT - POPULAR CARD ||============================== //
const teacherService = new TeacherService();
const baseUrl = process.env.REACT_APP_BASE_URL

const PopularCard = ({ isLoading }) => {
    const theme = useTheme();

    const [anchorEl, setAnchorEl] = useState(null);
    const [teachers, setTeachers] = useState([])
    const [rowIndex, setRowIndex] = useState(7);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const getAllTeacher = async () => {
        try {
            const result = await teacherService.getAll();
            console.log(result);
            setTeachers(result.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getAllTeacher();
    }, [])

    const renderTeacher = () => {
        let arr = [];
        for (let i = 0; i <= rowIndex; i++) {
            const row = teachers[i]
            arr.push(row);
        }
        return arr;
    }

    return (
        <>
            {(isLoading || teachers.length === 0) ? (
                <SkeletonPopularCard />
            ) : (
                <MainCard content={false}>
                    <CardContent>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12}>
                                <Grid container alignContent="center" justifyContent="space-between">
                                    <Grid item>
                                        <Typography variant="h4">Các giáo viên</Typography>
                                    </Grid>
                                    <Grid item>
                                        <MoreHorizOutlinedIcon
                                            fontSize="small"
                                            sx={{
                                                color: theme.palette.primary[200],
                                                cursor: 'pointer'
                                            }}
                                            aria-controls="menu-popular-card"
                                            aria-haspopup="true"
                                            onClick={handleClick}
                                        />
                                        <Menu
                                            id="menu-popular-card"
                                            anchorEl={anchorEl}
                                            keepMounted
                                            open={Boolean(anchorEl)}
                                            onClose={handleClose}
                                            variant="selectedMenu"
                                            anchorOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'right'
                                            }}
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right'
                                            }}
                                        >
                                            <MenuItem onClick={handleClose}> Today</MenuItem>
                                            <MenuItem onClick={handleClose}> This Month</MenuItem>
                                            <MenuItem onClick={handleClose}> This Year </MenuItem>
                                        </Menu>
                                    </Grid>
                                </Grid>
                            </Grid>
                            {/* <Grid item xs={12} sx={{ pt: '16px !important' }}>
                                <BajajAreaChartCard />
                            </Grid> */}
                            <Grid item xs={12}>
                                {
                                    renderTeacher().map((row, index) => (
                                        <Box key={index}>
                                            <Grid container direction="column">
                                                <Grid item>
                                                    <Grid container alignItems="center" justifyContent="space-between">
                                                        <Grid item display={'flex'}>
                                                            {teachers[index].account.avatar ? <Avatar
                                                                alt="profile"
                                                                src={baseUrl + "/image/" + teachers[index].account.avatar}
                                                                sx={{ width: 28, height: 28, marginRight: 1 }}
                                                            /> : <Avatar
                                                                alt="profile"
                                                                label='T'
                                                                sx={{ width: 28, height: 28, marginRight: 1 }}
                                                            />}
                                                            <Typography variant="subtitle1" color="inherit">
                                                                {teachers[index].name}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item>
                                                            <Grid container alignItems="center" justifyContent="space-between">
                                                                {
                                                                    <Grid item>
                                                                        <Typography
                                                                            variant="subtitle1"
                                                                            color={teachers[index].sex === 'nam' ? 'primary' : 'secondary'}
                                                                        >
                                                                            {teachers[index].sex}
                                                                        </Typography>
                                                                    </Grid>
                                                                }
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Divider sx={{ my: 1.5 }} />
                                        </Box>
                                    ))
                                }
                            </Grid>
                        </Grid>
                    </CardContent>
                    <CardActions sx={{ p: 1.25, pt: 0, justifyContent: 'center' }}>
                        <Button size="small" disableElevation>
                            View All
                            <ChevronRightOutlinedIcon />
                        </Button>
                    </CardActions>
                </MainCard>
            )}
        </>
    );
};

PopularCard.propTypes = {
    isLoading: PropTypes.bool
};

export default PopularCard;
