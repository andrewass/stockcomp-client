import { PriceChart } from "./PriceChart";
import { Stack } from "@mui/material";
import {
  StockFinancials,
  StockPrice,
} from "../../../domain/symbols/symbolTypes";
import SymbolStatistics from "./SymbolStatistics";
import React from "react";

interface Props {
  stockPrice: StockPrice;
  symbol: string;
  stockFinancials: StockFinancials;
}

export default function SymbolDetails({
  symbol,
  stockPrice,
  stockFinancials,
}: Props) {
  return (
    <Stack>
      <PriceChart symbol={symbol} />
      <SymbolStatistics
        stockFinancials={stockFinancials}
        stockPrice={stockPrice}
      />
    </Stack>
  );
}
