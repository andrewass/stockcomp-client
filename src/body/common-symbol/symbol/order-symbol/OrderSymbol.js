import React, {useEffect} from "react";
import ActiveOrders from "../../order/ActiveOrders";
import CompletedOrders from "../../order/CompletedOrders";
import OrderSymbolState from "./OrderSymbolState";
import OrderForm from "./OrderForm";
import "./order-form.css";

const OrderSymbol = ({contests, symbol}) => {

    const {populateOrderList, activeOrders, completedOrders} = OrderSymbolState(contests, symbol);

    useEffect(() => {
        populateOrderList()
            .catch(error => console.log(error));
    }, []);

    return (
        <div>
            <OrderForm symbol={symbol}/>
            <ActiveOrders activeOrders={activeOrders} populateOrderList={populateOrderList}/>
            <CompletedOrders completedOrders={completedOrders}/>
        </div>
    );
}

export default OrderSymbol;