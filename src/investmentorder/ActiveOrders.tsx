import React, {useState} from "react";
import {
    Collapse,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemSecondaryAction,
    ListItemText,
    Typography
} from "@mui/material";
import {Delete, ExpandLess, ExpandMore} from "@mui/icons-material";
import {InvestmentOrder} from "../types/investmentorder";
import {queryClient} from "../config/queryConfig";
import {deleteInvestmentOrder} from "../api/investmentOrderClient";
import {useApiWrapper} from "../config/apiWrapper";


interface Props {
    activeOrders : InvestmentOrder[]
}

const ActiveOrders = ({activeOrders} : Props) => {
    const [open, setOpen] = useState(false);
    const {apiDelete} = useApiWrapper();

    const deleteOrder = async (orderId : number) => {
        await deleteInvestmentOrder(orderId);
        await queryClient.invalidateQueries("getActiveOrdersSymbol");
        await queryClient.invalidateQueries("getActiveOrdersParticipant");
    }

    const createListItem = (order : InvestmentOrder) => {
        return (
            <ListItem key={order.orderId} sx={{pl: 2}}>
                <ListItemText primary={order.symbol + " : " + order.transactionType + " status "
                    + (order.totalAmount - order.remainingAmount) + "/" + order.totalAmount
                    + " . Price " + order.acceptedPrice + " " + order.currency}/>

                <ListItemSecondaryAction>
                    <IconButton aria-label="Delete" onClick={() => deleteOrder(order.orderId)}>
                        <Delete/>
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        )
    }

    return (
        <List>
            <ListItemButton sx={{p: 0}} onClick={() => setOpen(!open)}>
                <ListItemText primary={<Typography variant="h5">Active Orders</Typography>}/>
                {open ? <ExpandLess/> : <ExpandMore/>}
            </ListItemButton>

            <Collapse in={open} unmountOnExit>
                <List sx={{width: "100%", maxHeight: "15rem", overflow: "auto"}}>
                    {activeOrders.map((order) => createListItem(order))}
                </List>
            </Collapse>
        </List>
    )
}

export default ActiveOrders