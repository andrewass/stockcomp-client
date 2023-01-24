import {useEffect, useState} from "react";
import "./investmentOrderForm.css";
import {CircularProgress, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import Button from "@mui/material/Button";
import toast, {Toaster} from 'react-hot-toast';
import {placeInvestmentOrder} from "../../api/investmentOrderClient";
import {useMutation} from "react-query";
import {queryClient} from "../../config/queryConfig";
import {codeMapTransaction} from "../../util/constants";
import {StockQuote} from "../../symboldetails/symbolDetailTypes";

interface Props{
    symbol: string
    contestNumber: number
    stockQuote: StockQuote
}

export const InvestmentOrderForm = ({symbol, contestNumber, stockQuote}: Props) => {

    const [acceptedPrice, setAcceptedPrice] = useState(0.00);
    const [expirationTime, setExpirationTime] = useState("");
    const [orderAmount, setOrderAmount] = useState(1);
    const [operationType, setOperationType] = useState("Buy");

    useEffect(() => {
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 7);
        setExpirationTime(expirationDate.toISOString());
        setAcceptedPrice(stockQuote.price);
    }, [stockQuote]);

    const createInvestmentOrderRequest = () => {
        return {
            expirationTime: expirationTime,
            acceptedPrice: acceptedPrice,
            symbol: symbol,
            amount: orderAmount,
            contestNumber: contestNumber,
            currency: stockQuote.currency,
            transactionType: codeMapTransaction.get(operationType)
        }
    }

    const placeOrder = async () => {
        await placeInvestmentOrder(createInvestmentOrderRequest());
    }

    const mutation = useMutation(placeOrder, {
        onSuccess: async () => {
            await queryClient.invalidateQueries("getActiveOrdersSymbol");
            await queryClient.invalidateQueries("getCompletedOrdersSymbol");
            toast.success("Successfully submitted order for symbol " + symbol);
        },
        onError: () => {
            toast.error("Unable to submit investment order", {
                duration: 4000,
                position: "top-center"
            });
        },
    });

    return (
        <form id="submitOrderForm">
            <div id="orderGrid">
                <TextField label="Quantity" variant="outlined" disabled={mutation.isLoading}
                           value={orderAmount} onChange={event => setOrderAmount(parseInt(event.target.value))}/>

                <TextField label="Accepted Price" variant="outlined" value={acceptedPrice}
                           disabled={mutation.isLoading}
                           onChange={event => setAcceptedPrice(parseFloat(event.target.value))}/>

                <FormControl disabled={mutation.isLoading}>
                    <InputLabel>Operation</InputLabel>
                    <Select value={operationType} label="Operation"
                            onChange={event => setOperationType(event.target.value)}>
                        <MenuItem value="Buy">Buy</MenuItem>
                        <MenuItem value="Sell">Sell</MenuItem>
                    </Select>
                </FormControl>

                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker disabled={mutation.isLoading}
                                    renderInput={(props) => <TextField {...props} />}
                                    label="Expiration"
                                    value={expirationTime}
                                    onChange={newValue => setExpirationTime(newValue!)}
                    />
                </LocalizationProvider>

                {mutation.isLoading
                    ? <CircularProgress/>
                    : <Button variant="contained" onClick={() => mutation.mutate()}>Submit</Button>
                }
                <Toaster/>
            </div>
        </form>
    );
}