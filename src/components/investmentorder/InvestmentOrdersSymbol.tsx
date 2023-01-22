import ActiveOrders from "./ActiveOrders";
import CompletedOrders from "./CompletedOrders";
import {InvestmentOrderForm} from "./InvestmentOrderForm";
import {getInvestmentOrdersSymbol} from "../../api/investmentOrderClient";
import {useQuery} from "react-query";
import {CircularProgress} from "@mui/material";
import {ORDER_STATUS} from "../../util/constants";
import ErrorComponent from "../common/ErrorComponent";
import {Contest} from "../../types/contest";
import {StockQuote} from "../../symboldetails/symbolDetailTypes";

interface Props {
    contest: Contest
    symbol: string
    stockQuote: StockQuote
}

export const InvestmentOrdersSymbol = ({contest, symbol, stockQuote}: Props) => {

    const {contestNumber} = contest

    const fetchActiveOrdersSymbol = async () => {
        return await getInvestmentOrdersSymbol(symbol, contestNumber, [ORDER_STATUS.ACTIVE])
    }

    const fetchCompletedOrdersSymbol = async () => {
        return await getInvestmentOrdersSymbol(symbol, contestNumber, [ORDER_STATUS.COMPLETED])
    }

    const {isLoading: activeLoading, error: activeError, data: activeOrders} =
        useQuery("getActiveOrdersSymbol", fetchActiveOrdersSymbol)

    const {isLoading: completedLoading, error: completedError, data: completedOrders} =
        useQuery("getCompletedOrdersSymbol", fetchCompletedOrdersSymbol)

    if (activeLoading || completedLoading) return <CircularProgress/>

    if (activeError || completedError)
        return <ErrorComponent errorMessage={activeError ? activeError as string : completedError as string}/>

    return (
        <div>
            <InvestmentOrderForm symbol={symbol} contest={contest} stockQuote={stockQuote}/>
            <ActiveOrders activeOrders={activeOrders}/>
            <CompletedOrders completedOrders={completedOrders}/>
        </div>
    )
}
