import React from "react";
import {Card, CardContent, Typography} from "@mui/material";


const SymbolPresentation = ({symbol}) => {

    const priceDifference = (symbol.price - symbol.previousClose).toFixed(2);
    const percentageDifference = ((priceDifference / symbol.previousClose) * 100).toFixed(2);

    const getPriceDifferenceUSD = () => {
        return priceDifference >= 0.00 ? "+" + priceDifference : priceDifference;
    }

    const getPriceDifferencePercentage = () => {
        return priceDifference >= 0.00 ? "+" + percentageDifference : percentageDifference;
    }

    const getCurrentPrince = () => {
        if (symbol.currency === "USD") {
            return <Typography variant="span">{symbol.price} {symbol.currency}</Typography>;
        } else {
            return <Typography variant="span">
                {symbol.price} {symbol.currency} (USD {symbol.usdPrice.toFixed(2)})
            </Typography>;
        }
    }

    return (
        <Card elevation={0} id="symbolCard">
            <CardContent>
                <Typography variant="h5">{symbol.name} ({symbol.symbol})</Typography>
                <Typography>{getCurrentPrince()}</Typography>
                <Typography
                    sx={{color: priceDifference >= 0 ? "limegreen" : "red"}}>{getPriceDifferenceUSD()}</Typography>
                <Typography
                    sx={{color: priceDifference >= 0 ? "limegreen" : "red"}}>{getPriceDifferencePercentage()}%</Typography>
            </CardContent>
        </Card>
    )
}

export default SymbolPresentation;