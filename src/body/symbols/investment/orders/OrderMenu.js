import React from "react";
import ActiveOrders from "./ActiveOrders";
import CompletedOrders from "./CompletedOrders";

const OrderMenu = () => {

    return(
        <div>
            <ActiveOrders/>
            <CompletedOrders/>
        </div>
    );
}

export default OrderMenu;