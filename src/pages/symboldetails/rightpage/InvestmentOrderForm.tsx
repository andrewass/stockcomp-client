import {Box, CircularProgress, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import Button from "@mui/material/Button";
import toast, {Toaster} from 'react-hot-toast';
import {useMutation} from "@tanstack/react-query";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {CompleteParticipant} from "../../../participant/participantTypes";
import {StockPrice} from "../../../domain/symbols/symbolTypes";
import {useApiWrapper} from "../../../config/useApiWrapper";
import {codeMapTransaction, InvestmentOrderInput} from "../../../domain/investmentorder/investmentOrderTypes";
import {
    GET_ACTIVE_INVESTMENT_ORDERS_SYMBOL, GET_COMPLETED_INVESTMENT_ORDERS_SYMBOL,
    getPostInvestmentOrderConfig
} from "../../../domain/investmentorder/investmentOrderApi";
import {queryClient} from "../../../config/queryConfig";

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
        <Box component="form" onSubmit={handleSubmit(submitForm)}
             sx={{display: "flex", flexFlow: "column nowrap"}}>
            <Controller
                name="amount"
                control={control}
                rules={{required: "Amount is required"}}
                render={({field: {onChange, value}}) => (
                    <TextField sx={{mb: "1rem"}}
                               label="Amount"
                               variant="outlined"
                               value={value}
                               disabled={mutation.isPending}
                               onChange={onChange}/>
                )}
            />

            <Controller
                name="acceptedPrice"
                control={control}
                rules={{required: "Accepted price is required"}}
                render={({field: {onChange, value}}) => (
                    <TextField sx={{mb: "1rem"}}
                               label="Accepted Price"
                               variant="outlined"
                               value={value}
                               disabled={mutation.isPending}
                               onChange={onChange}/>
                )}
            />

            <Controller
                name="contestNumber"
                control={control}
                rules={{required: "Contest number is required"}}
                render={({field}) => (
                    <FormControl disabled={mutation.isPending} sx={{mb: "1rem"}}>
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
                    <FormControl disabled={mutation.isPending} sx={{mb: "1rem"}}>
                        <InputLabel>Operation</InputLabel>
                        <Select label="Operation" {...field} >
                            <MenuItem value="Buy">Buy</MenuItem>
                            <MenuItem value="Sell">Sell</MenuItem>
                        </Select>
                    </FormControl>
                )}
            />

            <Controller
                name="expirationTime"
                control={control}
                rules={{required: "Expiration time is required"}}
                render={({field: {onChange, value}}) => (
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DateTimePicker disabled={mutation.isPending}
                                        renderInput={(props) => <TextField {...props} />}
                                        label="Expiration"
                                        value={value}
                                        onChange={onChange}
                        />
                    </LocalizationProvider>
                )}
            />
            {mutation.isPending
                ? <CircularProgress/>
                : <Button type="submit" sx={{mt: "1rem"}}>
                    Submit
                </Button>
            }
            <Toaster/>
        </Box>
    );
}