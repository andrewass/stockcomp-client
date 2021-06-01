import React, {useState} from "react";
import OrderState from "./OrderState";

const Order = ({order}) => {


    const {completedAmount, deleteOrder} = OrderState(order);

    if (order.status === "Active") {
        return (
            <div id="activeOrder">
                <span>{order.symbol} - {order.transactionType} Status : {completedAmount}/{order.totalAmount} at $ {order.acceptedPrice.toFixed(2)}</span>
                <button id="cancelOrder" type="button" onClick={deleteOrder}>X</button>
            </div>
        );
    } else {
        return (
            <div id="completedOrder">
                <span>{order.symbol} - {order.transactionType} Status : {completedAmount}/{order.totalAmount} at $ {order.acceptedPrice.toFixed(2)}</span>
            </div>
        );
    }
}

export default Order;