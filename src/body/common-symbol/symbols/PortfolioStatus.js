import React, {useEffect, useState} from "react";
import {getRemainingFunds} from "../../../service/contestService";
import {getTotalValueInvestments} from "../../../service/investmentService";
import {Card, CardContent, Divider, Typography} from "@mui/material";


const PortfolioStatus = ({contest}) => {

    const [remainingFunds, setRemainingFunds] = useState();
    const [totalValueInvestments, setTotalValueInvestments] = useState();
    const [totalValue, setTotalValue] = useState();

    const fetchParticipantData = async () => {
        if (contest) {
            const userRemainingFunds = await getRemainingFunds(contest.contestNumber);
            const userTotalValueInvestments = await getTotalValueInvestments(contest.contestNumber);
            setRemainingFunds((userRemainingFunds.data).toFixed(2));
            setTotalValueInvestments(userTotalValueInvestments.data.toFixed(2));
            setTotalValue((userRemainingFunds.data + userTotalValueInvestments.data).toFixed(2));
        }
    }

    useEffect(() => {
        fetchParticipantData()
            .catch(error => console.log(error));
    }, []);

    return(
        <Card elevation={0} sx={{mt:"1rem", mb:"2rem"}}>
            <CardContent>
                <Typography variant="h5">Portfolio status</Typography>
                <Typography sx={{m:"0.5rem 0"}}>Remaining funds : {remainingFunds} USD</Typography>
                <Typography>Investments value : {totalValueInvestments} USD</Typography>
                <Divider sx={{m:"0.5rem 0"}}/>
                <Typography>Total value : {totalValue} USD</Typography>
            </CardContent>
        </Card>
    )
}

export default PortfolioStatus;