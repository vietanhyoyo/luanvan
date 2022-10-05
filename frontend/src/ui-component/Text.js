import { Typography } from "@mui/material";
import { styled } from "@mui/system";

const Text = styled(Typography)(({ theme }) => ({
    color: theme.palette.grey[800]
}), {
    paddingTop: "4px",
    paddingBottom: "4px"
});

export default Text;