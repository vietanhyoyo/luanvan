// material-ui
import { Grid, TextField, Typography, Box } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
// material-ui
import { styled, useTheme } from '@mui/material/styles';
import ProfileAvatar from 'ui-component/ProfileAvatar';

import { gridSpacing } from 'store/constant';

// ==============================|| SAMPLE PAGE ||============================== //

const StudentProfile = () => (
    <Grid container spacing={gridSpacing} justifyContent="center">
        <Grid item lg={10} md={10} sm={12} xs={12}>
            <Grid container spacing={gridSpacing} justifyContent={"center"}>
                <Grid item lg={4} md={12} sm={12} xs={12}>
                    <Grid container spacing={gridSpacing}>
                        <Grid item sm={12} xs={12} md={12} lg={12}>
                            <MainCard>
                                <ProfileAvatar />
                            </MainCard>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item lg={8} md={12} sm={12} xs={12}>
                    <MainCard title="Thông tin cá nhân">
                        <Grid container spacing={1} justifyContent="center">
                            <Grid item sm={12} xs={12} md={12} lg={6} >
                                <Box width={"100%"} paddingRight={2} >
                                    <TextField sx={{ margin: 1, width: "100%" }}
                                        required
                                        id="outlined-required"
                                        label="Tên của bạn"
                                        variant="filled"
                                        defaultValue="Bùi Việt Anh"
                                    />
                                    <TextField
                                        sx={{ margin: 1, marginTop: 2, width: "100%" }}
                                        required
                                        id="outlined-required"
                                        label="Tên của bạn"
                                        variant="filled"
                                        defaultValue="Bùi Việt Anh"
                                    />
                                </Box>
                            </Grid>
                            <Grid item sm={12} xs={12} md={12} lg={6}>
                                <Box width={"100%"} >
                                    <TextField
                                        paddingRight={2}
                                        sx={{ margin: 1, width: "100%" }}
                                        required
                                        id="outlined-required"
                                        label="Tên của bạn"
                                        variant="filled"
                                        defaultValue="Hai ba bốn"
                                    />
                                </Box>
                            </Grid>
                        </Grid>
                    </MainCard>
                </Grid>
            </Grid>
        </Grid>
    </Grid>
);

export default StudentProfile;
