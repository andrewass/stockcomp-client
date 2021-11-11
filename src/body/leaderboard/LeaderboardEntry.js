import {TableCell, TableRow} from "@mui/material";
import Flags from 'country-flag-icons/react/3x2'
import React from "react";
import {NavLink} from "react-router-dom";


const LeaderboardEntry = ({entry}) => {

    const EntryFlag = Flags[entry.country];

    return (
        <TableRow key={entry.name}>
            <TableCell>{entry.ranking}</TableCell>
            <TableCell component={NavLink} to={{
                pathname: "/account-read",
                state: {user: entry}
            }}>
                {entry.username}
            </TableCell>
            <TableCell>
                <EntryFlag style={{width: "2rem"}}/>
            </TableCell>
            <TableCell>{entry.score}</TableCell>
            <TableCell>n/a</TableCell>
        </TableRow>
    );
}

export default LeaderboardEntry;