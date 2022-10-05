import PropTypes from 'prop-types';

// material-ui
import { styled } from '@mui/material/styles';
import {
    Box, List, Badge, Typography
}
    from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import TotalIncomeCard from 'ui-component/cards/Skeleton/TotalIncomeCard';

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));

// styles
const CardWrapper = styled(MainCard)(({ theme }) => ({
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.light,
    overflow: 'hidden',
    position: 'relative',
    '&:after': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: `linear-gradient(210.04deg, ${theme.palette.primary[200]} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
        borderRadius: '50%',
        top: -30,
        right: -180
    },
    '&:before': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: `linear-gradient(140.9deg, ${theme.palette.primary[200]} -14.02%, rgba(144, 202, 249, 0) 77.58%)`,
        borderRadius: '50%',
        top: -160,
        right: -130
    }
}));

const AnimateText = styled(Typography)(({ theme }) => ({
    animation: 'tiptak 1s infinite linear',
    '@keyframes tiptak': {
        '0%': {
            color: theme.palette.grey[50]
        },
        '25%': {
            color: theme.palette.warning.dark
        },
        '75%': {
            color: theme.palette.success.main
        },
        '100%': {
            color: theme.palette.grey[50]
        },
    },
}));

// ==============================|| DASHBOARD - TOTAL INCOME DARK CARD ||============================== //

const LabelCard = ({ isLoading, classroomName }) => {

    return (
        <>
            {isLoading ? (
                <TotalIncomeCard />
            ) : (
                <CardWrapper border={false} content={false}>
                    <Box sx={{ p: 2 }}>
                        <List sx={{ py: 0, display: "flex", justifyContent: "space-between" }}>
                            <Typography variant="h2" sx={{ color: '#fff' }}>
                                Lớp {classroomName}
                            </Typography>
                            <StyledBadge
                                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                                variant="dot"
                            >
                                <a href='https://meet.google.com/tcq-nhir-zyg' target="_blank">
                                    <AnimateText>
                                        Môn Toán đang diễn ra ...
                                    </AnimateText>
                                </a>
                            </StyledBadge>
                        </List>
                    </Box>
                </CardWrapper>
            )}
        </>
    );
};

LabelCard.propTypes = {
    isLoading: PropTypes.bool
};

export default LabelCard;
