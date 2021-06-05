import React, {useEffect} from "react";
import SymbolInvestmentSingleState from "./SymbolInvestmentSingleState";
import OperationDropDown from "./OperationDropDown";

const SymbolInvestmentSingle = ({symbol, populateOrderList, currentPrice}) => {

    const {
        remainingFunds, amountInvested, fetchParticipantData, setExpirationTime, setAcceptedPrice,
        setOrderAmount, sendOrder, setOperationType, investmentReturns
    } = SymbolInvestmentSingleState(symbol, populateOrderList, currentPrice);

    useEffect(() => {
        fetchParticipantData()
            .catch(error => console.log(error));
    }, [symbol]);

    const displayInvestmentReturns = () => {
        if (investmentReturns >= 0) {
            return <span id="positiveInvestmentReturns"> +{investmentReturns} USD</span>
        } else {
            return <span id="negativeInvestmentReturns"> -{investmentReturns} USD</span>
        }
    }

    return (
        <div>
            <h2>Portfolio Status</h2>
            <p>Remaining funds : {remainingFunds}</p>
            <h4>{symbol.description} : </h4>
            <p>- Investment returns : {displayInvestmentReturns()}</p>
            <p>- Amount invested : {amountInvested}</p>

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