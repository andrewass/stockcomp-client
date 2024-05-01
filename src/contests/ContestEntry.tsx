import {TableCell, TableRow} from "@mui/material";
import {format, parseISO} from "date-fns";
import {NavLink} from "react-router-dom";
import {Contest, contestStatusMap} from "../domain/contests/contestTypes";


export const ContestEntry = ({contest}: { contest: Contest }) => {

    return (
        <TableRow key={contest.contestNumber}>
            <TableCell>
                <NavLink to={`/contests/${contest.contestNumber}`} style={{textDecoration: "none", color: "black"}}>
                    {contest.contestNumber}
                </NavLink>
            </TableCell>
            <TableCell>{contestStatusMap.get(contest.contestStatus)}</TableCell>
            <TableCell>{format(parseISO(contest.startTime), "yyyy-MM-dd HH:mm")}</TableCell>
            <TableCell>{contest.participantCount}</TableCell>
        </TableRow>
    );
}