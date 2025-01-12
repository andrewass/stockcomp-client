import {SymbolsRightMenu} from "./right/SymbolsRightMenu";
import {Box} from "@mui/material";
import React from "react";
import SearchField from "../../search/SearchField";
import SplitScreen from "../../components/SplitScreen";
import SymbolGrid from "./left/SymbolGrid";


const TrendingSymbolsPage = () => {

    return (
        <Box>
            <SearchField/>
            <SplitScreen
                left={<SymbolGrid/>}
                right={<SymbolsRightMenu/>}
                leftWeight={1}
                rightWeight={1}
            />
        </Box>
    );
}

export default TrendingSymbolsPage;