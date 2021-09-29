import React, {useEffect, useState} from "react";
import {getRemainingFunds} from "../../../service/contestService";
import {getTotalValueInvestments} from "../../../service/investmentService";


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

    return (
        <div>
            <h2>Portfolio Status</h2>
            <p>Remaining funds : {remainingFunds} USD</p>
            <p>Investments value : {totalValueInvestments} USD</p>
            <hr/>
            <p>Total value : {totalValue} USD</p>
        </div>
    )
}

export default PortfolioStatus;