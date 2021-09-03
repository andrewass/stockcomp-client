import React, {useEffect} from "react";
import PortfolioStatusState from "./PortfolioStatusState";

const PortfolioStatus = ({contests}) => {

    const {
        remainingFunds, totalValueInvestments, totalValue, fetchParticipantData
    } = PortfolioStatusState(contests);

    useEffect(() => {
        fetchParticipantData()
            .catch(error => console.log(error));
    }, [contests]);

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