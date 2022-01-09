import React from "react";
import {Card, CardContent, CircularProgress, Typography} from "@mui/material";
import {useQuery} from "@apollo/client";
import {GET_STOCK_STATS} from "../../../../service/graphqlService";


const SymbolStats = ({symbol, symbolName}) => {

    const {loading, error, data} = useQuery(GET_STOCK_STATS, {variables: {symbol}});

    if (loading) return <CircularProgress/>;

    if (error) return `Error! ${error}`;

    const quote = data.stockSymbolStats.stockQuote;

    console.log("quote is "+JSON.stringify(quote));

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
                <Typography variant="h5">{symbolName} ({symbol})</Typography>
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