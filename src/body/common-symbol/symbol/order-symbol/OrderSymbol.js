import React from "react";
import ActiveOrders from "../../order/ActiveOrders";
import CompletedOrders from "../../order/CompletedOrders";
import OrderSymbolState from "./OrderSymbolState";

const OrderSymbol = ({contests, symbol}) => {

    const {populateOrderList, activeOrders, completedOrders} = OrderSymbolState(contests, symbol);

    return (
        <div>
            <ActiveOrders activeOrders={activeOrders} populateOrderList={populateOrderList}/>
            <CompletedOrders completedOrders={completedOrders}/>
        </div>
    );
}

export default OrderSymbol;