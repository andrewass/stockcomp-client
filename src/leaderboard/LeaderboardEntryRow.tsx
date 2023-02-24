import {TableCell, TableRow} from "@mui/material";
import {NavLink} from "react-router-dom";
import ReactCountryFlag from "react-country-flag";
import {LeaderboardEntry} from "./leaderboardTypes";

interface Props{
    entry : LeaderboardEntry
}

const LeaderboardEntryRow = ({entry} : Props) => {

    return (
        <TableRow key={entry.displayName}>
            <TableCell>{entry.ranking}</TableCell>
            <TableCell>
                <NavLink to={`/user/${entry.displayName}`}>
                    {entry.displayName}
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