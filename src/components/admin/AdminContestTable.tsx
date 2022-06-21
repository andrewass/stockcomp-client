import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AdminContestRow from "./AdminContestRow";
import {Contest} from "../../types/contest";

interface Props{
    contests: Contest[]
}

const AdminContestTable = ({contests}: Props) => {

    return (
        <TableContainer component={Paper} sx={{mt: "10%"}}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Contest Number</TableCell>
                        <TableCell>Start time</TableCell>
                        <TableCell>Contest Status</TableCell>
                        <TableCell>Leaderboard Update Status</TableCell>
                        <TableCell>Edit</TableCell>
                        <TableCell>Delete</TableCell>
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