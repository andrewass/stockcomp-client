import React, {useEffect} from "react";
import InvestmentSymbol from "../investment-symbol/InvestmentSymbol";
import "../investment.css";
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
            <InvestmentSymbol symbol={symbol} populateOrderList={populateOrderList}
                              realTimePrice={realTimePrice}/>
            <OrderSymbol symbol={symbol} activeOrders={activeOrders}
                         completedOrders={completedOrders} populateOrderList={populateOrderList}/>
        </div>
    );
}

export default InvestmentMenu;