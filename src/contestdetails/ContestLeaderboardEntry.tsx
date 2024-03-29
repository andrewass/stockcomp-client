import {TableCell, TableRow} from "@mui/material";
import {NavLink} from "react-router-dom";
import ReactCountryFlag from "react-country-flag";
import {Participant} from "../participant/participantTypes";


export const ContestLeaderboardEntry = ({entry}: { entry: Participant }) => {
    return (
        <TableRow key={entry.displayName} sx={{height: "4rem"}}>
            <TableCell>{entry.rank}</TableCell>
            <TableCell>
                <NavLink to={`/user/${entry.displayName}`} style={{textDecoration: "none", color: "black"}}>
                    {entry.displayName}
                </NavLink>
            </TableCell>
            <TableCell>
                <ReactCountryFlag style={{width: "2em", height: "2em",}} countryCode={entry.country} svg/>
            </TableCell>
            <TableCell>{entry.totalValue.toFixed(2)} USD</TableCell>
        </TableRow>
    );
}