import {Card, CardContent, Typography} from "@mui/material";


const SymbolStats = ({symbol, quote}) => {

    const priceDifference = (quote.price - quote.previousClose).toFixed(2);

    const percentageDifference = ((priceDifference / quote.previousClose) * 100).toFixed(2);

    const getPriceDifferenceUSD = () => {
        return priceDifference >= 0.00 ? "+" + priceDifference : priceDifference;
    }

    const getPriceDifferencePercentage = () => {
        return priceDifference >= 0.00 ? "+" + percentageDifference : percentageDifference;
    }

    const getCurrentPrice = () => {
        if (quote.currency === "USD") {
            return <Typography variant="span">{quote.price} {quote.currency}</Typography>;
        } else {
            return <Typography variant="span">
                {quote.price} {quote.currency} (USD {quote.price})
            </Typography>;
        }
    }

    return (
        <Card elevation={0}>
            <CardContent>
                <Typography variant="h5">{symbol} ({symbol})</Typography>
                <Typography>{getCurrentPrice()}</Typography>
                <Typography
                    sx={{color: priceDifference >= 0 ? "limegreen" : "red"}}>{getPriceDifferenceUSD()}</Typography>
                <Typography
                    sx={{color: priceDifference >= 0 ? "limegreen" : "red"}}>{getPriceDifferencePercentage()}%</Typography>
            </CardContent>
        </Card>
    )
}

export default SymbolStats;