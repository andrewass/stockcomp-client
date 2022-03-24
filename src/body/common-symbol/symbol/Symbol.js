import DetailBlock from "./details/DetailBlock";
import {SymbolRightMenu} from "./right-menu/SymbolRightMenu";
import {Box, CircularProgress, useMediaQuery} from "@mui/material";
import SearchField from "../search/SearchField";
import {useTheme} from "@mui/material/styles";
import {getStockSymbolInformation} from "../../../service/symbolService";
import {useParams} from "react-router-dom";
import {useQuery} from "react-query";

const Symbol = () => {
    const theme = useTheme();
    const isLargeWidth = useMediaQuery(theme.breakpoints.up("lg"));
    const {symbol} = useParams();

    const fetchStockSymbolInformation = () => {
        return getStockSymbolInformation(symbol);
    }

    const {isLoading, data: stockSymbolInformation, error} =
        useQuery("getStockSymbolInformation", fetchStockSymbolInformation);

    if (isLoading) return <CircularProgress/>;

    if (error) return `Error! ${error}`;

    const {stockQuote} = stockSymbolInformation;

    return (
        <div id="symbolPage">
            <SearchField/>
            <Box id="symbolBody"
                 sx={{
                     mt: "3%", display: "flex", justifyContent: "center",
                     flexFlow: isLargeWidth ? "row nowrap" : "column nowrap"
                 }}>
                <DetailBlock isLargeWidth={isLargeWidth} symbolDetails={stockSymbolInformation}/>
                <SymbolRightMenu symbol={symbol} stockQuote={stockQuote} isLargeWidth={isLargeWidth}/>
            </Box>
        </div>
    );
}

export default Symbol;