import {deleteActiveOrder} from "../../../service/investmentOrderService";
import React, {useState} from "react";
import {Collapse, List, ListItemButton, ListItemText} from "@mui/material";
import {ExpandLess, ExpandMore} from "@mui/icons-material";


const ActiveOrders = ({activeOrders, populateOrderList}) => {

    const [open, setOpen] = useState(false);

    const deleteOrder = async (orderId) => {
        await deleteActiveOrder(orderId);
        await populateOrderList();
    }

    return (
        <List>
            <ListItemButton onClick={() => setOpen(!open)}>
                <ListItemText primary="Active orders"/>
                {open ? <ExpandLess/> : <ExpandMore/>}
            </ListItemButton>
            <Collapse in={open} unmountOnExit>
                <List component="div" disablePadding>
                    {activeOrders.map((order) => <ListItemText primary={order.symbol} sx={{pl: 4}}/>)}
                </List>
            </Collapse>
        </List>
    );
}

export default ActiveOrders;