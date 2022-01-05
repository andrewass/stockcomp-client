import React from "react";
import {Card, CardContent, CircularProgress, Typography} from "@mui/material";
import {useQuery} from "@apollo/client";
import {GET_STOCK_STATS} from "../../../../service/graphqlService";


const SymbolStats = ({symbol}) => {

    const priceDifference = (symbol.price - symbol.previousClose).toFixed(2);
    const percentageDifference = ((priceDifference / symbol.previousClose) * 100).toFixed(2);

    const {loading, error, data} = useQuery(GET_STOCK_STATS, {variables: {symbol}});

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

    if (loading) return <CircularProgress/>;

    if (error) return `Error! ${error}`;

    return (
        <Card elevation={0}>
            <CardContent>
                <Typography variant="h5">{symbol.name} ({symbol.symbol})</Typography>
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