import {TrendingSymbols} from "./trending/TrendingSymbols";
import "./symbols.css";
import {Box} from "@mui/material";
import SearchField from "../search/SearchField";
import {SymbolsRightMenu} from "./SymbolsRightMenu";


export const Symbols = () => {

    return (
        <Box id="symbolsPage">
            <SearchField/>
            <Box id="symbolsBody" sx={{display: "flex", flexFlow: "row nowrap", ml: "10%"}}>
                <TrendingSymbols/>
                <SymbolsRightMenu/>
            </Box>
        </Box>
    );
}