import React, {useEffect} from "react";
import SymbolInvestmentTotalState from "./SymbolInvestmentTotalState";

const SymbolInvestmentTotal = () => {

    const {
        remainingFunds, totalValueInvestments, totalValue, fetchParticipantData
    } = SymbolInvestmentTotalState();

    useEffect(() => {
        fetchParticipantData()
            .catch(error => console.log(error));
    }, []);

    const displayInvestmentValue = (value) => {
        if (value >= 0) {
            return <span id="positiveInvestmentReturns"> +{value} USD</span>
        } else {
            return <span id="negativeInvestmentReturns"> -{value} USD</span>
        }
    }

    return(
        <div>
            <h2>Portfolio Status</h2>
            <p>Remaining funds : {remainingFunds}</p>
            <p>Total investment returns : {displayInvestmentValue(totalValueInvestments)}</p>
            <p>Total value : {totalValue}</p>
        </div>
    )
}

export default SymbolInvestmentTotal;