import React, {useEffect} from "react";
import InvestmentSymbolState from "./InvestmentSymbolState";
import LoadingComponent from "../../../../../util/LoadingComponent";
import Investment from "../../../investment/Investment";

const InvestmentSymbol = ({contest, symbol}) => {

    const {remainingFunds, fetchParticipantData, investment, isLoading} = InvestmentSymbolState(contest, symbol);

    useEffect(() => {
        fetchParticipantData().catch(error => console.log(error));
    }, []);


    if (isLoading) {
        return <LoadingComponent/>
    }
    return (
        <div>
            <h2>Portfolio Status</h2>
            <p>Remaining funds : {remainingFunds}</p>
            <Investment investment={investment}/>
        </div>
    );
}

export default InvestmentSymbol;