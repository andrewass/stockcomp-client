import {useApiWrapper} from "../../config/apiWrapper";
import {useQuery} from "react-query";
import {
    GET_ALL_ACTIVE_INVESTMENT_ORDERS,
    GET_ALL_COMPLETED_INVESTMENT_ORDERS,
    getAllInvestmentOrdersConfig
} from "../api/investmentOrderApi";
import {Box, CircularProgress} from "@mui/material";
import {ActiveOrdersTotal} from "./ActiveOrdersTotal";
import {CompletedOrdersTotal} from "./CompletedOrdersTotal";
import ErrorComponent from "../../error/ErrorComponent";
import {ORDER_STATUS} from "../investmentOrderTypes";


export const InvestmentOrdersTotal = () => {
    const {apiPost} = useApiWrapper()

    const {isLoading: activeLoading, error: activeError, data: activeOrders} =
        useQuery(GET_ALL_ACTIVE_INVESTMENT_ORDERS,
            () => apiPost(getAllInvestmentOrdersConfig([ORDER_STATUS.ACTIVE])))

    const {isLoading: completedLoading, error: completedError, data: completedOrders} =
        useQuery(GET_ALL_COMPLETED_INVESTMENT_ORDERS,
            () => apiPost(getAllInvestmentOrdersConfig([ORDER_STATUS.COMPLETED])))

    if (activeLoading || completedLoading) return <CircularProgress/>

    if (activeError || completedError)
        return <ErrorComponent errorMessage={activeError ? activeError as string : completedError as string}/>

    return (
        <Box>
            {activeOrders.length > 0 &&
                <ActiveOrdersTotal activeOrders={activeOrders}/>
            }
            {completedOrders.length > 0 &&
                <CompletedOrdersTotal completedOrders={completedOrders}/>
            }
        </Box>
    );
}