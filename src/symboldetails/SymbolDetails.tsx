import {Box, CircularProgress, useMediaQuery} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import DetailBlock from "./details/DetailBlock";
import {SymbolDetailsRightMenu} from "./right-menu/SymbolDetailsRightMenu";
import {GET_STOCK_SYMBOL_PRICE, getStockSymbolPriceConfig} from "./api/symbolDetailsApi";
import {useApiWrapper} from "../config/useApiWrapper";
import SearchField from "../search/SearchField";
import ErrorComponent from "../error/ErrorComponent";
import {StockPrice} from "../stock/stockTypes";


const SymbolDetails = () => {
    const theme = useTheme();
    const isLargeWidth = useMediaQuery(theme.breakpoints.up("lg"));
    const {symbol} = useParams<{ symbol: string }>();
    const {apiGet} = useApiWrapper();

    const {error: priceError, isLoading: priceLoading, data: stockPrice} =
        useQuery<StockPrice>(
            [GET_STOCK_SYMBOL_PRICE, symbol],
            () => apiGet(getStockSymbolPriceConfig(symbol as string))
        );

    if (priceLoading) return <CircularProgress/>;

    if (priceError) return <ErrorComponent errorMessage={priceError as string}/>;

    return (
        <>
            <SearchField/>
            <Box sx={{
                mt: "3%", display: "flex", justifyContent: "center",
                flexFlow: isLargeWidth ? "row nowrap" : "column nowrap"
            }}>
                <DetailBlock isLargeWidth={isLargeWidth} stockPrice={stockPrice!} symbol={symbol!}/>
                <SymbolDetailsRightMenu stockPrice={stockPrice!} isLargeWidth={isLargeWidth}/>
            </Box>
        </>
    );
}

export default SymbolDetails