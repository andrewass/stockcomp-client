import React, {useEffect} from "react";
import TransactionState from "./TransactionState";

const TransactionMenu = ({symbol}) => {

    const {remainingFunds, amountInvested, fetchParticipantData} = TransactionState(symbol);

    useEffect(() => {
        fetchParticipantData();
    }, []);

    return (
        <ul>
            <h3>TransactionMenu</h3>
            <p>Remaining funds : {remainingFunds}</p>
            <p>Amount invested : {amountInvested}</p>
            <li>
                <input type="text"/>
            </li>
            <button>Send</button>
        </ul>
    );
}

export default TransactionMenu;