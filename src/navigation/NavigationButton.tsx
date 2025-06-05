import {Link} from "@tanstack/react-router";
import {Button} from "@mui/material";

interface Props {
    to: string
    buttonText: string
}

export default function NavigationButton({to, buttonText}: Props) {
    return (
        <Button
            component={Link}
            to={to}
        >
            {buttonText}
        </Button>
    );
}
