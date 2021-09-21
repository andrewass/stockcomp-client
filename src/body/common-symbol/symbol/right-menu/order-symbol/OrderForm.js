import React from "react";
import OperationDropDown from "./OperationDropDown";
import OrderFormState from "./OrderFormState";
import "./orderForm.css";

const OrderForm = ({symbol, contest, currentPrice}) => {

    const {
        setOrderAmount, setAcceptedPrice, setExpirationTime, setOperationType, sendOrder
    } = OrderFormState(symbol, contest, currentPrice);

    return (
        <form id="submitOrderForm">
            <div id="orderGrid">
                <div id="orderQuantity">
                    <span>Quantity </span>
                    <input id="quantityInput" type="text" placeholder="1"
                           onChange={event => setOrderAmount(event.target.value)}/>
                </div>
                <div id="orderPrice">
                    <span>Price</span>
                    <input id="acceptedPrice" type="text" placeholder={currentPrice.price}
                           onChange={event => setAcceptedPrice(event.target.value)}/>
                </div>
                <OperationDropDown setOperationType={setOperationType}/>
                <div id="orderExpiration">
                    <span>Expiration</span>
                    <input id="expirationDate" type="date"
                           onChange={event => setExpirationTime(event.target.value)}/>
                </div>
            </div>
            <input type="button" id="orderSubmit" value="Submit" onClick={sendOrder}/>
        </form>
    );
}

export default OrderForm;