import React from "react";
import {Paper, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow} from "@mui/material";
import {styled} from '@mui/material/styles';
import LeaderboardEntry from "./LeaderboardEntry";


const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#2196f3",
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const LeaderboardTable = ({leaderboardEntries}) => {

    return (
        <TableContainer component={Paper} sx={{maxWidth: "50%", m: "0 auto", mt: "10%"}}>
            <Table>
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Ranking</StyledTableCell>
                        <StyledTableCell>Username</StyledTableCell>
                        <StyledTableCell>Country</StyledTableCell>
                        <StyledTableCell>Score</StyledTableCell>
                        <StyledTableCell>Medals</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {leaderboardEntries.map(entry => <LeaderboardEntry entry={entry}/>)}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default LeaderboardTable;