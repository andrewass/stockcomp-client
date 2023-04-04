import {useApiWrapper} from "../../config/apiWrapper";
import {useQuery} from "react-query";
import {
    GET_ACTIVE_INVESTMENT_ORDERS_SYMBOL,
    GET_COMPLETED_INVESTMENT_ORDERS_SYMBOL,
    getInvestmentOrdersSymbolConfig
} from "../api/investmentOrderApi";
import {Box, CircularProgress} from "@mui/material";
import {ActiveOrdersSymbol} from "./ActiveOrdersSymbol";
import {CompletedOrdersSymbol} from "./CompletedOrdersSymbol";
import ErrorComponent from "../../error/ErrorComponent";
import {ORDER_STATUS} from "../investmentOrderTypes";

export const InvestmentOrdersSymbol = ({contestNumber, symbol}: {
    contestNumber: number,
    symbol: string,
}) => {

    const {apiPost} = useApiWrapper()

    const {isLoading: activeLoading, error: activeError, data: activeOrders} =
        useQuery([GET_ACTIVE_INVESTMENT_ORDERS_SYMBOL, symbol],
            () => apiPost(getInvestmentOrdersSymbolConfig(symbol, contestNumber, [ORDER_STATUS.ACTIVE])));

    const {isLoading: completedLoading, error: completedError, data: completedOrders} =
        useQuery([GET_COMPLETED_INVESTMENT_ORDERS_SYMBOL, symbol],
            () => apiPost(getInvestmentOrdersSymbolConfig(symbol, contestNumber, [ORDER_STATUS.COMPLETED])));


    if (activeLoading || completedLoading) return <CircularProgress/>

    if (activeError || completedError)
        return <ErrorComponent errorMessage={activeError ? activeError as string : completedError as string}/>

    return (
        <Box>
            {activeOrders.length > 0 &&
                <ActiveOrdersSymbol activeOrders={activeOrders} symbol={symbol}/>
            }
            {completedOrders.length > 0 &&
                <CompletedOrdersSymbol completedOrders={completedOrders}/>
            }
        </Box>
    )
}
