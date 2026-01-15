import { TableCell } from "@mui/material";
import ReactCountryFlag from "react-country-flag";
import StyledLink from "@/components/link/StyledLink.tsx";
import StyledTableRow from "../../../components/table/StyledTableRow";
import type { Participant } from "../../../domain/participant/participantTypes";

interface Props {
	participant: Participant;
}

export default function ContestLeaderboardEntry({ participant }: Props) {
	return (
		<StyledTableRow
			key={participant.username}
			rowId={participant.participantId}
		>
			<TableCell>{participant.rank}</TableCell>
			<TableCell>
				<StyledLink
					href={{
						pathname: "/users/$username",
						query: { username: participant.username },
					}}
				>
					{participant.username}
				</StyledLink>
			</TableCell>
			<TableCell>
				{participant.country && (
					<ReactCountryFlag
						style={{ width: "2em", height: "2em" }}
						countryCode={participant.country}
						svg
					/>
				)}
			</TableCell>
			<TableCell>{participant.totalValue.toFixed(2)} USD</TableCell>
		</StyledTableRow>
	);
}
