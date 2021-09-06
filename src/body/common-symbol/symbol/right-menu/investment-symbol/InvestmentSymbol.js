import React, {useEffect} from "react";
import InvestmentSymbolState from "./InvestmentSymbolState";

const InvestmentSymbol = ({symbol, populateOrderList, realTimePrice}) => {

    const {
        remainingFunds, amountInvested, fetchParticipantData, investmentProfit, investmentValue
    } = InvestmentSymbolState(symbol, populateOrderList, realTimePrice);

    useEffect(() => {
        fetchParticipantData()
            .catch(error => console.log(error));
    }, [symbol]);

    const displayInvestmentProfit = () => {
        if (investmentProfit >= 0) {
            return <span id="positiveInvestmentProfit"> +{investmentProfit} USD</span>
        } else {
            return <span id="negativeInvestmentProfit"> {investmentProfit} USD</span>
        }
    }

    return (
        <div>
            <h2>Portfolio Status</h2>
            <p>Remaining funds : {remainingFunds}</p>
            <h4>{symbol.description} : </h4>
            <p>- Amount invested : {amountInvested}</p>
            <p>- Investment value : {investmentValue} USD</p>
            <p>- Investment profit : {displayInvestmentProfit()}</p>
        </div>
    );
}

export default InvestmentSymbol;