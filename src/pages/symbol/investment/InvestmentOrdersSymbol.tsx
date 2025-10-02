import { Box } from "@mui/material";
import type { DetailedParticipant } from "../../../domain/participant/participantTypes";
import { ActiveOrdersSymbol } from "./ActiveOrdersSymbol";

interface Props {
	participants: DetailedParticipant[];
	symbol: string;
}

export const InvestmentOrdersSymbol = ({ participants, symbol }: Props) => {
	return (
		<Box>
			<ActiveOrdersSymbol participants={participants} symbol={symbol} />
		</Box>
	);
};
