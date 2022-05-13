import ActiveOrders from "../../investmentorder/ActiveOrders";
import CompletedOrders from "../../investmentorder/CompletedOrders";
import {getInvestmentOrders} from "../../investmentorder/client/investmentOrderClient";
import {useQuery} from "react-query";
import {CircularProgress} from "@mui/material";
import {ORDER_STATUS} from "../../../util/constants";


const OrderTotal = ({contest}) => {

    const {contestNumber} = contest;

    const fetchActiveOrders = async () => {
        return await getInvestmentOrders(contestNumber, [ORDER_STATUS.ACTIVE]);
    }

    const fetchCompletedOrders = async () => {
        return await getInvestmentOrders(contestNumber, [ORDER_STATUS.COMPLETED]);
    }

    const {isLoading: activeLoading, error: activeError, data: activeOrders} =
        useQuery("getActiveOrdersParticipant", fetchActiveOrders);

    const {isLoading: completedLoading, error: completedError, data: completedOrders} =
        useQuery("getCompletedOrdersParticipant", fetchCompletedOrders);

    if (activeLoading || completedLoading) return <CircularProgress/>

    if (activeError || completedError) return `Error! ${activeError ? activeError : completedError}`;

    return (
        <>
            <ActiveOrders activeOrders={activeOrders}/>
            <CompletedOrders completedOrders={completedOrders}/>
        </>
    );
}

export default OrderTotal;