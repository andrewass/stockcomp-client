import React, {useEffect} from "react";
import SymbolInvestmentSingleState from "./SymbolInvestmentSingleState";
import OperationDropDown from "./OperationDropDown";

const SymbolInvestmentSingle = ({symbol, populateOrderList, realTimePrice}) => {

    const {
        remainingFunds, amountInvested, fetchParticipantData, setExpirationTime, setAcceptedPrice,
        setOrderAmount, sendOrder, setOperationType, investmentProfit, investmentValue
    } = SymbolInvestmentSingleState(symbol, populateOrderList, realTimePrice);

    useEffect(() => {
        fetchParticipantData()
            .catch(error => console.log(error));
    }, [symbol]);

    const displayInvestmentProfit = () => {
        if (investmentProfit >= 0) {
            return <span id="positiveInvestmentProfit"> +{investmentProfit} USD</span>
        } else {
            return <span id="negativeInvestmentProfit"> {investmentProfit} USD</span>
        }
    }

    return (
        <div>
            <h2>Portfolio Status</h2>
            <p>Remaining funds : {remainingFunds}</p>
            <h4>{symbol.description} : </h4>
            <p>- Amount invested : {amountInvested}</p>
            <p>- Investment value : {investmentValue} USD</p>
            <p>- Investment profit : {displayInvestmentProfit()}</p>

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

export default SymbolInvestmentSingle;