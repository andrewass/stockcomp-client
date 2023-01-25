import ActiveOrders from "./ActiveOrders";
import CompletedOrders from "./CompletedOrders";
import {InvestmentOrderForm} from "./InvestmentOrderForm";
import {useQuery} from "react-query";
import {CircularProgress} from "@mui/material";
import {StockQuote} from "../symboldetails/symbolDetailTypes";
import {ORDER_STATUS} from "../util/constants";
import ErrorComponent from "../components/common/ErrorComponent";
import {
    GET_ACTIVE_INVESTMENT_ORDERS_SYMBOL,
    GET_COMPLETED_INVESTMENT_ORDERS_SYMBOL,
    getInvestmentOrdersSymbolConfig
} from "./api/investmentOrderApi";
import {useApiWrapper} from "../config/apiWrapper";

interface Props {
    contestNumber: number
    symbol: string
    stockQuote: StockQuote
}

export const InvestmentOrdersSymbol = ({contestNumber, symbol, stockQuote}: Props) => {
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
        <div>
            <InvestmentOrderForm symbol={symbol} contestNumber={contestNumber} stockQuote={stockQuote}/>
            <ActiveOrders activeOrders={activeOrders}/>
            <CompletedOrders completedOrders={completedOrders}/>
        </div>
    )
}
