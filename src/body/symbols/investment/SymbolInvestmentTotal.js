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

    return(
        <div>
            <h2>Portfolio Status</h2>
            <p>Remaining funds : {remainingFunds} USD</p>
            <p>Investments value : {totalValueInvestments} USD</p>
            <hr/>
            <p>Total value : {totalValue} USD</p>
        </div>
    )
}

export default SymbolInvestmentTotal;