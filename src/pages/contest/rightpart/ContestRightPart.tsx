import { Box, Stack } from "@mui/material";
import ContestInvestments from "./ContestInvestments";
import ContestActiveOrders from "./ContestActiveOrders";
import ContestCompletedOrders from "./ContestCompletedOrders";
import { DetailedParticipant } from "../../../domain/participant/participantTypes";
import ContestParticipantDetails from "./ContestParticipantDetails";

interface Props {
  participant: DetailedParticipant;
}

export default function ContestRightPart({ participant }: Props) {
  return (
    <Stack direction="column" bgcolor="red" gap={3}>
      <Box>
        <ContestParticipantDetails
          participant={participant.participant}
          contest={participant.contest}
        />
      </Box>
      <Box>
        <ContestInvestments investments={participant.investments} />
        <ContestActiveOrders orders={participant.activeOrders} />
        <ContestCompletedOrders orders={participant.completedOrders} />
      </Box>
    </Stack>
  );
}
