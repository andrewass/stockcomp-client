import {Card, CardContent, Typography} from "@mui/material";


const SymbolInformation = ({symbolDetails}) => {

    const {symbol, companyName, stockQuote} = symbolDetails;

    const priceDifference = (stockQuote.price - stockQuote.previousClose).toFixed(2);

    const percentageDifference = ((priceDifference / stockQuote.previousClose) * 100).toFixed(2);

    const getPriceDifferenceUSD = () => {
        return priceDifference >= 0.00 ? "+" + priceDifference : priceDifference;
    }

    const getPriceDifferencePercentage = () => {
        return priceDifference >= 0.00 ? "+" + percentageDifference : percentageDifference;
    }

    const getCurrentPrice = () => {
        if (stockQuote.currency === "USD") {
            return <Typography variant="span">{stockQuote.price} {stockQuote.currency}</Typography>;
        } else {
            return <Typography variant="span">
                {stockQuote.price} {stockQuote.currency} (USD {stockQuote.price})
            </Typography>;
        }
    }

    return (
        <Card elevation={0}>
            <CardContent>
                <Typography variant="h5">{companyName} ({symbol})</Typography>
                <Typography>{getCurrentPrice()}</Typography>
                <Typography
                    sx={{color: priceDifference >= 0 ? "limegreen" : "red"}}>{getPriceDifferenceUSD()}</Typography>
                <Typography
                    sx={{color: priceDifference >= 0 ? "limegreen" : "red"}}>{getPriceDifferencePercentage()}%</Typography>
            </CardContent>
        </Card>
    )
}

export default SymbolInformation;