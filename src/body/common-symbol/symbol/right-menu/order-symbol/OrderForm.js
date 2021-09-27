import React from "react";
import OrderFormState from "./OrderFormState";
import "./orderForm.css";
import {FormControl, InputLabel, Select, TextField} from "@mui/material";
import {DateTimePicker, LocalizationProvider} from "@mui/lab";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import MenuItem from "@mui/material/MenuItem";


const QuantitySelect = ({setOrderAmount}) => {
    return <TextField label="Outlined" variant="outlined" onChange={event => setOrderAmount(event.target.value)}/>
}

const PriceSelect = ({setAcceptedPrice}) => {
    return <TextField label="Outlined" variant="outlined" onChange={event => setAcceptedPrice(event.target.value)}/>
}

const OperationSelect = ({operationType, setOperationType}) => {
    return (
        <FormControl>
            <InputLabel id="demo-simple-select-label">Operation</InputLabel>
            <Select labelId="demo-simple-select-label"
                    id="demo-simple-select" value={operationType}
                    label="Age" onChange={event => setOperationType(event.target.value)}>
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
                <PriceSelect setAcceptedPrice={setAcceptedPrice}/>
                <OperationSelect setOperationType={setOperationType} operationType={operationType}/>
                <ExpirationSelect setExpirationTime={setExpirationTime} expirationTime={expirationTime}/>
                <input type="button" id="orderSubmit" value="Submit" onClick={sendOrder}/>
            </div>
        </form>
    );
}

export default OrderForm;