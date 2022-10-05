// material-ui
import { Grid, TextField, Typography, Box, Button } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
// material-ui
import { styled, useTheme } from '@mui/material/styles';
import ProfileAvatar from 'ui-component/ProfileAvatar';

import { gridSpacing } from 'store/constant';

// ==============================|| SAMPLE PAGE ||============================== //

const AdminProfile = () => (
    <Grid container spacing={gridSpacing} justifyContent="center">
        <Grid item xs={12}>
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
                    <Grid container spacing={3} justifyContent="center">
                        <Grid item xs={12}>
                            <MainCard title="Thông tin cá nhân">
                                <Grid container spacing={1} justifyContent="center">
                                    <Grid item sm={12} xs={12} md={12} lg={6} >
                                        <Box width={"100%"} paddingRight={2} >
                                            <TextField sx={{ margin: 1, width: "100%" }}
                                                id="outlined-required"
                                                label="Tên của bạn"
                                                variant="filled"
                                                defaultValue="Bùi Việt Anh"
                                            />
                                            <TextField
                                                sx={{ margin: 1, marginTop: 2, width: "100%" }}
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
                        <Grid item xs={12}>
                            <MainCard title="Đổi mật khẩu">
                                <Box width={"100%"} paddingRight={2} >
                                    <TextField sx={{ margin: 1, width: "100%" }}
                                        id="outlined-required"
                                        label="Mật khẩu cũ"
                                        variant="filled"
                                        defaultValue=""
                                        type={"password"}
                                    />
                                    <TextField
                                        sx={{ margin: 1, marginTop: 2, width: "100%" }}
                                        id="outlined-required"
                                        label="Mật khẩu mới"
                                        variant="filled"
                                        defaultValue=""
                                        type={"password"}
                                    />
                                    <TextField
                                        sx={{ margin: 1, marginTop: 2, width: "100%" }}
                                        id="outlined-required"
                                        label="Nhập lại mật khẩu mới"
                                        variant="filled"
                                        defaultValue=""
                                        type={"password"}
                                    />
                                    <Box
                                        sx={{
                                            width: "100%",
                                            display: "flex",
                                            justifyContent: "center",
                                            paddingTop: 3
                                        }}

                                    >
                                        <Button variant={"contained"}>
                                            Cập nhật mật khẩu mới
                                        </Button>
                                    </Box>
                                </Box>
                            </MainCard>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </Grid>
);

export default AdminProfile;
