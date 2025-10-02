import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
	Collapse,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	Typography,
} from "@mui/material";
import React, { useState } from "react";
import type { InvestmentOrder } from "../domain/investmentorder/investmentOrderTypes";

export const CompletedOrders = ({
	completedOrders,
}: {
	completedOrders: InvestmentOrder[];
}) => {
	const [open, setOpen] = useState(false);

	const createListItem = (order: InvestmentOrder) => {
		return (
			<ListItem sx={{ pl: 2 }} key={order.orderId}>
				<ListItemText
					primary={
						order.symbol +
						" : " +
						order.transactionType +
						" status " +
						(order.totalAmount - order.remainingAmount) +
						"/" +
						order.totalAmount +
						" . Price " +
						order.acceptedPrice +
						" " +
						order.currency
					}
				/>
			</ListItem>
		);
	};

	return (
		<List>
			<ListItemButton sx={{ p: 0 }} onClick={() => setOpen(!open)}>
				<ListItemText
					primary={<Typography variant="h5">Completed Orders</Typography>}
				/>
				{open ? <ExpandLess /> : <ExpandMore />}
			</ListItemButton>
			<Collapse in={open} unmountOnExit>
				<List sx={{ width: "100%", maxHeight: "15rem", overflow: "auto" }}>
					{completedOrders.map((order) => createListItem(order))}
				</List>
			</Collapse>
		</List>
	);
};
