import React, {useEffect} from "react";
import TransactionMenuState from "./TransactionMenuState";

const PortfolioStatus = ({symbol}) => {

    const {remainingFunds, amountInvested, fetchParticipantData} = TransactionMenuState(symbol);

    useEffect(() => {
        fetchParticipantData();
    }, []);

    return(
        <div>
            <h2>Portfolio Status</h2>
            <p>Remaining funds : {remainingFunds}</p>
            <p>Amount invested : {amountInvested}</p>
            <div>
                <span>Buy </span>
                <input type="text"/>
            </div>
            <button onClick={() => alert("sending order")}>Send</button>
        </div>
    );
}

export default PortfolioStatus;