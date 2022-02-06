import {TableCell, TableRow} from "@mui/material";
import {NavLink} from "react-router-dom";
import Flags from "country-flag-icons/react/3x2";


export const ContestLeaderboardEntry = ({entry}) => {

    const EntryFlag = Flags[entry.country];

    return (
        <TableRow key={entry.name} sx={{height: "4rem"}}>
            <TableCell>{entry.rank}</TableCell>
            <TableCell>
                <NavLink to={{pathname: "/account-read", state: {user: entry}}}>
                    {entry.username}
                </NavLink>
            </TableCell>
            <TableCell>
                {EntryFlag ? <EntryFlag style={{width: "2rem"}}/> : <span>n/a</span>}
            </TableCell>
            <TableCell>{entry.totalValue.toFixed(2)} USD</TableCell>
        </TableRow>
    );
}