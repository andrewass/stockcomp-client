import { Link as MUILink, TableCell } from "@mui/material";
import { createLink } from "@tanstack/react-router";
import ReactCountryFlag from "react-country-flag";
import StyledTableRow from "../../../components/table/StyledTableRow";
import type { Participant } from "../../../domain/participant/participantTypes";

interface Props {
	participant: Participant;
}

const CustomLink = createLink(MUILink);

export default function ContestLeaderboardEntry({ participant }: Props) {
	return (
		<StyledTableRow
			key={participant.username}
			rowId={participant.participantId}
		>
			<TableCell>{participant.rank}</TableCell>
			<TableCell>
				<CustomLink
					to="/users/$username"
					params={{ username: participant.username }}
				>
					{participant.username}
				</CustomLink>
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
