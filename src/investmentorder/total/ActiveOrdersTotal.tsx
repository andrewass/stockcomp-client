import React from "react";
import {useMutation} from "react-query";
import {InvestmentOrder} from "../../types/investmentorder";
import {useApiWrapper} from "../../config/apiWrapper";
import {
    GET_ALL_ACTIVE_INVESTMENT_ORDERS, GET_ALL_COMPLETED_INVESTMENT_ORDERS,
    getDeleteInvestmentOrderConfig
} from "../api/investmentOrderApi";
import {queryClient} from "../../config/queryConfig";
import toast from "react-hot-toast";
import {ActiveOrders} from "../ActiveOrders";


interface Props {
    activeOrders: InvestmentOrder[]
}

export const ActiveOrdersTotal = ({activeOrders}: Props) => {
    const {apiDelete} = useApiWrapper();

    const mutation = useMutation({
        mutationFn: (orderId: number) => {
            return apiDelete(getDeleteInvestmentOrderConfig(orderId))
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries(GET_ALL_ACTIVE_INVESTMENT_ORDERS);
            await queryClient.invalidateQueries(GET_ALL_COMPLETED_INVESTMENT_ORDERS);
            toast.success("Successfully deleted order");
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
