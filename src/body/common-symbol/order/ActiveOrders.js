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
    ListItemText, Typography
} from "@mui/material";
import {Delete, ExpandLess, ExpandMore} from "@mui/icons-material";
import {queryClient} from "../../../config/queryConfig";


const ActiveOrders = ({activeOrders}) => {

    const [open, setOpen] = useState(false);

    const deleteOrder = async (orderId) => {
        await deleteActiveOrder(orderId);
        await queryClient.invalidateQueries("getActiveOrdersSymbol");
        await queryClient.invalidateQueries("getActiveOrdersParticipant");
    }

    const createListItem = (order) => {
        return (
            <ListItem key={order.orderId} sx={{pl: 2}}>
                <ListItemText primary={order.symbol + " : "+order.transactionType+" status "
                + (order.totalAmount-order.remainingAmount) + "/" + order.totalAmount
                + " . Price " + order.acceptedPrice+" "+order.currency}/>

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
                <ListItemText primary={<Typography variant="h5">Active Orders</Typography>} />
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