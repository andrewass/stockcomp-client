import React, {useEffect} from "react";
import ActiveOrders from "./ActiveOrders";
import CompletedOrders from "./CompletedOrders";
import OrderMenuState from "./OrderMenuState";

const OrderMenu = ({symbol}) => {

    const {populateOrderList, activeOrders, completedOrders} = OrderMenuState(symbol)

    useEffect(() => {
        populateOrderList();
    },[symbol]);

    return(
        <div>
            <ActiveOrders activeOrders={activeOrders}/>
            <CompletedOrders completedOrders={completedOrders}/>
        </div>
    );
}

export default OrderMenu;