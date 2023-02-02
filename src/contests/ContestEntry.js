import {TableCell, TableRow} from "@mui/material";
import {format, parseISO} from "date-fns";
import {Link} from "react-router-dom";
import {contestStatusMap} from "./contestTypes";


export const ContestEntry = ({contest}) => {

    return (
        <TableRow key={contest.contestNumber}>
            <TableCell>
                <Link to={`/contest/${contest.contestNumber}`}>
                    {contest.contestNumber}
                </Link>
            </TableCell>
            <TableCell>{contestStatusMap.get(contest.contestStatus)}</TableCell>
            <TableCell>{format(parseISO(contest.startTime), "yyyy-MM-dd HH:mm")}</TableCell>
            <TableCell>{contest.participantCount}</TableCell>
        </TableRow>
    );
}