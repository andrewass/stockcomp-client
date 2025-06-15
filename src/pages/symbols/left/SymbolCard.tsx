import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { StockPrice } from "../../../domain/symbols/symbolTypes";
import { Link } from "@tanstack/react-router";

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
      <CardActionArea>
        <CardContent>
          <Link
            to="/symbols/$symbol"
            params={{ symbol: symbol }}
            style={{ textDecoration: "none" }}
          >
            <Typography variant="h5">
              {companyName} ({symbol})
            </Typography>
          </Link>

          {displayCurrentPrice()}

          <Typography sx={{ color: priceChange >= 0 ? "limegreen" : "red" }}>
            {getPriceDifferenceUSD()}
          </Typography>

          <Typography
            sx={{ color: percentageChange >= 0 ? "limegreen" : "red" }}
          >
            {getPriceDifferencePercentage()}%
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default SymbolCard;
