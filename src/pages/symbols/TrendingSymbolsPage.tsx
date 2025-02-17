import {SymbolsRightMenu} from "./right/SymbolsRightMenu";
import {Box, Stack} from "@mui/material";
import React from "react";
import SearchField from "../../search/SearchField";
import SymbolGrid from "./left/SymbolGrid";


const TrendingSymbolsPage = () => {

    return (
        <Stack direction="column" gap={4}>
            <SearchField/>
            <Stack direction="row" gap={8}>
                <Box width="70%">
                    <SymbolGrid/>
                </Box>
                <Box width="30%">
                    <SymbolsRightMenu/>
                </Box>
            </Stack>
        </Stack>
    );
}

export default TrendingSymbolsPage;