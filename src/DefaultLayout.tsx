import {Box, Container} from "@mui/material";
import {ReactNode} from "react";
import {DefaultNavigation} from "./navigation/default/DefaultNavigation";


interface Props {
    children: ReactNode
}

function DefaultLayout({children}: Props) {
    return (
        <Box>
            <DefaultNavigation/>
            <Container sx={{backgroundColor: "yellow", mt: "100px"}} maxWidth="xl">
                {children}
            </Container>
        </Box>
    );
}

export function withDefaultLayout(children: ReactNode) {
    return (
        <DefaultLayout children={children}/>
    );
}
