import React from "react";
import {useMutation} from "@tanstack/react-query";
import {useApiWrapper} from "../../../config/useApiWrapper";
import {
    GET_ACTIVE_INVESTMENT_ORDERS_SYMBOL, GET_COMPLETED_INVESTMENT_ORDERS_SYMBOL,
    getDeleteInvestmentOrderConfig
} from "../../../domain/investmentorder/investmentOrderApi";
import {queryClient} from "../../../config/queryConfig";
import toast from "react-hot-toast";
import {ActiveOrders} from "../../../investmentorder/ActiveOrders";
import {DetailedParticipant} from "../../../domain/participant/participantTypes";

interface Props {
    participants: DetailedParticipant[],
    symbol: string
}

export const ActiveOrdersSymbol = ({participants, symbol}: Props) => {
    const {apiDelete} = useApiWrapper();
    const mutation = useMutation({
        mutationFn: (orderId: number) => {
            return apiDelete(getDeleteInvestmentOrderConfig(orderId))
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: [GET_ACTIVE_INVESTMENT_ORDERS_SYMBOL, symbol]});
            await queryClient.invalidateQueries({queryKey: [GET_COMPLETED_INVESTMENT_ORDERS_SYMBOL, symbol]});
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
