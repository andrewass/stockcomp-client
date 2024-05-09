import {Box, CircularProgress, Grid, useMediaQuery} from "@mui/material";
import SymbolCard from "./SymbolCard";
import {useQuery} from "@tanstack/react-query";
import {useTheme} from "@mui/material/styles";
import {useApiWrapper} from "../config/useApiWrapper";
import {StockPrice} from "../stock/stockTypes";
import {GET_PRICE_TRENDING_SYMBOLS, getTrendingSymbolsPriceConfig} from "./api/symbolsApi";
import ErrorComponent from "../error/ErrorComponent";
import SearchField from "../search/SearchField";
import {SymbolsRightMenu} from "./right-menu/SymbolsRightMenu";


const TrendingSymbolsPage = () => {
    const theme = useTheme();
    const isLargeWidth = useMediaQuery(theme.breakpoints.up("lg"));
    const {apiGet} = useApiWrapper();

    const FETCH_QUOTE_INTERVAL = 5000

    const {isError, isPending, error, data} = useQuery<StockPrice[]>({
        queryKey: [GET_PRICE_TRENDING_SYMBOLS],
        queryFn: () => apiGet(getTrendingSymbolsPriceConfig()),
        refetchInterval: FETCH_QUOTE_INTERVAL,
    });

    if (isPending) return <CircularProgress/>

    if (isError) {
        return <ErrorComponent errorMessage={error.message}/>
    }

    return (
        <Box>
            <SearchField/>
            <Box sx={{
                m: "3% 5%", display: "flex", alignItems: "flex-start",
                flexFlow: isLargeWidth ? "row nowrap" : "column nowrap"
            }}>
                <Grid container rowSpacing={1} columnSpacing={1}>
                    {data.map((symbol) =>
                        <Grid item key={symbol.symbol} md={6} sm={12}>
                            <SymbolCard stockQuote={symbol}/>
                        </Grid>
                    )}
                </Grid>
                <SymbolsRightMenu/>
            </Box>
        </Box>
    );
}

export default TrendingSymbolsPage;