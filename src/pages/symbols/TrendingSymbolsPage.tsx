import {useQuery} from "@tanstack/react-query";
import {SymbolsRightMenu} from "./right-screen/SymbolsRightMenu";
import {Box, CircularProgress, Grid} from "@mui/material";
import {useApiWrapper} from "../../config/useApiWrapper";
import {GET_PRICE_TRENDING_SYMBOLS, getTrendingSymbolsPriceConfig} from "../../domain/symbols/symbolsApi";
import {StockPrice} from "../../stock/stockTypes";
import React from "react";
import ErrorComponent from "../../error/ErrorComponent";
import SearchField from "../../search/SearchField";
import SymbolCard from "./left-screen/SymbolCard";
import SplitScreen from "../../components/SplitScreen";

const FETCH_QUOTE_INTERVAL = 5000;

interface SymbolGridProps {
    stockPrices: StockPrice[]
}

const SymbolGrid = ({stockPrices}: SymbolGridProps) => {
    return (
        <Grid container rowSpacing={1} columnSpacing={1}>
            {stockPrices.map((symbol) =>
                <Grid item key={symbol.symbol} md={6} sm={12}>
                    <SymbolCard stockQuote={symbol}/>
                </Grid>
            )}
        </Grid>
    );
}

const TrendingSymbolsPage = () => {
    const {apiGet} = useApiWrapper();
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
            <SplitScreen
                left={<SymbolGrid stockPrices={data}/>}
                right={<SymbolsRightMenu/>}
                leftWeight={1}
                rightWeight={1}
            />
        </Box>
    );
}

export default TrendingSymbolsPage;