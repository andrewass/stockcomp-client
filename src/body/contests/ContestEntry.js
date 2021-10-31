import {TableCell, TableRow} from "@mui/material";
import React from "react";
import {format, parseISO} from "date-fns";


const ContestEntry = ({contest}) => {

    return (
        <TableRow key={contest.contestNumber}>
            <TableCell>{contest.contestNumber}</TableCell>
            <TableCell>{contest.contestStatus}</TableCell>
            <TableCell>{format(parseISO(contest.startTime), "yyyy-MM-dd HH:mm")}</TableCell>
            <TableCell>{contest.participantCount}</TableCell>
        </TableRow>
    );
}

export default ContestEntry;