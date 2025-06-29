import { Grid } from "@mui/material";
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
import StyledCircularProgress from "../../../components/actions/StyledCircularProgress";

const FETCH_QUOTE_INTERVAL = 5000;

const SymbolGrid = () => {
  const { apiGet } = useApiWrapper();
  const { isError, isPending, error, data } = useQuery<StockPrice[]>({
    queryKey: [GET_PRICE_TRENDING_SYMBOLS],
    queryFn: () => apiGet(getTrendingSymbolsPriceConfig()),
    refetchInterval: FETCH_QUOTE_INTERVAL,
  });

  if (isPending) {
    return <StyledCircularProgress />;
  }

  if (isError) {
    return <ErrorComponent error={error} />;
  }

  return (
    <Grid container rowSpacing={2} columnSpacing={4}>
      {data.map((symbol) => (
        <Grid key={symbol.symbol} size={6}>
          <SymbolCard stockQuote={symbol} />
        </Grid>
      ))}
    </Grid>
  );
};

export default SymbolGrid;
