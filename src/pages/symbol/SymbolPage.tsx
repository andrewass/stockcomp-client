import { Box, Stack } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useApiWrapper } from "../../config/useApiWrapper";
import { StockFinancials, StockPrice } from "../../domain/symbols/symbolTypes";
import {
  GET_STOCK_SYMBOL_FINANCIALS,
  GET_STOCK_SYMBOL_PRICE,
  getStockSymbolFinancialsConfig,
  getStockSymbolPriceConfig,
} from "../../domain/symbols/symbolsApi";
import ErrorComponent from "../../error/ErrorComponent";
import SymbolDetails from "./details/SymbolDetails";
import { SymbolInvestments } from "./investment/SymbolInvestments";
import { DetailedParticipant } from "../../domain/participant/participantTypes";
import {
  GET_PARTICIPANTS_SYMBOL,
  getDetailedParticipantsForSymbolConfig,
} from "../../domain/participant/participantApi";
import SearchField from "../../search/SearchField";
import React from "react";
import StyledCircularProgress from "../../components/actions/StyledCircularProgress";

interface Props {
  symbol: string;
}

export default function SymbolPage({ symbol }: Props) {
  const { apiGet } = useApiWrapper();

  const {
    isPending: isStockPricePending,
    isError: isStockPriceError,
    error: stockPriceError,
    data: stockPrice,
  } = useQuery<StockPrice>({
    queryKey: [GET_STOCK_SYMBOL_PRICE, symbol],
    queryFn: () => apiGet(getStockSymbolPriceConfig(symbol as string)),
  });

  const {
    error: financialsError,
    isError: isFinancialsError,
    isPending: isFinancialsPending,
    data: financials,
  } = useQuery<StockFinancials>({
    queryKey: [GET_STOCK_SYMBOL_FINANCIALS, symbol],
    queryFn: () => apiGet(getStockSymbolFinancialsConfig(symbol as string)),
  });

  const {
    isPending: isParticipantPending,
    isError: isParticipantError,
    error: participantError,
    data: participants,
  } = useQuery<DetailedParticipant[]>({
    queryKey: [GET_PARTICIPANTS_SYMBOL],
    queryFn: () => apiGet(getDetailedParticipantsForSymbolConfig(symbol)),
  });

  if (isStockPricePending || isParticipantPending || isFinancialsPending) {
    return <StyledCircularProgress />;
  }

  if (isParticipantError || isStockPriceError || isFinancialsError) {
    const error = participantError ?? stockPriceError ?? financialsError;
    return <ErrorComponent error={error} />;
  }

  if (participants.length > 0) {
    return (
      <Stack direction="column" gap={8}>
        <Box display="flex" sx={{ justifyContent: "center" }}>
          <SearchField />
        </Box>
        <Stack direction="row">
          <SymbolDetails
            stockPrice={stockPrice}
            symbol={symbol!}
            stockFinancials={financials}
          />
          <SymbolInvestments
            stockPrice={stockPrice}
            participants={participants}
          />
        </Stack>
      </Stack>
    );
  } else {
    return (
      <Stack direction="column" gap={8}>
        <Box display="flex" sx={{ justifyContent: "center" }}>
          <SearchField />
        </Box>
        <SymbolDetails
          stockPrice={stockPrice}
          symbol={symbol!}
          stockFinancials={financials}
        />
      </Stack>
    );
  }
}
