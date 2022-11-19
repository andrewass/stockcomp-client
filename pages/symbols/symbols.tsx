import {Box, CircularProgress, Grid, useMediaQuery} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {Stock} from "../../src/types/symbol";
import {getTrendingStocks} from "../../src/api/symbolClient";
import SearchField from "../../components/search/SearchField";
import {useQuery} from "react-query";
import {FETCH_QUOTE_INTERVAL} from "../../src/util/constants";
import ErrorComponent from "../../src/components/common/ErrorComponent";
import SymbolCard from "../../src/components/trendingsymbols/SymbolCard";
import {TrendingSymbolsRightMenu} from "../../src/components/trendingsymbols/TrendingSymbolsRightMenu";

const Symbols = () => {
    const theme = useTheme()
    const isLargeWidth = useMediaQuery(theme.breakpoints.up("lg"))

    const fetchTrendingSymbols = (): Promise<Stock[]> => {
        return getTrendingStocks()
    }

    const {isLoading, error, data: symbols} = useQuery("getTrendingSymbols", fetchTrendingSymbols,
        {refetchInterval: FETCH_QUOTE_INTERVAL})

    if (isLoading) return <CircularProgress/>

    if (error || !symbols) return <ErrorComponent errorMessage={error as string} />

    return (
        <Box>
            <SearchField/>
            <Box sx={{
                m: "3% 5%", display: "flex", alignItems: "flex-start",
                flexFlow: isLargeWidth ? "row nowrap" : "column nowrap"
            }}>
                <Grid container rowSpacing={1} columnSpacing={1}>
                    {symbols.map((symbol) =>
                        <Grid key={symbol.symbol} item md={6} sm={12}>
                            <SymbolCard stock={symbol}/>
                        </Grid>
                    )}
                </Grid>
                <TrendingSymbolsRightMenu/>
            </Box>
        </Box>
    )
}

export default Symbols