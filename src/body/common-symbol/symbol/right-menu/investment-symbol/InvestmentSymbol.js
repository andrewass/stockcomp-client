import React, {useEffect} from "react";
import InvestmentSymbolState from "./InvestmentSymbolState";
import LoadingComponent from "../../../../../util/LoadingComponent";

const InvestmentSymbol = ({contest, symbol}) => {

    const {
        remainingFunds, amountInvested, fetchParticipantData, investmentProfit,
        investmentValue, isLoading
    } = InvestmentSymbolState(contest, symbol);

    useEffect(() => {
        fetchParticipantData().catch(error => console.log(error));
    }, []);

    const displayInvestmentProfit = () => {
        if (investmentProfit >= 0) {
            return <span id="positiveInvestmentProfit"> +{investmentProfit} USD</span>
        } else {
            return <span id="negativeInvestmentProfit"> {investmentProfit} USD</span>
        }
    }

    if (isLoading) {
        return <LoadingComponent/>
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