import React from "react";
import OperationDropDown from "./OperationDropDown";
import OrderFormState from "./OrderFormState";

const OrderForm = ({symbol, contest, currentPrice}) => {

    const {setOrderAmount, setAcceptedPrice, setExpirationTime, setOperationType, sendOrder
    } = OrderFormState(symbol, contest, currentPrice);

    return (
        <div>
            <form id="submitOrderForm">
                <div>
                    <span>Order amount : </span>
                    <input id="orderAmount" type="text" placeholder="0"
                           onChange={event => setOrderAmount(event.target.value)}/>
                </div>
                <div>
                    <span>Accepted price</span>
                    <input id="acceptedPrice" type="text" placeholder={currentPrice.price}
                           onChange={event => setAcceptedPrice(event.target.value)}/>
                </div>
                <div>
                    <span>Expiration date</span>
                    <input id="expirationDate" type="date"
                           onChange={event => setExpirationTime(event.target.value)}/>
                </div>
                <OperationDropDown setOperationType={setOperationType}/>
                <input type="button" id="orderSubmit" value="Send" onClick={sendOrder}/>
            </form>
        </div>
    );
}

export default OrderForm;