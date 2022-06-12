import ActiveOrders from "./ActiveOrders";
import CompletedOrders from "./CompletedOrders";
import {getInvestmentOrders} from "../../api/investmentOrderClient";
import {useQuery} from "react-query";
import {CircularProgress} from "@mui/material";
import {ORDER_STATUS} from "../../util/constants";
import {Contest} from "../../types/contest";
import ErrorComponent from "../common/ErrorComponent";

interface Props {
    contest: Contest
}

const InvestmentOrderTotal = ({contest}: Props) => {

    const {contestNumber} = contest

    const fetchActiveOrders = async () => {
        return await getInvestmentOrders(contestNumber, [ORDER_STATUS.ACTIVE])
    }

    const fetchCompletedOrders = async () => {
        return await getInvestmentOrders(contestNumber, [ORDER_STATUS.COMPLETED])
    }

    const {isLoading: activeLoading, error: activeError, data: activeOrders} =
        useQuery("getActiveOrdersParticipant", fetchActiveOrders)

    const {isLoading: completedLoading, error: completedError, data: completedOrders} =
        useQuery("getCompletedOrdersParticipant", fetchCompletedOrders)

    if (activeLoading || completedLoading) return <CircularProgress/>

    if (activeError || completedError) return <ErrorComponent errorMessage={
        activeError ? activeError as string : completedError as string
    }/>

    return (
        <>
            <ActiveOrders activeOrders={activeOrders}/>
            <CompletedOrders completedOrders={completedOrders}/>
        </>
    );
}

export default InvestmentOrderTotal