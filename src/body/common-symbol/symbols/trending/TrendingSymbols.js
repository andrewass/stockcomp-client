import React, {useEffect, useState} from "react";
import SymbolPresentation from "../../SymbolPresentation";
import {getTrendingStocks} from "../../../../service/symbolService";
import {Box, CircularProgress, Grid} from "@mui/material";

const TrendingSymbols = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [trendingSymbols, setTrendingSymbols] = useState([]);

    const getTrendingSymbols = async () => {
        const trendingSymbolsResponse = await getTrendingStocks();
        setTrendingSymbols(trendingSymbolsResponse.data);
        setIsLoading(false);
    }

    useEffect(() => {
        getTrendingSymbols().catch(error => console.log(error));
    }, []);

    if (isLoading) {
        return <CircularProgress/>
    }

    return (
        <Box sx={{width: "70%"}}>
            <Grid container rowSpacing={1} columnSpacing={1}>
                {trendingSymbols.map((symbol) =>
                    <Grid key={symbol.symbol} item md={6} sm={12}>
                        <SymbolPresentation  symbol={symbol}/>
                    </Grid>
                )}
            </Grid>
        </Box>
    );
}

export default TrendingSymbols;
