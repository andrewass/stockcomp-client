import React from "react";
import SymbolInvestment from "./SymbolInvestment";
import ActiveOrders from "./ActiveOrders";

const TransactionMenu = ({symbol}) => {

    return (
        <div id="transactionMenu">
            <SymbolInvestment symbol={symbol}/>
            <ActiveOrders/>
        </div>
    );
}

export default TransactionMenu;