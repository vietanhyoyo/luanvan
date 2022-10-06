import { Box } from "@mui/material";
import Text from "ui-component/Text";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { styled } from "@mui/system";
import { useState } from "react";
import Crop75Icon from '@mui/icons-material/Crop75';
import Link from "ui-component/Link";

const ComboBox = styled(Box)({
    display: "flex",
    cursor: "pointer"
})

const ListContainer = ({ title, array }) => {

    const [show, setShow] = useState(true);

    const rotate = show ? 90 : 0;
    const visibility = show ? "block" : "none"

    const iconStyle = {
        transition: "all 0.1s ease-out",
        transform: `rotate(${rotate}deg)`
    }

    const clickComboBox = () => {
        setShow(!show);
    }

    const listStyle = {
        transition: "all 0.1s ease-out",
        paddingLeft: "16px",
        display: visibility
    }

    return (<Box>
        <ComboBox onClick={clickComboBox}>
            <ArrowDropUpIcon sx={iconStyle} />
            <Text>
                {title}
            </Text>
        </ComboBox>
        <Box sx={listStyle} >
            {array.map((item, index) => {
                if (item.type === "link")
                    return (
                        <Box display="flex" key={index}>
                            <Crop75Icon sx={{ width: "14px", marginRight: "10px" }} />
                            <Text>
                                <Link src={item.href}>{item.text}</Link>
                            </Text>
                        </Box>
                    )
                else
                    return (
                        <Box display="flex" key={index}>
                            <Crop75Icon sx={{ width: "14px", marginRight: "10px" }} />
                            <Text>
                                {item.text}
                            </Text>
                        </Box>
                    )
            })}
        </Box>
    </Box>)
}

export default ListContainer;