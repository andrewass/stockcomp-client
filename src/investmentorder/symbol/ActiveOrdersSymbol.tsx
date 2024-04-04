import React from "react";
import {useMutation} from "@tanstack/react-query";
import {useApiWrapper} from "../../config/useApiWrapper";
import {
    GET_ACTIVE_INVESTMENT_ORDERS_SYMBOL,
    GET_COMPLETED_INVESTMENT_ORDERS_SYMBOL,
    getDeleteInvestmentOrderConfig
} from "../api/investmentOrderApi";
import {queryClient} from "../../config/queryConfig";
import toast from "react-hot-toast";
import {ActiveOrders} from "../ActiveOrders";
import {CompleteParticipant} from "../../participant/participantTypes";

interface Props {
    participants: CompleteParticipant[],
    symbol: string
}

export const ActiveOrdersSymbol = ({participants, symbol}: Props) => {
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
        <ActiveOrders activeOrders={participants.flatMap(participant => participant.activeOrders)}
                      deleteOrder={mutation.mutate}
        />
    );
}
