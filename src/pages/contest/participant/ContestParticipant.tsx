import { Box, Stack } from "@mui/material";
import type { DetailedParticipant } from "../../../domain/participant/participantTypes";
import ContestActiveOrders from "./ContestActiveOrders";
import ContestCompletedOrders from "./ContestCompletedOrders";
import ContestInvestments from "./ContestInvestments";
import ContestParticipantDetails from "./ContestParticipantDetails";

interface Props {
	participant: DetailedParticipant;
}

export default function ContestParticipant({ participant }: Props) {
	return (
		<Stack direction="column" gap={3}>
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
