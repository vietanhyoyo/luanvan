import PropTypes from 'prop-types';

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import TotalIncomeCard from 'ui-component/cards/Skeleton/TotalIncomeCard';

// assets
import StorefrontTwoToneIcon from '@mui/icons-material/StorefrontTwoTone';
import ClassService from 'services/objects/class.service';
import { useEffect, useState } from 'react';

const classService = new ClassService();

// styles
const CardWrapper = styled(MainCard)(({ theme }) => ({
    overflow: 'hidden',
    position: 'relative',
    '&:after': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: `linear-gradient(210.04deg, ${theme.palette.warning.dark} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
        borderRadius: '50%',
        top: -30,
        right: -180
    },
    '&:before': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: `linear-gradient(140.9deg, ${theme.palette.warning.dark} -14.02%, rgba(144, 202, 249, 0) 70.50%)`,
        borderRadius: '50%',
        top: -160,
        right: -130
    }
}));

// ==============================|| DASHBOARD - TOTAL INCOME LIGHT CARD ||============================== //

const ClassCard = ({ isLoading, classInCharge }) => {
    const theme = useTheme();
    const [teacher, setTeacher] = useState({
        name: ""
    });

    const getHomeroomTeacher = async () => {
        try {
            if (classInCharge._id) {
                const result = await classService.getHomeroomTeacherByClass(classInCharge._id);
                const doc = result.data;
                if (doc !== "") {
                    setTeacher(doc)
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getHomeroomTeacher();
    }, [])

    return (
        <>
            {isLoading ? (
                <TotalIncomeCard />
            ) : (
                <CardWrapper border={false} content={false}>
                    <Box sx={{ p: 2 }}>
                        <List sx={{ py: 0 }}>
                            <ListItem alignItems="center" disableGutters sx={{ py: 0 }}>
                                <ListItemText
                                    sx={{ py: 0, mt: 0.45, mb: 0.45 }}
                                    primary={<Typography variant="h2">Lớp {classInCharge.name}</Typography>}
                                    secondary={
                                        <Typography
                                            variant="subtile2"
                                            sx={{
                                                color: theme.palette.grey[500],
                                                mt: 0.5
                                            }}
                                        >
                                            GVCN: {teacher.name}
                                        </Typography>
                                    }
                                />
                            </ListItem>
                        </List>
                    </Box>
                </CardWrapper>
            )}
        </>
    );
};

ClassCard.propTypes = {
    isLoading: PropTypes.bool
};

export default ClassCard;
