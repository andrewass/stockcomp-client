import {getTrendingStocks} from "../../../../service/symbolService";
import {Box, CircularProgress, Grid} from "@mui/material";
import SymbolCard from "./SymbolCard";
import {useQuery} from "react-query";



export const TrendingSymbols = () => {

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
