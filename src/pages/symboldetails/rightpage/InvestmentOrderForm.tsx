import {Box, FormControl, InputLabel, MenuItem, Select, Stack} from "@mui/material";
import Button from "@mui/material/Button";
import toast, {Toaster} from 'react-hot-toast';
import {useMutation} from "@tanstack/react-query";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {StockPrice} from "../../../domain/symbols/symbolTypes";
import {useApiWrapper} from "../../../config/useApiWrapper";
import {codeMapTransaction, InvestmentOrderInput} from "../../../domain/investmentorder/investmentOrderTypes";
import {
    GET_ACTIVE_INVESTMENT_ORDERS_SYMBOL,
    GET_COMPLETED_INVESTMENT_ORDERS_SYMBOL,
    getPostInvestmentOrderConfig
} from "../../../domain/investmentorder/investmentOrderApi";
import {queryClient} from "../../../config/queryConfig";
import ControlledTextField from "../../../components/form/ControlledTextField";
import {CompleteParticipant} from "../../../domain/participant/participantTypes";
import ControlledDateTimePicker from "../../../components/form/ControlledDateTimePicker";

interface Props {
    participants: CompleteParticipant[]
    symbol: string
    stockPrice: StockPrice
}

export const InvestmentOrderForm = ({stockPrice, symbol, participants}: Props) => {
    const {apiPost} = useApiWrapper();
    const {handleSubmit, control} = useForm<InvestmentOrderInput>({
        defaultValues: {
            transactionType: "Buy",
            amount: 1,
            acceptedPrice: stockPrice.currentPrice
        }
    });

    const mutation = useMutation({
        mutationFn: (orderData: InvestmentOrderInput) => {
            orderData.symbol = symbol
            orderData.currency = stockPrice.currency
            orderData.transactionType = codeMapTransaction.get(orderData.transactionType) as string
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


    const submitForm: SubmitHandler<InvestmentOrderInput> = data => {
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

                <Controller
                    name="contestNumber"
                    control={control}
                    rules={{required: "Contest number is required"}}
                    render={({field}) => (
                        <FormControl disabled={mutation.isPending}>
                            <InputLabel>Operation</InputLabel>
                            <Select label="Operation" {...field} >
                                <MenuItem value="Buy">Buy</MenuItem>
                                <MenuItem value="Sell">Sell</MenuItem>
                            </Select>
                        </FormControl>
                    )}
                />

                <Controller
                    name="transactionType"
                    control={control}
                    rules={{required: "Transaction type is required"}}
                    render={({field}) => (
                        <FormControl disabled={mutation.isPending}>
                            <InputLabel>Operation</InputLabel>
                            <Select label="Operation" {...field} >
                                <MenuItem value="Buy">Buy</MenuItem>
                                <MenuItem value="Sell">Sell</MenuItem>
                            </Select>
                        </FormControl>
                    )}
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
