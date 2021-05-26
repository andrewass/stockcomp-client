import React from "react";
import PortfolioStatus from "./PortfolioStatus";
import ActiveOrders from "./ActiveOrders";

const TransactionMenu = ({symbol}) => {

    return (
        <div id="transactionMenu">
            <PortfolioStatus symbol={symbol}/>
            <ActiveOrders/>
        </div>
    );
}

export default TransactionMenu;