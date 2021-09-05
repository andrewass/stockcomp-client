import {useState} from "react";
import {placeBuyOrder, placeSellOrder} from "../../../../service/investmentOrderService";

const OrderFormState = (symbol) => {

    const [acceptedPrice, setAcceptedPrice] = useState();
    const [expirationTime, setExpirationTime] = useState();
    const [orderAmount, setOrderAmount] = useState();
    const [remainingFunds, setRemainingFunds] = useState();
    const [amountInvested, setAmountInvested] = useState(0);
    const [investmentValue, setInvestmentValue] = useState(0);
    const [investmentProfit, setInvestmentProfit] = useState(0);
    const [activeContest, setActiveContest] = useState();
    const [operationType, setOperationType] = useState("BUY");

    const createInvestmentOrderRequest = () => {
        return {
            expirationTime: expirationTime,
            acceptedPrice: parseFloat(acceptedPrice),
            //currency: realTimePrice.currency,
            symbol: symbol.symbol,
            amount: parseInt(orderAmount),
            contestNumber: activeContest.contestNumber,
        }
    }

    const sendOrder = async () => {
        operationType === "BUY"
            ? await placeBuyOrder(createInvestmentOrderRequest())
            : await placeSellOrder(createInvestmentOrderRequest());
        //await populateOrderList();
    }

    return {
        remainingFunds, amountInvested, investmentProfit, investmentValue,
        setOrderAmount, setAcceptedPrice, setExpirationTime, setOperationType,
        sendOrder
    }
}

export default OrderFormState;