import React, {useEffect} from "react";
import ActiveOrders from "../../../order/ActiveOrders";
import CompletedOrders from "../../../order/CompletedOrders";
import OrderSymbolState from "./OrderSymbolState";
import OrderForm from "./OrderForm";
import "./order-form.css";

const OrderSymbol = ({contest, symbol, currentPrice}) => {

    const {populateOrderList, activeOrders, completedOrders} = OrderSymbolState(contest, symbol);

    useEffect(() => {
        populateOrderList()
            .catch(error => console.log(error));
    }, []);

    return (
        <div>
            <OrderForm symbol={symbol} contest={contest} currentPrice={currentPrice}/>
            <ActiveOrders activeOrders={activeOrders} populateOrderList={populateOrderList}/>
            <CompletedOrders completedOrders={completedOrders}/>
        </div>
    );
}

export default OrderSymbol;