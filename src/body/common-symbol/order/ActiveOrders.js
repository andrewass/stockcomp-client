import {
    deleteActiveOrder
} from "../../../service/investmentOrderService";
import React, {useState} from "react";
import {
    Collapse,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemSecondaryAction,
    ListItemText
} from "@mui/material";
import {Delete, ExpandLess, ExpandMore} from "@mui/icons-material";


const ActiveOrders = ({activeOrders, getActiveOrders}) => {

    const [open, setOpen] = useState(false);

    const deleteOrder = async (orderId) => {
        await deleteActiveOrder(orderId);
        getActiveOrders();
    }

    const createListItem = (order) => {
        return (
            <ListItem sx={{pl: 4}}>
                <ListItemText primary={order.symbol + " : Status " + order.totalAmount + "/"
                + order.totalAmount + " at price " + order.acceptedPrice}/>
                <ListItemSecondaryAction>
                    <IconButton aria-label="Delete" onClick={() => deleteOrder(order.orderId)}>
                        <Delete/>
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        );
    }

    return (
        <List>
            <ListItemButton sx={{p:0}} onClick={() => setOpen(!open)}>
                <ListItemText primary="Active orders"/>
                {open ? <ExpandLess/> : <ExpandMore/>}
            </ListItemButton>
            <Collapse in={open} unmountOnExit>
                <List>
                    <List>
                        {activeOrders.map((order) => createListItem(order))}
                    </List>
                </List>
            </Collapse>
        </List>
    );
}

export default ActiveOrders;