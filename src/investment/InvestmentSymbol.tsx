import InvestmentDetails from "./InvestmentDetails";
import {Box, Card, CardContent, Typography} from "@mui/material";
import {DetailedParticipant} from "../domain/participant/participantTypes";

interface Props {
    participants: DetailedParticipant[]
    symbol: string
}

const InvestmentSymbol = ({symbol, participants}: Props) => {
    return (
        <Box>
            {participants.filter(participant => participant.investments.length > 0)
                .map(participant =>
                    <Card elevation={0}>
                        <CardContent>
                            <Typography variant="h5" sx={{pb: "0.5rem"}}>
                                Portfolio Status
                            </Typography>
                            <Typography sx={{pb: "1rem"}}>
                                Remaining funds : {participant.participant.remainingFunds.toFixed(2)}
                            </Typography>
                            <InvestmentDetails investment={participant.investments[0]}/>
                        </CardContent>
                    </Card>
                )
            }
        </Box>
    );
}

export default InvestmentSymbol;