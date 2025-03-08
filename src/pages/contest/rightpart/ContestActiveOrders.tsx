import {InvestmentOrder} from "../../../domain/investmentorder/investmentOrderTypes";
import {Accordion, AccordionDetails, AccordionSummary, List, ListItem, Typography} from "@mui/material";

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
                        <ListItem>
                            <Typography key={index}>{order.symbol}</Typography>
                            <Typography key={index}>{order.totalAmount}</Typography>
                        </ListItem>
                    )}
                </List>
            </AccordionDetails>
        </Accordion>
    );
}
