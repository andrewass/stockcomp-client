import {createLink} from "@tanstack/react-router";
import {Button, Link as MUILink} from "@mui/material";
import {ReactNode} from "react";
import {useThemeContext} from "../theme/AppThemeContext";

interface Props {
    to: string
    text: string
    startIcon: ReactNode
}

const CustomLink = createLink(MUILink);

export default function NavigationButton({to, text, startIcon}: Props) {
    const {appTheme} = useThemeContext();

    return (
        <Button
            component={CustomLink}
            to={to}
            startIcon={startIcon}
            size="large"
            sx={{color: appTheme.palette.primary.contrastText}}
        >
            {text}
        </Button>
    );
}
