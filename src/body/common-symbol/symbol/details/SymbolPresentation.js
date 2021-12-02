import React from "react";
import {Card, CardContent, Typography} from "@mui/material";


const SymbolPresentation = ({symbolAndPrice}) => {

    const priceDifference = (symbolAndPrice.price - symbolAndPrice.previousClose).toFixed(2);
    const percentageDifference = ((priceDifference / symbolAndPrice.previousClose) * 100).toFixed(2);

    const getPriceDifferenceUSD = () => {
        return priceDifference >= 0.00 ? "+" + priceDifference : priceDifference;
    }

    const getPriceDifferencePercentage = () => {
        return priceDifference >= 0.00 ? "+" + percentageDifference : percentageDifference;
    }

    const getCurrentPrince = () => {
        if (symbolAndPrice.currency === "USD") {
            return <Typography variant="span">{symbolAndPrice.price} {symbolAndPrice.currency}</Typography>;
        } else {
            return <Typography variant="span">
                {symbolAndPrice.price} {symbolAndPrice.currency} (USD {symbolAndPrice.usdPrice.toFixed(2)})
            </Typography>;
        }
    }

    return (
        <Card elevation={0}>
            <CardContent>
                <Typography variant="h5">{symbolAndPrice.name} ({symbolAndPrice.symbol})</Typography>
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