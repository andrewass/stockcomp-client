import {Link} from "@tanstack/react-router";
import {Button} from "@mui/material";
import {ReactNode} from "react";

interface Props {
    to: string
    text: string
    startIcon: ReactNode
}

export default function NavigationButton({to, text, startIcon}: Props) {
    return (
        <Button
            component={Link}
            to={to}
            startIcon={startIcon}
            size="large"
            sx={{color: "white"}}
        >
            {text}
        </Button>
    );
}
