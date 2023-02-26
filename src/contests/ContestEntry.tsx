import {TableCell, TableRow} from "@mui/material";
import {format, parseISO} from "date-fns";
import {Link} from "react-router-dom";
import {Contest, contestStatusMap} from "./contestTypes";

interface Props {
    contest: Contest
}

export const ContestEntry = ({contest}: Props) => {

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