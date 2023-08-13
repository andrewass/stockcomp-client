import {Box, CircularProgress, useMediaQuery} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import DetailBlock from "./details/DetailBlock";
import {SymbolDetailsRightMenu} from "./right-menu/SymbolDetailsRightMenu";
import {
    GET_STOCK_SYMBOL_FINANCIALS,
    GET_STOCK_SYMBOL_PRICE,
    getStockSymbolFinancialsConfig, getStockSymbolPriceConfig
} from "./api/symbolDetailsApi";
import {useApiWrapper} from "../config/useApiWrapper";
import SearchField from "../search/SearchField";
import ErrorComponent from "../error/ErrorComponent";
import {StockFinancials, StockPrice} from "../stock/stockTypes";


const SymbolDetails = () => {
    const theme = useTheme();
    const isLargeWidth = useMediaQuery(theme.breakpoints.up("lg"));
    const {symbol} = useParams<{ symbol: string }>();
    const {apiGet} = useApiWrapper();

    const {error: financialsError, isLoading: financialsLoading, data: stockFinancials} =
        useQuery<StockFinancials>(
            [GET_STOCK_SYMBOL_FINANCIALS, symbol],
            () => apiGet(getStockSymbolFinancialsConfig(symbol as string))
        );

    const {error: priceError, isLoading: priceLoading, data: stockPrice} =
        useQuery<StockPrice>(
            [GET_STOCK_SYMBOL_PRICE, symbol],
            () => apiGet(getStockSymbolPriceConfig(symbol as string))
        );

    if (financialsLoading || priceLoading) return <CircularProgress/>;

    if (financialsError || priceError) return <ErrorComponent
        errorMessage={financialsError ? financialsError as string : priceError as string}
    />;

    return (
        <>
            <SearchField/>
            <Box sx={{
                mt: "3%", display: "flex", justifyContent: "center",
                flexFlow: isLargeWidth ? "row nowrap" : "column nowrap"
            }}>
                <DetailBlock isLargeWidth={isLargeWidth} stockFinancials={stockFinancials!} stockPrice={stockPrice!}/>
                <SymbolDetailsRightMenu stockPrice={stockPrice!} isLargeWidth={isLargeWidth}/>
            </Box>
        </>
    );
}

export default SymbolDetails