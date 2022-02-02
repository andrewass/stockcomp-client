import {useState} from "react";
import "./orderForm.css";
import {FormControl, InputLabel, Select, TextField} from "@mui/material";
import {DateTimePicker, LocalizationProvider} from "@mui/lab";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import toast, {Toaster} from 'react-hot-toast';
import {placeBuyOrder, placeSellOrder} from "../../../../service/investmentOrderService";
import {useMutation} from "react-query";
import {queryClient} from "../../../../config/QueryConfig";


const QuantitySelect = ({setOrderAmount}) => {
    return <TextField label="Quantity" variant="outlined" defaultValue={1}
                      onChange={event => setOrderAmount(event.target.value)}/>
}

const PriceSelect = ({setAcceptedPrice, currentPrice}) => {
    return <TextField label="Accepted Price" variant="outlined" defaultValue={currentPrice}
                      onChange={event => setAcceptedPrice(event.target.value)}/>
}

const OperationSelect = ({operationType, setOperationType}) => {
    return (
        <FormControl>
            <InputLabel>Operation</InputLabel>
            <Select value={operationType} label="Operation" onChange={event => setOperationType(event.target.value)}>
                <MenuItem value="Buy">Buy</MenuItem>
                <MenuItem value="Sell">Sell</MenuItem>
            </Select>
        </FormControl>
    );
}

const ExpirationSelect = ({expirationTime, setExpirationTime}) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
                renderInput={(props) => <TextField {...props} />}
                label="Expiration"
                value={expirationTime}
                onChange={(newValue) => setExpirationTime(newValue)}
            />
        </LocalizationProvider>
    );
}

export const OrderForm = ({symbol, contest, stockQuote}) => {

    const [acceptedPrice, setAcceptedPrice] = useState();
    const [expirationTime, setExpirationTime] = useState(Date.now);
    const [orderAmount, setOrderAmount] = useState();
    const [operationType, setOperationType] = useState("Buy");

    const createInvestmentOrderRequest = () => {
        return {
            expirationTime: expirationTime,
            acceptedPrice: parseFloat(acceptedPrice),
            symbol: symbol.symbol,
            amount: parseInt(orderAmount),
            contestNumber: contest.contestNumber,
            currency: stockQuote.currency,
        }
    }

    const mutation = useMutation((request) => operationType === "Buy"
        ? placeBuyOrder(request)
        : placeSellOrder(request), {
        onSuccess: () => {
            queryClient.invalidateQueries("activeOrdersSymbol");
            queryClient.invalidateQueries("completedOrdersSymbol");
        },
        onError: () => {
            toast.error("Unable to submit investment order", {
                duration: 4000,
                position: "top-center"
            });
        }
    });

    const submitOrder = () => {
        mutation.mutate(createInvestmentOrderRequest());
    }

    return (
        <form id="submitOrderForm">
            <div id="orderGrid">
                <QuantitySelect setOrderAmount={setOrderAmount}/>
                <PriceSelect setAcceptedPrice={setAcceptedPrice} currentPrice={stockQuote.price}/>
                <OperationSelect setOperationType={setOperationType} operationType={operationType}/>
                <ExpirationSelect setExpirationTime={setExpirationTime} expirationTime={expirationTime}/>
                <Button variant="contained" onClick={submitOrder}>Submit</Button>
                <Toaster/>
            </div>
        </form>
    );
}