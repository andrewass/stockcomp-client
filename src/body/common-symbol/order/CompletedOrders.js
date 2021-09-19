import OrderList from "./OrderList";
import React, {useState} from "react";
import "./orders.css";
import downArrow from "../../../icons/down-arrow.svg";
import rightArrow from "../../../icons/right-arrow.svg";

const CompletedOrders = ({completedOrders}) => {

    const [renderOrders, setRenderOrders] = useState(false);
    const [currentIcon, setCurrentIcon] = useState(rightArrow);

    const toggleOrders = () => {
        setCurrentIcon(currentIcon === rightArrow ? downArrow : rightArrow);
        setRenderOrders(!renderOrders)
    }

    return (
        <div id="CompletedOrders">
            <div className="orderToggle">
                <h3>Completed orders</h3>
                <img src={currentIcon} className="currentIcon" onClick={toggleOrders} alt="Current icon"/>
            </div>
            <OrderList orders={completedOrders} renderOrders={renderOrders}/>
        </div>
    );
}

export default CompletedOrders;