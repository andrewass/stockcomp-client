import {Box, TableCell, TableRow, Typography} from "@mui/material";
import {NavLink} from "react-router-dom";
import {Contest, contestStatusRecord, getStatusByColor} from "../domain/contests/contestTypes";
import {formatDate} from "../util/dateUtils";
import CircleIcon from "@mui/icons-material/Circle";


export const ContestEntry = ({contest}: { contest: Contest }) => {

    return (
        <TableRow key={contest.contestId}>
            <TableCell>
                <NavLink to={`/contests/${contest.contestId}`} style={{textDecoration: "none", color: "black"}}>
                    {contest.contestName}
                </NavLink>
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
