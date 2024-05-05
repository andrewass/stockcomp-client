import React from "react";
import {useApiWrapper} from "../../config/useApiWrapper";
import {
    GET_ALL_ACTIVE_INVESTMENT_ORDERS,
    GET_ALL_COMPLETED_INVESTMENT_ORDERS,
    getDeleteInvestmentOrderConfig
} from "../api/investmentOrderApi";
import {queryClient} from "../../config/queryConfig";
import toast from "react-hot-toast";
import {ActiveOrders} from "../ActiveOrders";
import {InvestmentOrder} from "../investmentOrderTypes";
import {useMutation} from "@tanstack/react-query";


export const ActiveOrdersTotal = ({activeOrders}: { activeOrders: InvestmentOrder[] }) => {
    const {apiDelete} = useApiWrapper();

    const mutation = useMutation({
        mutationFn: (orderId: number) => {
            return apiDelete(getDeleteInvestmentOrderConfig(orderId))
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: [GET_ALL_ACTIVE_INVESTMENT_ORDERS]});
            await queryClient.invalidateQueries({queryKey: [GET_ALL_COMPLETED_INVESTMENT_ORDERS]});
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
