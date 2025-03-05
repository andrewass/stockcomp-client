import {Investment} from "../../../investment/investmentTypes";
import {Accordion, AccordionDetails, AccordionSummary, Typography} from "@mui/material";

interface Props{
    investments: Investment[]
}

export default function ContestInvestments({investments}: Props) {
    return (
        <Accordion defaultExpanded>
            <AccordionSummary>
                <Typography component="span">Investments</Typography>
            </AccordionSummary>
            <AccordionDetails>
                {investments.map((investment, index) => <Typography key={index}>{investment.symbol}</Typography>)}
            </AccordionDetails>
        </Accordion>
    );
}
