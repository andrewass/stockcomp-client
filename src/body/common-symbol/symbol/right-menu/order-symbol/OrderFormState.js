import {useState} from "react";
import {placeBuyOrder, placeSellOrder} from "../../../../../service/investmentOrderService";

const OrderFormState = (symbol, contest) => {

    const [acceptedPrice, setAcceptedPrice] = useState();
    const [expirationTime, setExpirationTime] = useState();
    const [orderAmount, setOrderAmount] = useState();
    const [operationType, setOperationType] = useState("BUY");

    const createInvestmentOrderRequest = () => {
        return {
            expirationTime: expirationTime,
            acceptedPrice: parseFloat(acceptedPrice),
            symbol: symbol.symbol,
            amount: parseInt(orderAmount),
            contestNumber: contest.contestNumber,
        }
    }

    const sendOrder = async () => {
        operationType === "BUY"
            ? await placeBuyOrder(createInvestmentOrderRequest())
            : await placeSellOrder(createInvestmentOrderRequest());
        //await populateOrderList();
    }

    return {setOrderAmount, setAcceptedPrice, setExpirationTime, setOperationType, sendOrder}
}

export default OrderFormState;