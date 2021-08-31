import React from "react";
import ActiveOrders from "./ActiveOrders";
import CompletedOrders from "./CompletedOrders";

const OrderMenu = ({activeOrders, completedOrders, populateOrderList}) => {

    return(
        <div>
            <ActiveOrders activeOrders={activeOrders} populateOrderList={populateOrderList}/>
            <CompletedOrders completedOrders={completedOrders}/>
        </div>
    );
}

export default OrderMenu;