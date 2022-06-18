import {Card, CardActionArea, CardContent, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {StockPrice} from "../../types/symbol";

interface Props{
    stockPrice: StockPrice
}

const SymbolCard = ({stockPrice}: Props) => {

    const {
        currency, percentageChange, symbol, name,
        price, usdPrice, priceChange
    } = stockPrice

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
                <Typography display="inline">
                    {price} {currency}
                </Typography>
            );
        } else {
            return (
                <Typography display="inline">
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
                        {name} ({symbol})
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