import {TableCell, TableRow} from "@mui/material";
import {format, parseISO} from "date-fns";
import {NavLink} from "react-router-dom";


export const ContestEntry = ({contest}) => {

    return (
        <TableRow key={contest.contestNumber}>
            <TableCell>
                <NavLink  to={{
                    pathname: "/contest-detail",
                    state: {contest: contest}
                }}>
                {contest.contestNumber}
                </NavLink>
            </TableCell>
            <TableCell>{contest.contestStatus}</TableCell>
            <TableCell>{format(parseISO(contest.startTime), "yyyy-MM-dd HH:mm")}</TableCell>
            <TableCell>{contest.participantCount}</TableCell>
        </TableRow>
    );
}