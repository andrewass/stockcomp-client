import React from "react";
import {Card, CardContent, Typography} from "@mui/material";

const Investment = ({investment}) => {

    const displayInvestmentProfit = () => {
        if (investment.totalProfit >= 0) {
            return <Typography variant="span" sx={{color:"limegreen"}}>
                +{investment.totalProfit.toFixed(2)} USD
            </Typography>
        } else {
            return <Typography variant="span" sx={{color:"red"}}>
                {investment.totalProfit.toFixed(2)} USD
            </Typography>
        }
    }

    return(
        <Card elevation={0} sx={{mt:"1rem", mb:"2rem", pl:2}}>
            <CardContent>
                <Typography variant="h6">{investment.symbol}</Typography>
                <Typography>Amount invested : {investment.amount}</Typography>
                <Typography>Investment value : {investment.totalValue.toFixed(2)} USD</Typography>
                <Typography>Investment profit : {displayInvestmentProfit()}</Typography>
            </CardContent>
        </Card>
    );
}

export default Investment;