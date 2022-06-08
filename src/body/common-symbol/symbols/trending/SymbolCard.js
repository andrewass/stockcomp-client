import {Card, CardActionArea, CardContent, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";


const SymbolCard = ({symbol}) => {

    const navigate = useNavigate();

    const redirectToSymbolDetail = () => {
        navigate(`/symbol/${symbol.symbol}`);
    }

    const getPriceDifferenceUSD = () => {
        return symbol.priceChange >= 0.00
            ? "+" + symbol.priceChange.toFixed(2)
            : symbol.priceChange.toFixed(2);
    }

    const getPriceDifferencePercentage = () => {
        return symbol.percentageChange >= 0.00
            ? "+" + symbol.percentageChange.toFixed(2)
            : symbol.percentageChange.toFixed(2);
    }

    const getCurrentPrice = () => {
        if (symbol.currency === "USD") {
            return (
                <Typography variant="span">
                    {symbol.price} {symbol.currency}
                </Typography>
            );
        } else {
            return (
                <Typography variant="span">
                    {symbol.price} {symbol.currency} (USD {symbol.usdPrice.toFixed(2)})
                </Typography>
            );
        }
    }

    return (
        <Card elevation={0}>
            <CardActionArea onClick={redirectToSymbolDetail}>
                <CardContent>
                    <Typography variant="h5">
                        {symbol.name} ({symbol.symbol})
                    </Typography>
                    <Typography>
                        {getCurrentPrice()}
                    </Typography>
                    <Typography sx={{color: symbol.priceChange >= 0 ? "limegreen" : "red"}}>
                        {getPriceDifferenceUSD()}
                    </Typography>
                    <Typography sx={{color: symbol.percentageChange >= 0 ? "limegreen" : "red"}}>
                        {getPriceDifferencePercentage()}%
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default SymbolCard;