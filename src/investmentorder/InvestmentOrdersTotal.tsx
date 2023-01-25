import ActiveOrders from "./ActiveOrders";
import CompletedOrders from "./CompletedOrders";
import {useQuery} from "react-query";
import {CircularProgress} from "@mui/material";
import {useApiWrapper} from "../config/apiWrapper";
import {ORDER_STATUS} from "../util/constants";
import ErrorComponent from "../components/common/ErrorComponent";
import {
    GET_ALL_ACTIVE_INVESTMENT_ORDERS,
    GET_ALL_COMPLETED_INVESTMENT_ORDERS,
    getInvestmentOrdersConfig
} from "./api/investmentOrderApi";

interface Props {
    contestNumber: number
}

export const InvestmentOrdersTotal = ({contestNumber}: Props) => {
    const {apiPost} = useApiWrapper()

    const {isLoading: activeLoading, error: activeError, data: activeOrders} =
        useQuery(GET_ALL_ACTIVE_INVESTMENT_ORDERS,
            () => apiPost(getInvestmentOrdersConfig(contestNumber, [ORDER_STATUS.ACTIVE])))

    const {isLoading: completedLoading, error: completedError, data: completedOrders} =
        useQuery(GET_ALL_COMPLETED_INVESTMENT_ORDERS,
            () => apiPost(getInvestmentOrdersConfig(contestNumber, [ORDER_STATUS.COMPLETED])))

    if (activeLoading || completedLoading) return <CircularProgress/>

    if (activeError || completedError)
        return <ErrorComponent errorMessage={activeError ? activeError as string : completedError as string}/>

    return (
        <>
            <ActiveOrders activeOrders={activeOrders}/>
            <CompletedOrders completedOrders={completedOrders}/>
        </>
    );
}