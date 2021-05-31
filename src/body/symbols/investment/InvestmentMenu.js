import React from "react";
import SymbolInvestment from "./purchase/SymbolInvestment";
import "./investment.css";
import OrderMenu from "./orders/OrderMenu";

const InvestmentMenu = ({symbol}) => {

    return (
        <div id="transactionMenu">
            <SymbolInvestment symbol={symbol}/>
            <OrderMenu symbol={symbol}/>
        </div>
    );
}

export default InvestmentMenu;