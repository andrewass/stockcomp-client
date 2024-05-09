import {Box} from "@mui/material";
import UnregisteredContests from "./UnregisteredContests";
import RegisteredContests from "./RegisteredContests";

export const SymbolsRightMenu = () => {
    return (
        <Box>
            <UnregisteredContests/>
            <RegisteredContests/>
        </Box>
    )
}