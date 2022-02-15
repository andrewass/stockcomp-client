import {TableCell, TableRow} from "@mui/material";
import {format, parseISO} from "date-fns";
import {Link} from "react-router-dom";


export const ContestEntry = ({contest}) => {

    return (
        <TableRow key={contest.contestNumber}>
            <TableCell>
                <Link to={`/contest/${contest.contestNumber}`}>
                    {contest.contestNumber}
                </Link>
            </TableCell>
            <TableCell>{contest.contestStatus}</TableCell>
            <TableCell>{format(parseISO(contest.startTime), "yyyy-MM-dd HH:mm")}</TableCell>
            <TableCell>{contest.participantCount}</TableCell>
        </TableRow>
    );
}