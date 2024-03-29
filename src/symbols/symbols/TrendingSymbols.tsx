import {Box, CircularProgress, Grid, useMediaQuery} from "@mui/material";
import SymbolCard from "./SymbolCard";
import {useQuery} from "@tanstack/react-query";
import {TrendingSymbolsRightMenu} from "../right-menu/TrendingSymbolsRightMenu";
import {useTheme} from "@mui/material/styles";
import {useApiWrapper} from "../../config/useApiWrapper";
import {GET_PRICE_TRENDING_SYMBOLS, getTrendingSymbolsPriceConfig} from "../api/symbolsApi";
import ErrorComponent from "../../error/ErrorComponent";
import SearchField from "../../search/SearchField";
import {StockPrice} from "../../stock/stockTypes";


const TrendingSymbols = () => {
    const theme = useTheme()
    const isLargeWidth = useMediaQuery(theme.breakpoints.up("lg"))
    const {apiGet} = useApiWrapper()

    const FETCH_QUOTE_INTERVAL = 5000

    const {isLoading, error, data: symbols} = useQuery<StockPrice[], Error>(
        [GET_PRICE_TRENDING_SYMBOLS],
        () => apiGet(getTrendingSymbolsPriceConfig()),
        {refetchInterval: FETCH_QUOTE_INTERVAL}
    );

    if (isLoading) return <CircularProgress/>

    if (error) {
        return <ErrorComponent errorMessage={error.message as string}/>
    }

    return (
        <Box>
            <SearchField/>
            <Box sx={{
                m: "3% 5%", display: "flex", alignItems: "flex-start",
                flexFlow: isLargeWidth ? "row nowrap" : "column nowrap"
            }}>
                <Grid container rowSpacing={1} columnSpacing={1}>
                    {symbols!.map((symbol) =>
                        <Grid key={symbol.symbol} item md={6} sm={12}>
                            <SymbolCard stockQuote={symbol}/>
                        </Grid>
                    )}
                </Grid>
                <TrendingSymbolsRightMenu/>
            </Box>
        </Box>
    )
}

export default TrendingSymbols