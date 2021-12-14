import React, {useState} from "react";
import {Collapse, List, ListItem, ListItemButton, ListItemText, Typography} from "@mui/material";
import {ExpandLess, ExpandMore} from "@mui/icons-material";


const CompletedOrders = ({completedOrders}) => {

    const [open, setOpen] = useState(false);

    const createListItem = (order) => {
        return (
            <ListItem sx={{pl: 2}} key={order.orderId}>
                <ListItemText primary={order.symbol + " : "+order.transactionType+" status "
                + (order.totalAmount-order.remainingAmount) + "/" + order.totalAmount
                + " . Price " + order.acceptedPrice+" "+order.currency}/>
            </ListItem>
        );
    }

    return (
        <List sx={{width:"100%"}}>
            <ListItemButton sx={{p:0}} onClick={() => setOpen(!open)}>
                <ListItemText primary={<Typography variant="h5">Completed Orders</Typography>} />
                {open ? <ExpandLess/> : <ExpandMore/>}
            </ListItemButton>
            <Collapse in={open} unmountOnExit>
                <List>
                    {completedOrders.map((order) => createListItem(order))}
                </List>
            </Collapse>
        </List>
    );
}

export default CompletedOrders;
