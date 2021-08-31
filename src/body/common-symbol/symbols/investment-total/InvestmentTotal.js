import React, {useEffect} from "react";
import InvestmentTotalState from "./InvestmentTotalState";

const InvestmentTotal = ({contestList}) => {

    const {
        remainingFunds, totalValueInvestments, totalValue, fetchParticipantData
    } = InvestmentTotalState(contestList);

    useEffect(() => {
        fetchParticipantData()
            .catch(error => console.log(error));
    }, [contestList]);

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

export default InvestmentTotal;