import {DetailedParticipant} from "../../../domain/participant/participantTypes";
import {Accordion, AccordionDetails, AccordionSummary, Card, CardContent, Stack, Tab, Typography} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {TabContext, TabList, TabPanel} from "@mui/lab";
import {SyntheticEvent, useState} from "react";

interface Props {
    participant: DetailedParticipant
    symbol: string
}

export default function ParticipantAccordion({participant, symbol}: Props) {
    const [value, setValue] = useState<string>("1");

    const handleChange = (event: SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}
            >
                <Typography component="span">{participant.contest.contestName}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Stack>
                    <Card elevation={0} sx={{mt: "1rem", mb: "2rem"}}>
                        <CardContent>
                            <Typography variant="h6">{symbol}</Typography>
                            <Typography>Amount invested : 1</Typography>
                            <Typography>Investment value : 34234 USD</Typography>
                            <Typography>Investment profit: 323424</Typography>
                            <Typography>
                                Remaining funds : {participant.participant.remainingFunds.toFixed(2)}
                            </Typography>
                        </CardContent>
                    </Card>
                    <TabContext value={value}>
                        <TabList onChange={handleChange}>
                            <Tab label="Investment" value="1"/>
                            <Tab label="Active orders" value="2"/>
                            <Tab label="Completed orders" value="3"/>
                        </TabList>
                        <TabPanel value="1">Item One</TabPanel>
                        <TabPanel value="2">Item Two</TabPanel>
                        <TabPanel value="3">Item Three</TabPanel>
                    </TabContext>
                </Stack>
            </AccordionDetails>
        </Accordion>
    );
}