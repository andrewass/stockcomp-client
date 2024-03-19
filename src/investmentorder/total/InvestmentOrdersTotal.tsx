import {useApiWrapper} from "../../config/useApiWrapper";
import {useQuery} from "@tanstack/react-query";
import {
    GET_ALL_ACTIVE_INVESTMENT_ORDERS,
    GET_ALL_COMPLETED_INVESTMENT_ORDERS, getAllActiveInvestmentOrdersConfig, getAllCompletedInvestmentOrdersConfig,
} from "../api/investmentOrderApi";
import {Box, CircularProgress} from "@mui/material";
import {ActiveOrdersTotal} from "./ActiveOrdersTotal";
import {CompletedOrdersTotal} from "./CompletedOrdersTotal";
import ErrorComponent from "../../error/ErrorComponent";
import {InvestmentOrder} from "../investmentOrderTypes";

interface Props{
    contestNumber: number
}

export const InvestmentOrdersTotal = (props: Props) => {
    const {apiGet} = useApiWrapper();

    const {error: activeError, data: activeOrders} = useQuery<InvestmentOrder[]>(
        [GET_ALL_ACTIVE_INVESTMENT_ORDERS],
        () => apiGet(getAllActiveInvestmentOrdersConfig(props.contestNumber))
    );

    const {error: completedError, data: completedOrders} = useQuery<InvestmentOrder[]>(
        [GET_ALL_COMPLETED_INVESTMENT_ORDERS],
        () => apiGet(getAllCompletedInvestmentOrdersConfig(props.contestNumber))
    );

    if (!(activeOrders && completedOrders)) return <CircularProgress/>

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