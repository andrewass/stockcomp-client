import {Box, Stack} from "@mui/material";
import Button from "@mui/material/Button";
import toast, {Toaster} from 'react-hot-toast';
import {useMutation} from "@tanstack/react-query";
import {SubmitHandler, useForm} from "react-hook-form";
import {StockPrice} from "../../../domain/symbols/symbolTypes";
import {useApiWrapper} from "../../../config/useApiWrapper";
import {InvestmentOrderRequest} from "../../../domain/investmentorder/investmentOrderTypes";
import {
    GET_ACTIVE_INVESTMENT_ORDERS_SYMBOL,
    GET_COMPLETED_INVESTMENT_ORDERS_SYMBOL,
    getPostInvestmentOrderConfig
} from "../../../domain/investmentorder/investmentOrderApi";
import {queryClient} from "../../../config/queryConfig";
import ControlledTextField from "../../../components/form/ControlledTextField";
import {CompleteParticipant} from "../../../domain/participant/participantTypes";
import ControlledDateTimePicker from "../../../components/form/ControlledDateTimePicker";
import ControlledSelect from "../../../components/form/ControlledSelect";

interface Props {
    participants: CompleteParticipant[]
    symbol: string
    stockPrice: StockPrice
}

export const operationTypeRecord: Record<string, string> = {
    "BUY": "Buy",
    "SELL": "Sell"
}

export const contestRecord = (participants: CompleteParticipant[]): Record<number, string> => {
    const records = participants.reduce((record, participant) => {
        record[participant.participant.participantId] = participant.participant.contestName;
        return record;
    }, {} as Record<number, string>);
    return records;
};


export const InvestmentOrderForm = ({participants, stockPrice, symbol}: Props) => {
    const {apiPost} = useApiWrapper();
    const {handleSubmit, control} = useForm<InvestmentOrderRequest>({
        defaultValues: {
            symbol: symbol,
            transactionType: "BUY",
            participantId: participants[0].participant.participantId,
            amount: 1,
            acceptedPrice: stockPrice.currentPrice,
            currency: stockPrice.currency,
        }
    });

    const mutation = useMutation({
        mutationFn: (orderData: InvestmentOrderRequest) => {
            return apiPost(getPostInvestmentOrderConfig(orderData))
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: [GET_ACTIVE_INVESTMENT_ORDERS_SYMBOL, symbol]});
            await queryClient.invalidateQueries({queryKey: [GET_COMPLETED_INVESTMENT_ORDERS_SYMBOL, symbol]});
            toast.success("Successfully submitted order for symbol " + symbol);
        },
        onError: () => {
            toast.error("Unable to submit investment order", {
                duration: 4000,
                position: "top-center"
            });
        },
    });

    const submitForm: SubmitHandler<InvestmentOrderRequest> = data => {
        mutation.mutate(data);
    }

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(submitForm)}
        >
            <Stack gap={2}>
                <ControlledTextField
                    name="amount"
                    label="Amount"
                    control={control}
                    rules={{required: "Amount is required"}}
                />
                <ControlledTextField
                    name="acceptedPrice"
                    label="Accepted Price"
                    control={control}
                    rules={{required: "Accepted price is required"}}
                />
                <ControlledSelect
                    name="participantId"
                    label="Contest"
                    control={control}
                    items={contestRecord(participants)}
                    rules={{required: "Contest is required"}}
                    disabled={mutation.isPending}
                />
                <ControlledSelect
                    name="transactionType"
                    label="Operation"
                    control={control}
                    items={operationTypeRecord}
                    rules={{required: "Transaction type is required"}}
                    disabled={mutation.isPending}
                />
                <ControlledDateTimePicker
                    name="expirationTime"
                    label="Expiration"
                    control={control}
                    disabled={mutation.isPending}
                    rules={{required: "Expiration time is required"}}
                />
                <Button type="submit" variant="outlined">
                    Submit
                </Button>
                <Toaster/>
            </Stack>
        </Box>
    );
}
