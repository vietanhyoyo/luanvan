import { Link as BlankLink } from "@mui/material";

const Link = ({ children, src }) => {

    return (
        <BlankLink href={src} underline="always" target="_blank">
            {children}
        </BlankLink>
    )
}

export default Link;