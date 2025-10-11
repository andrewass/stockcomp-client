import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { apiDelete } from "../../../config/apiWrapper";
import { queryClient } from "../../../config/queryConfig";
import {
	GET_ACTIVE_INVESTMENT_ORDERS_SYMBOL,
	GET_COMPLETED_INVESTMENT_ORDERS_SYMBOL,
	getDeleteInvestmentOrderConfig,
} from "../../../domain/investmentorder/investmentOrderApi";
import type { DetailedParticipant } from "../../../domain/participant/participantTypes";
import { ActiveOrders } from "../../../investmentorder/ActiveOrders";

interface Props {
	participants: DetailedParticipant[];
	symbol: string;
}

export const ActiveOrdersSymbol = ({ participants, symbol }: Props) => {
	const mutation = useMutation({
		mutationFn: (orderId: number) => {
			return apiDelete(getDeleteInvestmentOrderConfig(orderId));
		},
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: [GET_ACTIVE_INVESTMENT_ORDERS_SYMBOL, symbol],
			});
			await queryClient.invalidateQueries({
				queryKey: [GET_COMPLETED_INVESTMENT_ORDERS_SYMBOL, symbol],
			});
			toast.success(`Successfully deleted order for symbol ${symbol}`);
		},
		onError: () => {
			toast.error("Unable to delete investment order", {
				duration: 4000,
				position: "top-center",
			});
		},
	});

	return (
		<ActiveOrders
			activeOrders={participants.flatMap(
				(participant) => participant.activeOrders,
			)}
			deleteOrder={mutation.mutate}
		/>
	);
};
