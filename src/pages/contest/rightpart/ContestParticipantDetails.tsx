import {Participant} from "../../../domain/participant/participantTypes";
import {Contest} from "../../../domain/contests/contestTypes";
import Grid from "@mui/material/Grid2";
import {Container, Typography} from "@mui/material";

interface Props {
    participant: Participant,
    contest: Contest
}

export default function ContestParticipantDetails({participant, contest}: Props) {

    return (
        <Container>
            <Grid container spacing={1} bgcolor="orange">
                <Grid size={6}>
                    <Typography>Total Value : {participant.totalValue.toFixed(2)}</Typography>
                </Grid>
                <Grid size={6}>
                    <Typography>Investment Value: {participant.totalInvestmentValue.toFixed(2)}</Typography>
                </Grid>
                <Grid size={6}>
                    <Typography>Remaining funds : {participant.remainingFunds.toFixed(2)} USD</Typography>
                </Grid>
                <Grid size={6}>
                    <Typography>Rank: {participant.rank}</Typography>
                </Grid>
            </Grid>
        </Container>
    );
}
