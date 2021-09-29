import {
    deleteActiveOrder,
    getActiveOrdersParticipant,
    getActiveOrdersParticipantSymbol
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


const ActiveOrders = ({activeOrders, fetchActiveOrders}) => {

    const [open, setOpen] = useState(false);

    const deleteOrder = async (orderId) => {
        await deleteActiveOrder(orderId);
        fetchActiveOrders();
    }

    const createActiveOrder = (order) => {
        return (
            <ListItem key={order.orderId}>
                <ListItemText primary={order.symbol} sx={{pl: 4}}/>
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
            <ListItemButton onClick={() => setOpen(!open)}>
                <ListItemText primary="Active orders"/>
                {open ? <ExpandLess/> : <ExpandMore/>}
            </ListItemButton>
            <Collapse in={open} unmountOnExit>
                <List component="div" disablePadding>
                    {activeOrders.map(order => createActiveOrder(order))}
                </List>
            </Collapse>
        </List>
    );
}

export default ActiveOrders;