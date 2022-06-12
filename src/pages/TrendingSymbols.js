import {getTrendingStocks} from "../api/symbolClient";
import {Box, CircularProgress, Grid, useMediaQuery} from "@mui/material";
import SymbolCard from "../components/trendingsymbols/SymbolCard";
import {useQuery} from "react-query";
import SearchField from "../components/search/SearchField";
import {TrendingSymbolsRightMenu} from "../components/trendingsymbols/TrendingSymbolsRightMenu";
import {useTheme} from "@mui/material/styles";
import {FETCH_QUOTE_INTERVAL} from "../util/constants";


const TrendingSymbols = () => {
    const theme = useTheme();
    const isLargeWidth = useMediaQuery(theme.breakpoints.up("lg"));

    const fetchTrendingSymbols = async () => {
        const response = await getTrendingStocks();
        return response.data;
    }

    const {isLoading, error, data} = useQuery("getTrendingSymbols", fetchTrendingSymbols,
        {refetchInterval: FETCH_QUOTE_INTERVAL})

    if (isLoading) return <CircularProgress/>

    if (error) return `Error! ${error}`;

    return (
        <Box>
            <SearchField/>
            <Box sx={{
                m: "3% 5%", display: "flex", alignItems: "flex-start",
                flexFlow: isLargeWidth ? "row nowrap" : "column nowrap"
            }}>
                <Grid container rowSpacing={1} columnSpacing={1}>
                    {data.map((symbol) =>
                        <Grid key={symbol.symbol} item md={6} sm={12}>
                            <SymbolCard symbol={symbol}/>
                        </Grid>
                    )}
                </Grid>
                <TrendingSymbolsRightMenu/>
            </Box>
        </Box>
    );
}

export default TrendingSymbols;