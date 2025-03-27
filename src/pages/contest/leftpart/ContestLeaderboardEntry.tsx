import {TableCell, TableRow} from "@mui/material";
import ReactCountryFlag from "react-country-flag";
import {Participant} from "../../../domain/participant/participantTypes";
import {Link} from "@tanstack/react-router";


export const ContestLeaderboardEntry = ({entry}: { entry: Participant }) => {
    return (
        <TableRow key={entry.username} sx={{height: "4rem"}}>
            <TableCell>{entry.rank}</TableCell>
            <TableCell>
                <Link to="/users/$userId" params={{userId: entry.username!!}}>
                    {entry.username}
                </Link>
            </TableCell>
            <TableCell>
                {entry.country &&
                    <ReactCountryFlag style={{width: "2em", height: "2em",}} countryCode={entry.country} svg/>
                }
            </TableCell>
            <TableCell>{entry.totalValue.toFixed(2)} USD</TableCell>
        </TableRow>
    );
}
