import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AdminContestRow from "./AdminContestRow";


const AdminContestTable = ({contests}) => {

    return (
        <TableContainer component={Paper} sx={{width: "60%", m: "0 auto", mt: "10%"}}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Contest Number</TableCell>
                        <TableCell>Start time</TableCell>
                        <TableCell>Contest Status</TableCell>
                        <TableCell>Leaderboard Update Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {contests.map(contest => <AdminContestRow contest={contest}/>)}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default AdminContestTable;