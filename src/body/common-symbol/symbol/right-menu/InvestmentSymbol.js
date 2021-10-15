import React, {useEffect, useState} from "react";
import Investment from "../../investment/Investment";
import {getRemainingFunds} from "../../../../service/contestService";
import {getInvestmentOfSymbol} from "../../../../service/investmentService";
import {Card, CardContent, CircularProgress, Typography} from "@mui/material";

const InvestmentSymbol = ({contest, symbol}) => {

    const [remainingFunds, setRemainingFunds] = useState();
    const [investment, setInvestment] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const fetchParticipantData = async () => {
        if (contest) {
            const userRemainingFunds = await getRemainingFunds(contest.contestNumber);
            setRemainingFunds((userRemainingFunds.data).toFixed(2));
            const investmentResponse = await getInvestmentOfSymbol(contest.contestNumber, symbol.symbol);
            if (investmentResponse.data) {
                setInvestment(investmentResponse.data)
            }
            setIsLoading(false);
        }
    }


    const displayInvestment = () => {
        return investment ? <Investment investment={investment}/> : null;
    }


    useEffect(() => {
        fetchParticipantData().catch(error => console.log(error));
    }, []);

    if (isLoading) {
        return <CircularProgress/>
    }
    else {

        return(
            <Card elevation={0} id="investmentSymbol">
                <CardContent>
                    <Typography variant="h5" sx={{pb:"0.5rem"}}>Portfolio Status</Typography>
                    <Typography sx={{pb:"1rem"}}>Remaining funds : {remainingFunds}</Typography>
                    {displayInvestment()}
                </CardContent>
            </Card>
        );
    }
}

export default InvestmentSymbol;