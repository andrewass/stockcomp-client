import {InvestmentOrder} from "../../../domain/investmentorder/investmentOrderTypes";
import {Accordion, AccordionDetails, AccordionSummary, List, ListItem, Typography} from "@mui/material";
import Grid from "@mui/material/Grid2";

interface Props{
    orders: InvestmentOrder[]
}

export default function ContestCompletedOrders({orders}: Props) {
    return (
        <Accordion disableGutters>
            <AccordionSummary>
                <Typography component="span">Completed Orders</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <List>
                    {orders.map((order, index) =>
                        <ListItem key={index}>
                            <Grid container spacing={1} bgcolor="orange">
                                <Grid size={6}>
                                    <Typography key={index}>{order.symbol}</Typography>
                                </Grid>
                                <Grid size={6}>
                                    <Typography key={index}>Order Type: {order.transactionType == "BUY" ? "Buy" : "Sell"}</Typography>
                                </Grid>
                                <Grid size={6}>
                                    <Typography key={index}>Processed: {order.totalAmount - order.remainingAmount}/{order.totalAmount}</Typography>
                                </Grid>
                                <Grid size={6}>
                                    <Typography key={index}>Accepted Price {order.acceptedPrice} {order.currency}</Typography>
                                </Grid>
                            </Grid>
                        </ListItem>
                    )}
                </List>
            </AccordionDetails>
        </Accordion>
    );
}
