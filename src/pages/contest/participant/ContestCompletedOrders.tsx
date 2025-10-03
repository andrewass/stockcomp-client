import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Grid,
	List,
	ListItem,
	Typography,
} from "@mui/material";
import type { InvestmentOrder } from "../../../domain/investmentorder/investmentOrderTypes";

interface Props {
	orders: InvestmentOrder[];
}

export default function ContestCompletedOrders({ orders }: Props) {
	return (
		<Accordion disableGutters>
			<AccordionSummary>
				<Typography component="span">Completed Orders</Typography>
			</AccordionSummary>
			<AccordionDetails>
				<List>
					{orders.map((order) => (
						<ListItem key={order.orderId}>
							<Grid container spacing={1} bgcolor="orange">
								<Grid size={6}>
									<Typography>{order.symbol}</Typography>
								</Grid>
								<Grid size={6}>
									<Typography>
										Order Type:{" "}
										{order.transactionType === "BUY" ? "Buy" : "Sell"}
									</Typography>
								</Grid>
								<Grid size={6}>
									<Typography>
										Processed: {order.totalAmount - order.remainingAmount}/
										{order.totalAmount}
									</Typography>
								</Grid>
								<Grid size={6}>
									<Typography>
										Accepted Price {order.acceptedPrice} {order.currency}
									</Typography>
								</Grid>
							</Grid>
						</ListItem>
					))}
				</List>
			</AccordionDetails>
		</Accordion>
	);
}
