import React, {useEffect} from "react";
import SymbolInvestmentState from "./SymbolInvestmentState";
import OperationDropDown from "./OperationDropDown";

const SymbolInvestment = ({symbol}) => {

    const {
        remainingFunds, amountInvested, fetchParticipantData, setExpirationTime, setAcceptedPrice,
        setOrderAmount, sendOrder, setOperationType
    } = SymbolInvestmentState(symbol);

    useEffect(() => {
        fetchParticipantData();
    }, []);

    return (
        <div>
            <h2>Portfolio Status</h2>
            <p>Remaining funds : {remainingFunds}</p>
            <p>Amount invested : {amountInvested}</p>
            <form id="submitOrderForm">
                <div>
                    <span>Order amount : </span>
                    <input id="orderAmount" type="text" placeholder="0"
                           onChange={event => setOrderAmount(event.target.value)}/>
                </div>
                <div>
                    <span>Accepted price</span>
                    <input id="acceptedPrice" type="text" placeholder="0"
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

export default SymbolInvestment;