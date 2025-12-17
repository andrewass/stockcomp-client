import { Stack, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import type { DetailedParticipant } from "../../../domain/participant/participantTypes";
import type { StockPrice } from "../../../domain/symbols/symbolTypes";
import InvestmentOrderForm from "./InvestmentOrderForm";
import ParticipantAccordionList from "./ParticipantAccordionList";

interface Props {
	stockPrice: StockPrice;
	participants: DetailedParticipant[];
}

export default function SymbolInvestments({ stockPrice, participants }: Props) {
	const theme = useTheme();
	const isLargeWidth = useMediaQuery(theme.breakpoints.up("lg"));

	return (
		<Stack
			direction="column"
			spacing={4}
			sx={{
				marginTop: "50px",
				width: isLargeWidth ? "30%" : "70%",
			}}
		>
			<InvestmentOrderForm
				participants={participants}
				symbol={stockPrice.symbol}
				stockPrice={stockPrice}
			/>
			<ParticipantAccordionList
				participants={participants}
				symbol={stockPrice.symbol}
			/>
		</Stack>
	);
}
