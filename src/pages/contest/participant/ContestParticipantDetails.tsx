import { Participant } from "../../../domain/participant/participantTypes";
import { Contest } from "../../../domain/contests/contestTypes";
import { Box, Grid, Typography } from "@mui/material";

interface Props {
  participant: Participant;
  contest: Contest;
}

export default function ContestParticipantDetails({ participant }: Props) {
  return (
    <Grid container spacing={2}>
      <Grid size={6}>
        <Box>
          <Typography>Total Value :</Typography>
          <Typography>USD {participant.totalValue.toFixed(2)}</Typography>
        </Box>
      </Grid>
      <Grid size={6}>
        <Typography>Investment Value :</Typography>
        <Typography>
          USD {participant.totalInvestmentValue.toFixed(2)}
        </Typography>
      </Grid>
      <Grid size={6}>
        <Typography>Remaining funds :</Typography>
        <Typography>USD {participant.remainingFunds.toFixed(2)}</Typography>
      </Grid>
      <Grid size={6}>
        <Typography>Rank: {participant.rank}</Typography>
      </Grid>
    </Grid>
  );
}
