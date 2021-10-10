import React, {useState} from "react";
import "./orderForm.css";
import {FormControl, InputLabel, Select, TextField} from "@mui/material";
import {DateTimePicker, LocalizationProvider} from "@mui/lab";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import toast, { Toaster } from 'react-hot-toast';
import {placeBuyOrder, placeSellOrder} from "../../../../service/investmentOrderService";


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
                <MenuItem value="BUY">BUY</MenuItem>
                <MenuItem value="SELL">SELL</MenuItem>
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

const OrderForm = ({symbol, contest, currentPrice}) => {

    const [acceptedPrice, setAcceptedPrice] = useState();
    const [expirationTime, setExpirationTime] = useState(Date.now);
    const [orderAmount, setOrderAmount] = useState();
    const [operationType, setOperationType] = useState("BUY");

    const createInvestmentOrderRequest = () => {
        return {
            expirationTime: expirationTime,
            acceptedPrice: parseFloat(acceptedPrice),
            symbol: symbol.symbol,
            amount: parseInt(orderAmount),
            contestNumber: contest.contestNumber,
            currency : currentPrice.currency,
        }
    }

    const sendOrder = async () => {
        operationType === "BUY"
            ? await placeBuyOrder(createInvestmentOrderRequest())
            : await placeSellOrder(createInvestmentOrderRequest());
        toast("This is a toast");
    }


    return (
        <form id="submitOrderForm">
            <div id="orderGrid">
                <QuantitySelect setOrderAmount={setOrderAmount}/>
                <PriceSelect setAcceptedPrice={setAcceptedPrice} currentPrice={currentPrice.price}/>
                <OperationSelect setOperationType={setOperationType} operationType={operationType}/>
                <ExpirationSelect setExpirationTime={setExpirationTime} expirationTime={expirationTime}/>
                <Button variant="contained" onClick={sendOrder}>Submit</Button>
                <Toaster/>
            </div>
        </form>
    );
}

export default OrderForm;