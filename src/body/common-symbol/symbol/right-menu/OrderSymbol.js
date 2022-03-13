import ActiveOrders from "../../order/ActiveOrders";
import CompletedOrders from "../../order/CompletedOrders";
import {OrderForm} from "./OrderForm";
import {getInvestmentOrdersSymbol} from "../../../../service/investmentOrderService";
import {useQuery} from "react-query";
import {CircularProgress} from "@mui/material";
import {ORDER_STATUS} from "../../../../util/constants";


export const OrderSymbol = ({contest, symbol, stockQuote}) => {

    const {contestNumber} = contest;

    const fetchActiveOrdersSymbol = async () => {
        return await getInvestmentOrdersSymbol(symbol, contestNumber, [ORDER_STATUS.ACTIVE]);
    }

    const fetchCompletedOrdersSymbol = async () => {
        return await getInvestmentOrdersSymbol(symbol, contestNumber, [ORDER_STATUS.COMPLETED]);
    }

    const {isLoading: activeLoading, error: activeError, data: activeOrders} =
        useQuery("getActiveOrdersSymbol", fetchActiveOrdersSymbol);

    const {isLoading: completedLoading, error: completedError, data: completedOrders} =
        useQuery("getCompletedOrdersSymbol", fetchCompletedOrdersSymbol);

    if (activeLoading || completedLoading) return <CircularProgress/>;

    if (activeError || completedError) return `Error! ${activeError ? activeError : completedError}`;

    return (
        <div>
            <OrderForm symbol={symbol} contest={contest} stockQuote={stockQuote}/>
            <ActiveOrders activeOrders={activeOrders}/>
            <CompletedOrders completedOrders={completedOrders}/>
        </div>
    );
}
