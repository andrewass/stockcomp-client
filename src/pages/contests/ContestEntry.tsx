import {Box, TableCell, TableRow, Typography} from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import {Contest, contestStatusRecord, getStatusByColor} from "../../domain/contests/contestTypes";
import {formatDate} from "../../util/dateUtils";
import {Link} from "@tanstack/react-router";


export const ContestEntry = ({contest}: { contest: Contest }) => {

    return (
        <TableRow key={contest.contestId}>
            <TableCell>
                <Link to="/contests/$contestId" params={{contestId: contest.contestId.toString()}}>
                    {contest.contestName}
                </Link>
            </TableCell>
            <TableCell>
                <Box display="flex" flexDirection="row">
                    <Typography>{contestStatusRecord[contest.contestStatus]}</Typography>
                    <CircleIcon sx={{color: getStatusByColor(contest), marginRight: 1}}/>
                </Box>
            </TableCell>
            <TableCell>{formatDate(contest.startTime)}</TableCell>
            <TableCell>{formatDate(contest.endTime)}</TableCell>
            <TableCell>{contest.contestId}</TableCell>
        </TableRow>
    );
}
