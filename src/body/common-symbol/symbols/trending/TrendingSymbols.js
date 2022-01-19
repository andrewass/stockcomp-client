import {getTrendingStocks} from "../../../../service/symbolService";
import {Box, CircularProgress, Grid} from "@mui/material";
import SymbolCard from "./SymbolCard";
import {useQuery} from "react-query";


const fetchTrendingSymbols = async () => {
    const response = await getTrendingStocks();
    return response.data;
}

export const TrendingSymbols = () => {

    const {isLoading, error, data} = useQuery("trendingSymbols", fetchTrendingSymbols)

    if (isLoading) return <CircularProgress/>

    if (error) return `Error! ${error}`;

    return (
        <Box sx={{width: "70%"}}>
            <Grid container rowSpacing={1} columnSpacing={1}>
                {data.map((symbol) =>
                    <Grid key={symbol.symbol} item md={6} sm={12}>
                        <SymbolCard symbol={symbol}/>
                    </Grid>
                )}
            </Grid>
        </Box>
    );
}
