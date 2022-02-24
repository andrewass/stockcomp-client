import ActiveOrders from "../order/ActiveOrders";
import CompletedOrders from "../order/CompletedOrders";
import {getActiveOrdersParticipant, getCompletedOrdersParticipant} from "../../../service/investmentOrderService";
import {useQuery} from "react-query";
import {CircularProgress} from "@mui/material";


const OrderTotal = ({contest}) => {

    const fetchActiveOrders = async () => {
        const response = await getActiveOrdersParticipant(contest.contestNumber);
        return response.data;
    }

    const fetchCompletedOrders = async () => {
        const response = await getCompletedOrdersParticipant(contest.contestNumber);
        return response.data;
    }

    const {isLoading: activeLoading, error: activeError, data: activeData} =
        useQuery("getActiveOrdersParticipant", fetchActiveOrders);

    const {isLoading: completedLoading, error: completedError, data: completedData} =
        useQuery("getCompletedOrdersParticipant", fetchCompletedOrders);

    if (activeLoading || completedLoading) return <CircularProgress/>

    if (activeError || completedError) return `Error! ${activeError ? activeError : completedError}`;

    return (
        <>
            <ActiveOrders activeOrders={activeData}/>
            <CompletedOrders completedOrders={completedData}/>
        </>
    );
}

export default OrderTotal;