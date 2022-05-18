import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

const AdminContestRow = ({contest}) => {

    return (
        <TableRow key={contest.contestNumber}>
            <TableCell>{contest.contestNumber}</TableCell>
            <TableCell>{contest.startTime}</TableCell>
            <TableCell>{contest.contestStatus}</TableCell>
            <TableCell>{contest.leaderboardUpdateStatus}</TableCell>
        </TableRow>
    );
}

export default AdminContestRow;