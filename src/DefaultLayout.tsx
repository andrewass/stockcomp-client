import {Box, Container} from "@mui/material";
import {ReactNode} from "react";
import {DefaultNavigation} from "./navigation/default/DefaultNavigation";


interface Props {
    children: ReactNode
}

export function DefaultLayout({children}: Props) {
    return (
        <Box>
            <DefaultNavigation/>
            <Container sx={{backgroundColor: "yellow", mt: "100px"}} maxWidth="xl">
                {children}
            </Container>
        </Box>
    );
}
