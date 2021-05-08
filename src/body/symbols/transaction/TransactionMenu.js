import React from "react";
import TransactionState from "./TransactionState";

const TransactionMenu = () => {

    const {populateInvestments, remainingFunds, amountInvested} = TransactionState();

    return(
        <h3>TransactionMenu</h3>
    );
}

export default TransactionMenu;