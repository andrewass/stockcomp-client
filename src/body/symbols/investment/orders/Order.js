import React from "react";

const Order = ({order, deleteOrder}) => {

    const completedAmount = order.totalAmount - order.remainingAmount;

    if (order.status === "Active") {
        return (
            <div id="activeOrder">
                <span>{order.symbol} - {order.transactionType} Status : {completedAmount}/{order.totalAmount} at $ {order.acceptedPrice.toFixed(2)}</span>
                <button id="cancelOrder" type="button" onClick={() => deleteOrder(order.orderId)}>X</button>
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