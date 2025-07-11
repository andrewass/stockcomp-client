import { Box, Grid, Stack, Typography } from "@mui/material";
import {
  StockFinancials,
  StockPrice,
} from "../../../domain/symbols/symbolTypes";

interface Props {
  stockFinancials: StockFinancials;
  stockPrice: StockPrice;
}

export default function SymbolStatistics({
  stockFinancials,
  stockPrice,
}: Props) {
  const {
    symbol,
    currency,
    currentPrice,
    usdPrice,
    companyName,
    priceChange,
    percentageChange,
  } = stockPrice;

  const {
    priceToBook,
    earningsPerShare,
    priceToEarnings,
    dividendYieldPercentage,
    dividendRate,
  } = stockFinancials;

  const gridSize = 6;

  const getCurrentPrice = () => {
    if (currency === "USD") {
      return (
        <Typography display="inline">
          {currentPrice} {currency}
        </Typography>
      );
    } else {
      return (
        <Typography display="inline">
          {currentPrice} {currency} (USD {usdPrice})
        </Typography>
      );
    }
  };

  return (
    <Stack direction="row" sx={{ marginLeft: "50px" }} gap={5}>
      <Box>
        <Typography variant="h5" gutterBottom>
          {companyName} ({symbol})
        </Typography>

        {getCurrentPrice()}

        <Typography sx={{ color: priceChange >= 0 ? "limegreen" : "red" }}>
          {priceChange.toFixed(2)} {currency}
        </Typography>

        <Typography sx={{ color: priceChange >= 0 ? "limegreen" : "red" }}>
          {percentageChange.toFixed(2)}%
        </Typography>
      </Box>

      <Grid container rowSpacing={1} columnSpacing={1} sx={{ width: "500px" }}>
        <Grid key="key1" size={gridSize}>
          <Typography>
            Dividend Rate:{" "}
            {dividendRate ? dividendRate.toFixed(2) + " " + currency : "N/A"}
          </Typography>
        </Grid>
        <Grid key="key2" size={gridSize}>
          <Typography>
            Dividend Yield:{" "}
            {dividendYieldPercentage
              ? dividendYieldPercentage.toFixed(2) + "%"
              : "N/A"}
          </Typography>
        </Grid>
        <Grid key="key3" size={gridSize}>
          <Typography>
            Earnings Per Share:{" "}
            {earningsPerShare ? earningsPerShare.toFixed(2) : "N/A"} {currency}
          </Typography>
        </Grid>
        <Grid key="key4" size={gridSize}>
          <Typography>
            Price/Earnings:{" "}
            {priceToEarnings ? priceToEarnings.toFixed(2) : "N/A"}
          </Typography>
        </Grid>
        <Grid key="key5" size={gridSize}>
          <Typography>
            Price/Book: {priceToBook ? priceToBook.toFixed(2) : "N/A"}
          </Typography>
        </Grid>
      </Grid>
    </Stack>
  );
}
