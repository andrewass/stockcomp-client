import DetailBlock from "../body/common-symbol/symbol/details/DetailBlock";
import {SymbolRightMenu} from "../components/symbol/SymbolRightMenu";
import {Box, CircularProgress, useMediaQuery} from "@mui/material";
import SearchField from "../body/common-symbol/search/SearchField";
import {useTheme} from "@mui/material/styles";
import {getStockSymbolInformation} from "../service/symbolService";
import {useParams} from "react-router-dom";
import {useQuery} from "react-query";

const Symbol = () => {
    const theme = useTheme();
    const isLargeWidth = useMediaQuery(theme.breakpoints.up("lg"));
    const {symbol} = useParams();

    const fetchStockSymbolInformation = () => {
        return getStockSymbolInformation(symbol);
    }

    const {isLoading, data: symbolDetails, error} =
        useQuery("getStockSymbolInformation", fetchStockSymbolInformation);

    if (isLoading) return <CircularProgress/>;

    if (error) return `Error! ${error}`;

    const {stockQuote} = symbolDetails;

    return (
        <div id="symbolPage">
            <SearchField/>
            <Box id="symbolBody"
                 sx={{
                     mt: "3%", display: "flex", justifyContent: "center",
                     flexFlow: isLargeWidth ? "row nowrap" : "column nowrap"
                 }}>
                <DetailBlock isLargeWidth={isLargeWidth} symbolDetails={symbolDetails}/>
                <SymbolRightMenu symbol={symbol} stockQuote={stockQuote} isLargeWidth={isLargeWidth}/>
            </Box>
        </div>
    );
}

export default Symbol;