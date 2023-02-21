import {TableCell, TableRow} from "@mui/material";
import {Link} from "react-router-dom";
import ReactCountryFlag from "react-country-flag";
import {Participant} from "../types/participant";

interface Props{
    entry : Participant
}

export const ContestLeaderboardEntry = ({entry} : Props) => {
    return (
        <TableRow key={entry.displayName} sx={{height: "4rem"}}>
            <TableCell>{entry.rank}</TableCell>
            <TableCell>
                <Link to={`/user/${entry.displayName}`}>
                    {entry.displayName}
                </Link>
            </TableCell>
            <TableCell>
                <ReactCountryFlag countryCode="US" svg />
            </TableCell>
            <TableCell>{entry.totalValue.toFixed(2)} USD</TableCell>
        </TableRow>
    );
}