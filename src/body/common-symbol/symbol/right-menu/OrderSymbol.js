import React, {useEffect, useState} from "react";
import ActiveOrders from "../../order/ActiveOrders";
import CompletedOrders from "../../order/CompletedOrders";
import OrderForm from "./OrderForm";
import {
    getActiveOrdersParticipantSymbol,
    getCompletedOrdersParticipantSymbol
} from "../../../../service/investmentOrderService";

const OrderSymbol = ({contest, symbol, currentPrice}) => {

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

    useEffect(() => {
        populateOrderList()
            .catch(error => console.log(error));
    }, []);

    return (
        <div>
            <OrderForm symbol={symbol} contest={contest} currentPrice={currentPrice}/>
            <ActiveOrders activeOrders={activeOrders} populateOrderList={populateOrderList}/>
            <CompletedOrders completedOrders={completedOrders}/>
        </div>
    );
}

export default OrderSymbol;