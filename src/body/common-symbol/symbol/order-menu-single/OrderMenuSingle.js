import React from "react";
import ActiveOrders from "../../order/ActiveOrders";
import CompletedOrders from "../../order/CompletedOrders";

const OrderMenuSingle = ({activeOrders, completedOrders, populateOrderList}) => {

    return(
        <div>
            <ActiveOrders activeOrders={activeOrders} populateOrderList={populateOrderList}/>
            <CompletedOrders completedOrders={completedOrders}/>
        </div>
    );
}

export default OrderMenuSingle;