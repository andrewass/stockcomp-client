import {useState} from "react";
import {
    getActiveOrdersParticipantSymbol,
    getCompletedOrdersParticipantSymbol
} from "../../../../../service/investmentOrderService";


const OrderSymbolState = (contest, symbol) => {

    const [activeOrders, setActiveOrders] = useState([]);
    const [completedOrders, setCompletedOrders] = useState([]);

    const populateOrderList = async () => {
        if (contest) {
            let contestNumber = contest.contestNumber;
            const activeOrderSymbolResponse = await getActiveOrdersParticipantSymbol(contestNumber, symbol.symbol);
            const completedOrderSymbolResponse = await getCompletedOrdersParticipantSymbol(contestNumber, symbol.symbol);
            setActiveOrders(activeOrderSymbolResponse.data);
            setCompletedOrders(completedOrderSymbolResponse.data);
        }
    }

    return {
        populateOrderList, activeOrders, completedOrders
    }
}

export default OrderSymbolState;