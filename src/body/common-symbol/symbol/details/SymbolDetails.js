import {Card, CardContent, Typography} from "@mui/material";


const SymbolDetails = ({symbolDetails}) => {

    const {symbol, companyName, stockQuote} = symbolDetails;
    const {priceChange, percentageChange} = stockQuote;

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
                <Typography variant="h5">
                    {companyName} ({symbol})
                </Typography>
                <Typography>
                    {getCurrentPrice()}
                </Typography>
                <Typography
                    sx={{color: priceChange >= 0 ? "limegreen" : "red"}}>{priceChange.toFixed(2)}
                </Typography>
                <Typography
                    sx={{color: priceChange >= 0 ? "limegreen" : "red"}}>{percentageChange.toFixed(2)}%
                </Typography>
            </CardContent>
        </Card>
    )
}

export default SymbolDetails;