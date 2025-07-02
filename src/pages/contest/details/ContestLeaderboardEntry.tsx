import { TableCell } from "@mui/material";
import ReactCountryFlag from "react-country-flag";
import { Participant } from "../../../domain/participant/participantTypes";
import { Link } from "@tanstack/react-router";
import StyledTableRow from "../../../components/table/StyledTableRow";

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
        <Link to="/users/$username" params={{ username: participant.username }}>
          {participant.username}
        </Link>
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
