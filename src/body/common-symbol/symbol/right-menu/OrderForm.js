import {useState} from "react";
import "./orderForm.css";
import {CircularProgress, FormControl, InputLabel, Select, TextField} from "@mui/material";
import {DateTimePicker, LocalizationProvider} from "@mui/lab";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import toast, {Toaster} from 'react-hot-toast';
import {placeInvestmentOrder} from "../../../../service/investmentOrderService";
import {useMutation} from "react-query";
import {queryClient} from "../../../../config/queryConfig";
import {codeMap} from "../../../../util/constants";


export const OrderForm = ({symbol, contest, stockQuote}) => {

    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 7);

    const [acceptedPrice, setAcceptedPrice] = useState(stockQuote.price);
    const [expirationTime, setExpirationTime] = useState(expirationDate.toISOString());
    const [orderAmount, setOrderAmount] = useState(1);
    const [operationType, setOperationType] = useState("Buy");

    const createInvestmentOrderRequest = () => {
        return {
            expirationTime: expirationTime,
            acceptedPrice: parseFloat(acceptedPrice),
            symbol: symbol,
            amount: parseInt(orderAmount),
            contestNumber: contest.contestNumber,
            currency: stockQuote.currency,
            transactionType: codeMap.get(operationType)
        }
    }

    const placeOrder = async () => {
        await placeInvestmentOrder(createInvestmentOrderRequest());
    }

    const mutation = useMutation(placeOrder, {
        onSuccess: () => {
            queryClient.invalidateQueries("getActiveOrdersSymbol");
            queryClient.invalidateQueries("getCompletedOrdersSymbol");
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
                           value={orderAmount} onChange={event => setOrderAmount(event.target.value)}/>

                <TextField label="Accepted Price" variant="outlined" value={acceptedPrice}
                           disabled={mutation.isLoading} onChange={event => setAcceptedPrice(event.target.value)}/>

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
                                    onChange={newValue => setExpirationTime(newValue)}
                    />
                </LocalizationProvider>

                {mutation.isLoading
                    ? <CircularProgress/>
                    : <Button variant="contained" onClick={mutation.mutate}>Submit</Button>
                }
                <Toaster/>
            </div>
        </form>
    );
}