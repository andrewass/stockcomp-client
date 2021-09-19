import React from "react";
import Order from "./Order";

const OrderList = ({orders, deleteOrder, renderOrders}) => {

    if(renderOrders){
        return (
            <div className="orderList">
                <ul>
                    {orders.map((order) =>
                        <Order order={order} key={order.orderId} deleteOrder={deleteOrder}/>
                    )}
                </ul>
            </div>
        )
    } else{
        return null;
    }
}

export default OrderList;