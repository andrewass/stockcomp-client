import {createLink} from "@tanstack/react-router";
import {Link as MUILink} from "@mui/material";
import {Button} from "@mui/material";
import {ReactNode} from "react";

interface Props {
    to: string
    text: string
    startIcon: ReactNode
}

const CustomLink = createLink(MUILink);

export default function NavigationButton({to, text, startIcon}: Props) {
    return (
        <Button
            component={CustomLink}
            to={to}
            startIcon={startIcon}
            size="large"
            sx={{color: "white"}}
        >
            {text}
        </Button>
    );
}
