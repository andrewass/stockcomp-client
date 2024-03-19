import {useApiWrapper} from "../../config/useApiWrapper";
import {useQuery} from "@tanstack/react-query";
import {GET_ACTIVE_INVESTMENT_ORDERS_SYMBOL, getSymbolActiveInvestmentOrdersConfig,} from "../api/investmentOrderApi";
import {Box, CircularProgress} from "@mui/material";
import {ActiveOrdersSymbol} from "./ActiveOrdersSymbol";
import ErrorComponent from "../../error/ErrorComponent";

export const InvestmentOrdersSymbol = ({contestNumber, symbol}: {
    contestNumber: number,
    symbol: string,
}) => {

    const {apiGet} = useApiWrapper();

    const {isLoading, error , data: activeOrders} =
        useQuery(
            [GET_ACTIVE_INVESTMENT_ORDERS_SYMBOL, symbol],
            () => apiGet(getSymbolActiveInvestmentOrdersConfig(contestNumber, symbol))
        );

    if (isLoading) return <CircularProgress/>

    if (error)
        return <ErrorComponent errorMessage={error as string}/>

    return (
        <Box>
            {activeOrders.length > 0 &&
                <ActiveOrdersSymbol activeOrders={activeOrders} symbol={symbol}/>
            }
        </Box>
    );
}
