import {Box, CircularProgress, useMediaQuery} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {useParams} from "react-router-dom";
import {useQuery} from "react-query";
import DetailBlock from "./details/DetailBlock";
import {SymbolDetailsRightMenu} from "./right-menu/SymbolDetailsRightMenu";
import {GET_STOCK_SYMBOL_INFORMATION, getStockSymbolInformationConfig} from "./api/symbolDetailsApi";
import {useApiWrapper} from "../config/apiWrapper";
import SearchField from "../search/SearchField";
import ErrorComponent from "../error/ErrorComponent";
import {Stock} from "../stock/stockTypes";


const SymbolDetails = () => {
    const theme = useTheme();
    const isLargeWidth = useMediaQuery(theme.breakpoints.up("lg"));
    const {symbol} = useParams<{symbol: string}>();
    const {apiGet} = useApiWrapper();

    const {error, isLoading, data: symbolDetails} =
        useQuery<Stock>([GET_STOCK_SYMBOL_INFORMATION,symbol],
            () => apiGet(getStockSymbolInformationConfig(symbol as string)))

    if (isLoading) return <CircularProgress/>;

    if (error) return <ErrorComponent errorMessage={error as string} />;

    return (
        <>
            <SearchField/>
            <Box sx={{
                mt: "3%", display: "flex", justifyContent: "center",
                flexFlow: isLargeWidth ? "row nowrap" : "column nowrap"
            }}>
                <DetailBlock isLargeWidth={isLargeWidth} symbolDetails={symbolDetails!}/>
                <SymbolDetailsRightMenu stock={symbolDetails!} isLargeWidth={isLargeWidth}/>
            </Box>
        </>
    );
}

export default SymbolDetails