import { PriceChart } from "./PriceChart";
import { Box, useMediaQuery } from "@mui/material";
import {
  StockFinancials,
  StockPrice,
} from "../../../domain/symbols/symbolTypes";
import { useTheme } from "@mui/material/styles";
import SymbolStatistics from "./SymbolStatistics";
import React from "react";

interface Props {
  stockPrice: StockPrice;
  symbol: string;
  stockFinancials: StockFinancials;
}

const SymbolDetails = ({ symbol, stockPrice, stockFinancials }: Props) => {
  const theme = useTheme();
  const isLargeWidth = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      sx={{ width: isLargeWidth ? "80%" : "100%" }}
    >
      <SymbolStatistics
        stockFinancials={stockFinancials}
        stockPrice={stockPrice}
      />
      <PriceChart symbol={symbol} />
    </Box>
  );
};

export default SymbolDetails;
