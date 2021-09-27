import React, {useEffect} from "react";
import InvestmentSymbolState from "./InvestmentSymbolState";
import LoadingComponent from "../../../../../util/LoadingComponent";
import Investment from "../../../investment/Investment";

const InvestmentSymbol = ({contest, symbol}) => {

    const {remainingFunds, fetchParticipantData, investment, isLoading} = InvestmentSymbolState(contest, symbol);

    const displayInvestment = () => {
        return investment ? <Investment investment={investment}/> : null;
    }

    useEffect(() => {
        fetchParticipantData().catch(error => console.log(error));
    }, []);

    if (isLoading) {
        return <LoadingComponent/>
    }
    else {
        return (
            <div>
                <h2>Portfolio Status</h2>
                <p>Remaining funds : {remainingFunds}</p>
                {displayInvestment()}
            </div>
        );
    }
}

export default InvestmentSymbol;