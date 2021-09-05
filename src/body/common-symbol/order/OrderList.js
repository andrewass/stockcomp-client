import React from "react";
import Order from "./Order";

const OrderList = ({orders, deleteOrder}) => {

    if(orders.length === 0){
        return <p>-- No orders available --</p>
    } else {
        return (
            <div className="orderList">
                <ul>
                    {orders.map((order) =>
                        <Order order={order} key={order.orderId} deleteOrder={deleteOrder}/>
                    )}
                </ul>
            </div>
        )
    }
}

export default OrderList;