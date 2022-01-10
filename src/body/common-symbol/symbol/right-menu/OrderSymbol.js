import React, {useEffect, useState} from "react";
import ActiveOrders from "../../order/ActiveOrders";
import CompletedOrders from "../../order/CompletedOrders";
import OrderForm from "./OrderForm";
import {
    getActiveOrdersParticipant,
    getActiveOrdersParticipantSymbol,
    getCompletedOrdersParticipantSymbol
} from "../../../../service/investmentOrderService";

const OrderSymbol = ({contest, symbol, stockQuote}) => {

    const [activeOrders, setActiveOrders] = useState([]);
    const [completedOrders, setCompletedOrders] = useState([]);

    const getActiveOrders = async () => {
        const response = await getActiveOrdersParticipant(contest.contestNumber);
        setActiveOrders(response.data);
    }

    const populateOrderList = async () => {
        if (contest) {
            let contestNumber = contest.contestNumber;
            const activeOrderSymbolResponse = await getActiveOrdersParticipantSymbol(contestNumber, symbol.symbol);
            const completedOrderSymbolResponse = await getCompletedOrdersParticipantSymbol(contestNumber, symbol.symbol);
            setActiveOrders(activeOrderSymbolResponse.data);
            setCompletedOrders(completedOrderSymbolResponse.data);
        }
    }

    useEffect(() => {
        populateOrderList().catch(error => console.log(error));
    }, []);

    return (
        <div>
            <OrderForm symbol={symbol} contest={contest}
                       stockQuote={stockQuote} populateOrderList={populateOrderList}/>
            <ActiveOrders activeOrders={activeOrders} getActiveOrders={getActiveOrders}/>
            <CompletedOrders completedOrders={completedOrders}/>
        </div>
    );
}

export default OrderSymbol;