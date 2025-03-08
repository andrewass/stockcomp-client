import {Investment} from "../../../investment/investmentTypes";
import {Accordion, AccordionDetails, AccordionSummary, List, ListItem, Typography} from "@mui/material";
import Grid from "@mui/material/Grid2";

interface Props {
    investments: Investment[]
}

export default function ContestInvestments({investments}: Props) {
    return (
        <Accordion defaultExpanded disableGutters>
            <AccordionSummary>
                <Typography component="span">Investments</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <List>
                    {investments.map((investment, index) =>
                        <ListItem>
                            <Grid container spacing={1} bgcolor="orange">
                                <Grid size={6}>
                                    <Typography key={index}>{investment.symbol}</Typography>
                                </Grid>
                                <Grid size={6}>
                                    <Typography key={index}>Amount: {investment.amount}</Typography>
                                </Grid>
                                <Grid size={6}>
                                    <Typography key={index}>Value : {investment.totalValue} USD</Typography>
                                </Grid>
                                <Grid size={6}>
                                    <Typography key={index}>Profit: {investment.totalProfit} USD</Typography>
                                </Grid>
                            </Grid>
                        </ListItem>
                    )}
                </List>
            </AccordionDetails>
        </Accordion>
    );
}
