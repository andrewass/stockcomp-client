import React from "react";
import OrderFormState from "./OrderFormState";
import "./orderForm.css";
import {FormControl, InputLabel, Select, TextField} from "@mui/material";
import {DateTimePicker, LocalizationProvider} from "@mui/lab";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";


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

    const {
        setOrderAmount, setAcceptedPrice, expirationTime, setExpirationTime,
        operationType, setOperationType, sendOrder
    } = OrderFormState(symbol, contest, currentPrice);

    return (
        <form id="submitOrderForm">
            <div id="orderGrid">
                <QuantitySelect setOrderAmount={setOrderAmount}/>
                <PriceSelect setAcceptedPrice={setAcceptedPrice} currentPrice={currentPrice.price}/>
                <OperationSelect setOperationType={setOperationType} operationType={operationType}/>
                <ExpirationSelect setExpirationTime={setExpirationTime} expirationTime={expirationTime}/>
                <Button type="submit" variant="contained" onClick={sendOrder}>Submit</Button>
            </div>
        </form>
    );
}

export default OrderForm;