import DetailBlock from "./details/DetailBlock";
import {SymbolRightMenu} from "./right-menu/SymbolRightMenu";
import {Box, CircularProgress, useMediaQuery} from "@mui/material";
import SearchField from "../search/SearchField";
import {useTheme} from "@mui/material/styles";
import {useGetStockSymbolInformation} from "../../../service/symbolService";
import {useParams} from "react-router-dom";

const Symbol = () => {
    const theme = useTheme();
    const isLargeWidth = useMediaQuery(theme.breakpoints.up("lg"));
    const {symbol} = useParams();

    const {isLoading, error, data} = useGetStockSymbolInformation(symbol);

    if (isLoading) return <CircularProgress/>;

    if (error) return `Error! ${error}`;

    const {stockQuote} = data.stockSymbolInformation;

    return (
        <div id="symbolPage">
            <SearchField/>
            <Box id="symbolBody"
                 sx={{
                     mt: "3%", display: "flex", justifyContent: "center", alignItems: "center",
                     flexFlow: isLargeWidth ? "row nowrap" : "column nowrap"
                 }}>
                <DetailBlock isLargeWidth={isLargeWidth} symbolDetails={data.stockSymbolInformation}/>
                <SymbolRightMenu symbol={symbol} stockQuote={stockQuote} isLargeWidth={isLargeWidth}/>
            </Box>
        </div>
    );
}

export default Symbol;