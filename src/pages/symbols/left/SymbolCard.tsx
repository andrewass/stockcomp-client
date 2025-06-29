import {
  Card,
  CardActionArea,
  CardContent,
  Link as MUILink,
  Stack,
  Typography,
} from "@mui/material";
import { StockPrice } from "../../../domain/symbols/symbolTypes";
import { createLink } from "@tanstack/react-router";

const CustomLink = createLink(MUILink);

const SymbolCard = ({ stockQuote }: { stockQuote: StockPrice }) => {
  const {
    currency,
    percentageChange,
    currentPrice,
    usdPrice,
    priceChange,
    symbol,
    companyName,
  } = stockQuote;

  const getPriceDifferenceUSD = () => {
    return priceChange >= 0.0
      ? "+" + priceChange.toFixed(2) + " " + currency
      : priceChange.toFixed(2) + " " + currency;
  };

  const getPriceDifferencePercentage = () => {
    return percentageChange >= 0.0
      ? "+" + percentageChange.toFixed(2)
      : percentageChange.toFixed(2);
  };

  const displayCurrentPrice = () => {
    if (currency === "USD") {
      return (
        <Typography>
          {currentPrice} {currency}
        </Typography>
      );
    } else {
      return (
        <Typography>
          {currentPrice} {currency} (USD {usdPrice.toFixed(2)})
        </Typography>
      );
    }
  };

  return (
    <Card elevation={0}>
      <CardActionArea component={CustomLink} to={`/symbols/${symbol}`}>
        <CardContent>
          <Stack gap={2}>
            <CustomLink to="/symbols/$symbol" params={{ symbol: symbol }}>
              <Typography>
                {companyName} ({symbol})
              </Typography>
            </CustomLink>

            <Stack>
              {displayCurrentPrice()}

              <Typography
                sx={{ color: priceChange >= 0 ? "limegreen" : "red" }}
              >
                {getPriceDifferenceUSD()}
              </Typography>

              <Typography
                sx={{ color: percentageChange >= 0 ? "limegreen" : "red" }}
              >
                {getPriceDifferencePercentage()}%
              </Typography>
            </Stack>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default SymbolCard;
