import {deleteActiveOrder} from "../../../service/investmentOrderService";
import OrderList from "./OrderList";
import React, {useState} from "react";
import "./orders.css";
import rightArrow from "../../../icons/right-arrow.svg";
import downArrow from "../../../icons/down-arrow.svg";

const ActiveOrders = ({activeOrders, populateOrderList}) => {

    const [renderOrders, setRenderOrders] = useState(false);
    const [currentIcon, setCurrentIcon] = useState(rightArrow);

    const toggleOrders = () => {
        setCurrentIcon(currentIcon === rightArrow ? downArrow : rightArrow);
        setRenderOrders(!renderOrders)
    }

    const deleteOrder = async (orderId) => {
        await deleteActiveOrder(orderId);
        await populateOrderList();
    }

    return (
        <div id="activeOrders">
            <div className="listToggle">
                <h3>Active orders</h3>
                <img src={currentIcon} className="currentIcon" onClick={toggleOrders} alt="Current icon"/>
            </div>
            <OrderList orders={activeOrders} deleteOrder={deleteOrder} renderOrders={renderOrders}/>
        </div>
    );
}

export default ActiveOrders;