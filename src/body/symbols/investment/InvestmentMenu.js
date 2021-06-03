import React from "react";
import SymbolInvestment from "./purchase/SymbolInvestment";
import "./investment.css";
import OrderMenu from "./orders/OrderMenu";
import InvestmentMenuState from "./InvestmentMenuState";

const InvestmentMenu = ({symbol}) => {

    const {populateOrderList, activeOrders, completedOrders} = InvestmentMenuState(symbol)

    return (
        <div id="transactionMenu">
            <SymbolInvestment symbol={symbol} populateOrderList={populateOrderList}/>
            <OrderMenu symbol={symbol} activeOrders={activeOrders}
                       completedOrders={completedOrders} populatOrderList={populateOrderList}/>
        </div>
    );
}

export default InvestmentMenu;