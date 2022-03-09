import {useState} from "react";
import ActiveOrders from "../../order/ActiveOrders";
import CompletedOrders from "../../order/CompletedOrders";
import {OrderForm} from "./OrderForm";
import {
    getActiveOrdersParticipantSymbol,
    getCompletedOrdersSymbolParticipant
} from "../../../../service/investmentOrderService";
import {useQuery} from "react-query";
import {CircularProgress} from "@mui/material";


export const OrderSymbol = ({contestParticipant, symbol, stockQuote}) => {

    const [activeOrders, setActiveOrders] = useState([]);

    const {contest, participant} = contestParticipant;

    const fetchActiveOrdersSymbol = async () => {
        const response = await getActiveOrdersParticipantSymbol(contest.contestNumber, symbol);
        setActiveOrders(response.data);

        return response.data;
    }

    const fetchCompletedOrdersSymbol = async () => {
        const response = await getCompletedOrdersSymbolParticipant(contest.contestNumber, symbol);
        return response.data;
    }

    const {isLoading: activeLoading, error: activeError, data: activeData} =
        useQuery("getActiveOrdersSymbol", fetchActiveOrdersSymbol);

    const {isLoading: completedLoading, error: completedError, data: completedData} =
        useQuery("getCompletedOrdersSymbol", fetchCompletedOrdersSymbol);

    if (activeLoading || completedLoading) return <CircularProgress/>;

    if (activeError || completedError) return `Error! ${activeError ? activeError : completedError}`;

    return (
        <div>
            <OrderForm symbol={symbol} contest={contest} stockQuote={stockQuote} />
            <ActiveOrders activeOrders={activeOrders} getActiveOrders={fetchActiveOrdersSymbol}/>
            <CompletedOrders completedOrders={completedData}/>
        </div>
    );
}
