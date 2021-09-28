import React, {useState} from "react";
import {Collapse, List, ListItemButton, ListItemText} from "@mui/material";
import {ExpandLess, ExpandMore} from "@mui/icons-material";

const CompletedOrders = ({completedOrders}) => {

    const [open, setOpen] = useState(false);

    return (
        <List>
            <ListItemButton onClick={() => setOpen(!open)}>
                <ListItemText primary="Completed orders"/>
                {open ? <ExpandLess/> : <ExpandMore/>}
            </ListItemButton>
            <Collapse in={open} unmountOnExit>
                <List component="div" disablePadding>
                    {completedOrders.map((order) => <ListItemText primary={order.symbol} sx={{pl: 4}}/>)}
                </List>
            </Collapse>
        </List>
    );
}

export default CompletedOrders;