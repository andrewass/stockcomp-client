import React, {useEffect} from "react";
import InvestmentSingle from "../investment-single/InvestmentSingle";
import "./investment.css";
import OrderSymbol from "../order-symbol/OrderSymbol";
import InvestmentMenuState from "./InvestmentMenuState";

const InvestmentMenu = ({symbol, realTimePrice}) => {

    const {populateOrderList, activeOrders, completedOrders} = InvestmentMenuState(symbol);

    useEffect(() => {
        populateOrderList()
            .catch(error => console.log(error));
    }, [symbol]);

    return (
        <div id="transactionMenu">
            <InvestmentSingle symbol={symbol} populateOrderList={populateOrderList}
                              realTimePrice={realTimePrice}/>
            <OrderSymbol symbol={symbol} activeOrders={activeOrders}
                         completedOrders={completedOrders} populateOrderList={populateOrderList}/>
        </div>
    );
}

export default InvestmentMenu;