import { Box, Stack } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { type SubmitHandler, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import StyledButton from "../../../components/button/StyledButton";
import ControlledDateTimeField from "../../../components/form/ControlledDateTimeField";
import ControlledSelect from "../../../components/form/ControlledSelect";
import ControlledTextField from "../../../components/form/ControlledTextField";
import { queryClient } from "../../../config/queryConfig";
import { useApiWrapper } from "../../../config/useApiWrapper";
import {
	GET_ACTIVE_INVESTMENT_ORDERS_SYMBOL,
	GET_COMPLETED_INVESTMENT_ORDERS_SYMBOL,
	getPostInvestmentOrderConfig,
} from "../../../domain/investmentorder/investmentOrderApi";
import type { InvestmentOrderRequest } from "../../../domain/investmentorder/investmentOrderTypes";
import type { DetailedParticipant } from "../../../domain/participant/participantTypes";
import type { StockPrice } from "../../../domain/symbols/symbolTypes";

interface Props {
	participants: DetailedParticipant[];
	symbol: string;
	stockPrice: StockPrice;
}

export const operationTypeRecord: Record<string, string> = {
	BUY: "Buy",
	SELL: "Sell",
};

const contestRecord = (
	participants: DetailedParticipant[],
): Record<string, string> => {
	return participants.reduce(
		(record, participant) => {
			record[participant.participant.participantId.toString()] =
				participant.contest.contestName;
			return record;
		},
		{} as Record<string, string>,
	);
};

export const InvestmentOrderForm = ({
	participants,
	stockPrice,
	symbol,
}: Props) => {
	const { apiPost } = useApiWrapper();

	const { handleSubmit, control } = useForm<InvestmentOrderRequest>({
		defaultValues: {
			symbol: symbol,
			transactionType: "BUY",
			participantId: participants[0]?.participant.participantId,
			amount: 1,
			acceptedPrice: stockPrice.currentPrice,
			currency: stockPrice.currency,
		},
	});

	const mutation = useMutation({
		mutationFn: (orderData: InvestmentOrderRequest) => {
			return apiPost(getPostInvestmentOrderConfig(orderData));
		},
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: [GET_ACTIVE_INVESTMENT_ORDERS_SYMBOL, symbol],
			});
			await queryClient.invalidateQueries({
				queryKey: [GET_COMPLETED_INVESTMENT_ORDERS_SYMBOL, symbol],
			});
			toast.success(`Successfully submitted order for symbol ${symbol}`);
		},
		onError: () => {
			toast.error("Unable to submit investment order", {
				duration: 4000,
				position: "top-center",
			});
		},
	});

	const submitForm: SubmitHandler<InvestmentOrderRequest> = (data) => {
		mutation.mutate(data);
	};

	return (
		<Box component="form" onSubmit={handleSubmit(submitForm)}>
			<Stack gap={2}>
				<ControlledTextField
					name="amount"
					label="Amount"
					control={control}
					rules={{ required: "Amount is required" }}
				/>
				<ControlledTextField
					name="acceptedPrice"
					label="Accepted Price"
					control={control}
					rules={{ required: "Accepted price is required" }}
				/>
				<ControlledSelect
					name="participantId"
					label="Contest"
					control={control}
					items={contestRecord(participants)}
					rules={{ required: "Contest is required" }}
					disabled={mutation.isPending}
				/>
				<ControlledSelect
					name="transactionType"
					label="Operation"
					control={control}
					items={operationTypeRecord}
					rules={{ required: "Transaction type is required" }}
					disabled={mutation.isPending}
				/>
				<ControlledDateTimeField
					name="expirationTime"
					label="Expiration"
					control={control}
					disabled={mutation.isPending}
					rules={{ required: "Expiration time is required" }}
				/>
				<StyledButton type="submit" variant="outlined" buttonText="Submit" />
				<Toaster />
			</Stack>
		</Box>
	);
};
