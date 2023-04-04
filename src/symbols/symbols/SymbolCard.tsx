import {Card, CardActionArea, CardContent, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {Stock} from "../../stock/stockTypes";


const SymbolCard = ({stock}: { stock: Stock }) => {

    const {symbol, description, stockQuote} = stock

    const {currency, percentageChange, price, usdPrice, priceChange} = stockQuote

    const navigate = useNavigate();

    const redirectToSymbolDetail = () => {
        navigate(`/symbol/${symbol}`);
    }

    const getPriceDifferenceUSD = () => {
        return priceChange >= 0.00
            ? "+" + priceChange.toFixed(2)
            : priceChange.toFixed(2);
    }

    const getPriceDifferencePercentage = () => {
        return percentageChange >= 0.00
            ? "+" + percentageChange.toFixed(2)
            : percentageChange.toFixed(2);
    }

    const displayCurrentPrice = () => {
        if (currency === "USD") {
            return (
                <Typography>
                    {price} {currency}
                </Typography>
            );
        } else {
            return (
                <Typography>
                    {price} {currency} (USD {usdPrice.toFixed(2)})
                </Typography>
            );
        }
    }

    return (
        <Card elevation={0}>
            <CardActionArea onClick={redirectToSymbolDetail}>
                <CardContent>
                    <Typography variant="h5">
                        {description} ({symbol})
                    </Typography>

                    {displayCurrentPrice()}

                    <Typography sx={{color: priceChange >= 0 ? "limegreen" : "red"}}>
                        {getPriceDifferenceUSD()}
                    </Typography>

                    <Typography sx={{color: percentageChange >= 0 ? "limegreen" : "red"}}>
                        {getPriceDifferencePercentage()}%
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default SymbolCard;