import {TableCell, TableRow} from "@mui/material";
import {NavLink} from "react-router-dom";
import ReactCountryFlag from "react-country-flag";
import {LeaderboardEntry} from "../types/leaderboard";

interface Props{
    entry : LeaderboardEntry
}

const LeaderboardEntryRow = ({entry} : Props) => {

    return (
        <TableRow key={entry.username}>
            <TableCell>{entry.ranking}</TableCell>
            <TableCell>
                <NavLink to={`/user/${entry.username}`}>
                    {entry.username}
                </NavLink>
            </TableCell>
            <TableCell>
                <ReactCountryFlag countryCode="US" svg />
            </TableCell>
            <TableCell>{entry.score}</TableCell>
            <TableCell>n/a</TableCell>
        </TableRow>
    )
}

export default LeaderboardEntryRow