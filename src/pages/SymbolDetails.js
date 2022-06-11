import DetailBlock from "../components/symboldetails/DetailBlock";
import {SymbolDetailsRightMenu} from "../components/symboldetails/SymbolDetailsRightMenu";
import {Box, CircularProgress, useMediaQuery} from "@mui/material";
import SearchField from "../components/search/SearchField";
import {useTheme} from "@mui/material/styles";
import {getStockSymbolInformation} from "../api/symbolClient";
import {useParams} from "react-router-dom";
import {useQuery} from "react-query";

const SymbolDetails = () => {
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
            <Box sx={{
                mt: "3%", display: "flex", justifyContent: "center",
                flexFlow: isLargeWidth ? "row nowrap" : "column nowrap"
            }}>
                <DetailBlock isLargeWidth={isLargeWidth} symbolDetails={symbolDetails}/>
                <SymbolDetailsRightMenu symbol={symbol} stockQuote={stockQuote} isLargeWidth={isLargeWidth}/>
            </Box>
        </div>
    );
}

export default SymbolDetails;