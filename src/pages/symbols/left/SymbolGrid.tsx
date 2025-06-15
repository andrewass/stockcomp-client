import { CircularProgress, Grid } from "@mui/material";
import SymbolCard from "./SymbolCard";
import React from "react";
import { useApiWrapper } from "../../../config/useApiWrapper";
import { useQuery } from "@tanstack/react-query";
import {
  GET_PRICE_TRENDING_SYMBOLS,
  getTrendingSymbolsPriceConfig,
} from "../../../domain/symbols/symbolsApi";
import ErrorComponent from "../../../error/ErrorComponent";
import { StockPrice } from "../../../domain/symbols/symbolTypes";

const FETCH_QUOTE_INTERVAL = 5000;

const SymbolGrid = () => {
  const { apiGet } = useApiWrapper();
  const { isError, isPending, error, data } = useQuery<StockPrice[]>({
    queryKey: [GET_PRICE_TRENDING_SYMBOLS],
    queryFn: () => apiGet(getTrendingSymbolsPriceConfig()),
    refetchInterval: FETCH_QUOTE_INTERVAL,
  });

  if (isPending) return <CircularProgress />;

  if (isError) {
    return <ErrorComponent error={error} />;
  }

  return (
    <Grid container rowSpacing={1} columnSpacing={4}>
      {data.map((symbol) => (
        <Grid key={symbol.symbol} size={6}>
          <SymbolCard stockQuote={symbol} />
        </Grid>
      ))}
    </Grid>
  );
};

export default SymbolGrid;
