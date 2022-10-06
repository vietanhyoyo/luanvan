
import { useTheme, styled } from "@mui/material/styles"
import { Box, Typography } from "@mui/material";
import ListContainer from "./ListContainer";
import Text from "ui-component/Text";
import Link from "ui-component/Link";

const Content = () => {

    const theme = useTheme();

    const topStyle = {
        display: "flex",
        width: "100%",
        justifyContent: "space-between",
        borderBottom: "1px solid",
        borderColor: theme.palette.grey[200],
        paddingBottom: "0px"
    }

    const contentStyle = {
        marginTop: "10px",
        paddingRight: "0px",
        paddingLeft: "0px"
    }

    const titleStyle = {
        borderLeft: "2px solid",
        borderColor: theme.palette.primary.main,
        paddingLeft: "16px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        paddingBottom: "10px",
        paddingTop: "10px"
    }

    return (
        <>
            <Box marginBottom={"16px"}>
                <Box sx={topStyle}>
                    <Typography sx={titleStyle} variant="h5">Tiêu đề</Typography>
                    <Typography variant="caption" paddingTop="8px">03/04/2022</Typography>
                </Box>
                <Box sx={contentStyle}>
                    <Text>Ngày 10 các em được nghĩ không cần phải đến trường làm gì</Text>
                    <Text>Ngày 20 chúng ta có lịch hợp phụ huynh không cần đến trường mà hợp online
                        qua đường <Link src="https://mui.com/system/styled/#how-to-use-components-selector-api"> link </Link> cô đưa các em nhớ kêu phụ huynh vào đúng giờ và có mặt
                        đầy đủ nghe </Text>
                    <ListContainer
                        title={"Các video của tháng này"}
                        array={[
                            {text: "Video 1 môn Toán", type: "link", href: "#"},
                            {text: "Nhớ làm bài tập đầy đủ", type: "text", href: "#"}
                        ]}
                    />
                    <Text>Ngày 20 chúng ta có lịch hợp phụ huynh không cần đến trường mà hợp online
                        qua đường link cô đưa các em nhớ kêu phụ huynh vào đúng giờ và có mặt
                        đầy đủ nghe </Text>
                </Box>
            </Box>
        </>)
}

export default Content;