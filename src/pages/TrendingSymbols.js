import {getTrendingStocks} from "../api/symbolClient";
import {Box, CircularProgress, Grid} from "@mui/material";
import SymbolCard from "../body/common-symbol/symbols/trending/SymbolCard";
import {useQuery} from "react-query";
import SearchField from "../components/search/SearchField";


const TrendingSymbols = () => {

    const fetchInterval = 5000

    const fetchTrendingSymbols = async () => {
        const response = await getTrendingStocks();
        return response.data;
    }

    const {isLoading, error, data} = useQuery("getTrendingSymbols", fetchTrendingSymbols,
        {refetchInterval: fetchInterval})

    if (isLoading) return <CircularProgress/>

    if (error) return `Error! ${error}`;

    return (
        <div id="trendingSymbols">
            <SearchField/>
            <Box sx={{width: "70%"}}>
                <Grid container rowSpacing={1} columnSpacing={1}>
                    {data.map((symbol) =>
                        <Grid key={symbol.symbol} item md={6} sm={12}>
                            <SymbolCard symbol={symbol}/>
                        </Grid>
                    )}
                </Grid>
            </Box>
        </div>
    );
}

export default TrendingSymbols;