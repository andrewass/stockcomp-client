import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AdminContestRow from "./AdminContestRow";
import {Contest} from "../contests/contestTypes";
import {StyledTableCell} from "../styles/components/StyledTableCell";

interface Props {
    contests: Contest[]
}

const AdminContestTable = ({contests}: Props) => {

    return (
        <TableContainer component={Paper} sx={{mt: "10%"}}>
            <Table>
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Contest Number</StyledTableCell>
                        <StyledTableCell>Start time</StyledTableCell>
                        <StyledTableCell>Contest Status</StyledTableCell>
                        <StyledTableCell>Leaderboard Update Status</StyledTableCell>
                        <StyledTableCell>Edit</StyledTableCell>
                        <StyledTableCell>Delete</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {contests.map(contest => <AdminContestRow key={contest.contestNumber} contest={contest}/>)}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default AdminContestTable