import {InvestmentOrder} from "../../../domain/investmentorder/investmentOrderTypes";
import {Accordion, AccordionDetails, AccordionSummary, List, ListItem, Typography} from "@mui/material";
import Grid from "@mui/material/Grid2";

interface Props {
    orders: InvestmentOrder[]
}

export default function ContestActiveOrders({orders}: Props) {
    return (
        <Accordion disableGutters>
            <AccordionSummary>
                <Typography component="span">Active Orders</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <List>
                    {orders.map((order, index) =>
                        <ListItem key={index}>
                            <Grid container spacing={1} bgcolor="orange">
                                <Grid size={6}>
                                    <Typography>{order.symbol}</Typography>
                                </Grid>
                                <Grid size={6}>
                                    <Typography>Order Type: {order.transactionType == "BUY" ? "Buy" : "Sell"}</Typography>
                                </Grid>
                                <Grid size={6}>
                                    <Typography>Processed: {order.totalAmount - order.remainingAmount}/{order.totalAmount}</Typography>
                                </Grid>
                                <Grid size={6}>
                                    <Typography>Accepted Price {order.acceptedPrice} {order.currency}</Typography>
                                </Grid>
                                <Grid size={6}>
                                    <Typography>Expiration:  {order.expirationTime}</Typography>
                                </Grid>
                            </Grid>
                        </ListItem>
                    )}
                </List>
            </AccordionDetails>
        </Accordion>
    );
}
