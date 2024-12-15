import {TableCell, TableRow} from "@mui/material";
import {format, parseISO} from "date-fns";
import {NavLink} from "react-router-dom";
import {Contest, contestStatusRecord} from "../domain/contests/contestTypes";


export const ContestEntry = ({contest}: { contest: Contest }) => {

    return (
        <TableRow key={contest.contestId}>
            <TableCell>
                <NavLink to={`/contests/${contest.contestId}`} style={{textDecoration: "none", color: "black"}}>
                    {contest.contestName}
                </NavLink>
            </TableCell>
            <TableCell>{contestStatusRecord[contest.contestStatus]}</TableCell>
            <TableCell>{format(parseISO(contest.startTime), "yyyy-MM-dd HH:mm")}</TableCell>
            <TableCell>{format(parseISO(contest.endTime), "yyyy-MM-dd HH:mm")}</TableCell>
            <TableCell>{contest.contestId}</TableCell>
        </TableRow>
    );
}
