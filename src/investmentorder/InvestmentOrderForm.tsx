import "./investmentOrderForm.css";
import {CircularProgress, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import Button from "@mui/material/Button";
import toast, {Toaster} from 'react-hot-toast';
import {useMutation} from "react-query";
import {StockQuote} from "../symboldetails/symbolDetailTypes";
import {queryClient} from "../config/queryConfig";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {useApiWrapper} from "../config/apiWrapper";
import {
    GET_ACTIVE_INVESTMENT_ORDERS_SYMBOL,
    GET_COMPLETED_INVESTMENT_ORDERS_SYMBOL,
    getPostInvestmentOrderConfig
} from "./api/investmentOrderApi";
import {codeMapTransaction} from "../util/constants";

interface Props {
    symbol: string
    contestNumber: number
    stockQuote: StockQuote
}

export type InvestmentOrderRequest = {
    acceptedPrice: number
    expirationTime: string
    amount: number
    transactionType: string
    currency: string
    contestNumber: number
    symbol: string
}

export const InvestmentOrderForm = ({symbol, contestNumber, stockQuote}: Props) => {
    const {handleSubmit, control} = useForm<InvestmentOrderRequest>();
    const {apiPost} = useApiWrapper();

    const mutation = useMutation({
        mutationFn: (orderData: InvestmentOrderRequest) => {
            orderData.symbol = symbol
            orderData.contestNumber = contestNumber
            orderData.currency = stockQuote.currency
            orderData.transactionType = codeMapTransaction.get(orderData.transactionType) as string
            return apiPost(getPostInvestmentOrderConfig(orderData))
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries([GET_ACTIVE_INVESTMENT_ORDERS_SYMBOL, symbol]);
            await queryClient.invalidateQueries([GET_COMPLETED_INVESTMENT_ORDERS_SYMBOL, symbol]);
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
        <form id="submitOrderForm" onSubmit={handleSubmit(submitForm)}>
            <Controller
                name="amount"
                control={control}
                rules={{required: "Amount is required"}}
                render={({field: {onChange, value}}) => (
                    <TextField
                        label="Amount"
                        variant="outlined"
                        value={value}
                        disabled={mutation.isLoading}
                        onChange={onChange}/>
                )}
            />

            <Controller
                name="acceptedPrice"
                control={control}
                rules={{required: "Accepted price is required"}}
                render={({field: {onChange, value}}) => (
                    <TextField
                        label="Accepted Price"
                        variant="outlined"
                        value={value}
                        disabled={mutation.isLoading}
                        onChange={onChange}/>
                )}
            />

            <Controller
                name="transactionType"
                control={control}
                rules={{required: "Transaction type is required"}}
                render={({field: {onChange, value}}) => (
                    <FormControl disabled={mutation.isLoading}>
                        <InputLabel>Operation</InputLabel>
                        <Select value={value} label="Operation" onChange={onChange}>
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
                        <DateTimePicker disabled={mutation.isLoading}
                                        renderInput={(props) => <TextField {...props} />}
                                        label="Expiration"
                                        value={value}
                                        onChange={onChange}
                        />
                    </LocalizationProvider>
                )}
            />
            {mutation.isLoading
                ? <CircularProgress/>
                : <Button variant="contained" type="submit">Submit</Button>
            }
            <Toaster/>
        </form>
    );
}