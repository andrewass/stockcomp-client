import React from "react";
import {useMutation} from "react-query";
import {useApiWrapper} from "../../config/apiWrapper";
import {
    GET_ACTIVE_INVESTMENT_ORDERS_SYMBOL,
    GET_COMPLETED_INVESTMENT_ORDERS_SYMBOL,
    getDeleteInvestmentOrderConfig
} from "../api/investmentOrderApi";
import {queryClient} from "../../config/queryConfig";
import toast from "react-hot-toast";
import {ActiveOrders} from "../ActiveOrders";
import {InvestmentOrder} from "../investmentOrderTypes";


export const ActiveOrdersSymbol = ({activeOrders, symbol}: {
    activeOrders: InvestmentOrder[],
    symbol: string
}) => {

    const {apiDelete} = useApiWrapper();

    const mutation = useMutation({
        mutationFn: (orderId: number) => {
            return apiDelete(getDeleteInvestmentOrderConfig(orderId))
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries([GET_ACTIVE_INVESTMENT_ORDERS_SYMBOL, symbol]);
            await queryClient.invalidateQueries([GET_COMPLETED_INVESTMENT_ORDERS_SYMBOL, symbol]);
            toast.success("Successfully deleted order for symbol " + symbol);
        },
        onError: () => {
            toast.error("Unable to delete investment order", {
                duration: 4000,
                position: "top-center"
            });
        },
    });

    return (
        <ActiveOrders activeOrders={activeOrders} deleteOrder={mutation.mutate}/>
    );
}
