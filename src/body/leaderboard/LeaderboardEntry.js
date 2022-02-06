import {TableCell, TableRow} from "@mui/material";
import Flags from 'country-flag-icons/react/3x2'
import {NavLink} from "react-router-dom";


const LeaderboardEntry = ({entry}) => {

    const EntryFlag = Flags[entry.country];

    return (
        <TableRow key={entry.username}>
            <TableCell>{entry.ranking}</TableCell>
            <TableCell>
                <NavLink to={{pathname: "/account-read", state: {user: entry}}}>
                    {entry.username}
                </NavLink>
            </TableCell>
            <TableCell>
                {EntryFlag ? <EntryFlag style={{width: "2rem"}}/> : <span>n/a</span>}
            </TableCell>
            <TableCell>{entry.score}</TableCell>
            <TableCell>n/a</TableCell>
        </TableRow>
    );
}

export default LeaderboardEntry;