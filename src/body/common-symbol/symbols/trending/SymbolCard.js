import {Card, CardActionArea, CardContent, Typography} from "@mui/material";
import {useHistory} from "react-router-dom";


const SymbolCard = ({symbol}) => {

    const history = useHistory();

    const priceDifference = (symbol.price - symbol.previousClose).toFixed(2);
    const percentageDifference = ((priceDifference / symbol.previousClose) * 100).toFixed(2);

    const redirectToSymbolDetail = () => {
        history.push(`/symbol/${symbol.symbol}`);
    }

    const getPriceDifferenceUSD = () => {
        return priceDifference >= 0.00 ? "+" + priceDifference : priceDifference;
    }

    const getPriceDifferencePercentage = () => {
        return priceDifference >= 0.00 ? "+" + percentageDifference : percentageDifference;
    }

    const getCurrentPrice = () => {
        if (symbol.currency === "USD") {
            return <Typography variant="span">{symbol.price} {symbol.currency}</Typography>;
        } else {
            return <Typography variant="span">
                {symbol.price} {symbol.currency} (USD {symbol.usdPrice.toFixed(2)})
            </Typography>;
        }
    }

    return (
        <Card elevation={0}>
            <CardActionArea onClick={redirectToSymbolDetail}>
                <CardContent>
                    <Typography variant="h5">{symbol.name} ({symbol.symbol})</Typography>
                    <Typography>{getCurrentPrice()}</Typography>
                    <Typography
                        sx={{color: priceDifference >= 0 ? "limegreen" : "red"}}>{getPriceDifferenceUSD()}</Typography>
                    <Typography
                        sx={{color: priceDifference >= 0 ? "limegreen" : "red"}}>{getPriceDifferencePercentage()}%</Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default SymbolCard;