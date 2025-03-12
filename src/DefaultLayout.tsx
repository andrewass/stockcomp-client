import {Container} from "@mui/material";
import {ReactNode} from "react";


interface Props {
    children: ReactNode
}

export default function DefaultLayout({children}: Props) {
    return (
        <Container sx={{backgroundColor: "yellow", mt: "100px"}} maxWidth="xl">
            {children}
        </Container>
    );
}
