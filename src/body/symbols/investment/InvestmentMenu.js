import React, {useEffect} from "react";
import SymbolInvestment from "./purchase/SymbolInvestment";
import "./investment.css";
import OrderMenu from "./orders/OrderMenu";
import InvestmentMenuState from "./InvestmentMenuState";

const InvestmentMenu = ({symbol, currentPrice}) => {

    const {populateOrderList, activeOrders, completedOrders} = InvestmentMenuState(symbol);

    useEffect(() => {
        populateOrderList()
            .catch(error => console.log(error));
    }, [symbol]);

    return (
        <div id="transactionMenu">
            <SymbolInvestment symbol={symbol} populateOrderList={populateOrderList}
                              currentPrice={currentPrice}/>
            <OrderMenu symbol={symbol} activeOrders={activeOrders}
                       completedOrders={completedOrders} populateOrderList={populateOrderList}/>
        </div>
    );
}

export default InvestmentMenu;