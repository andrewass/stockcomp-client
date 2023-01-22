import {Box, CircularProgress, Grid, useMediaQuery} from "@mui/material";
import SymbolCard from "./SymbolCard";
import {useQuery} from "react-query";
import SearchField from "../../components/search/SearchField";
import {TrendingSymbolsRightMenu} from "../right-menu/TrendingSymbolsRightMenu";
import {useTheme} from "@mui/material/styles";
import {FETCH_QUOTE_INTERVAL} from "../../util/constants";
import ErrorComponent from "../../components/common/ErrorComponent";
import {useApiWrapper} from "../../config/apiWrapper";
import {GET_TRENDING_SYMBOLS, getTrendingSymbolsConfig} from "../api/symbolsApi";
import {Stock} from "../symbolsTypes";


const TrendingSymbols = () => {
    const theme = useTheme()
    const isLargeWidth = useMediaQuery(theme.breakpoints.up("lg"))
    const {apiGet} = useApiWrapper()

    const {isLoading, error, data: symbols} = useQuery<Stock[]>(GET_TRENDING_SYMBOLS,
        () => apiGet(getTrendingSymbolsConfig()),
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

export default TrendingSymbols