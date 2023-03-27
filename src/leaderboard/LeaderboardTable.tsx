import {Paper, Table, TableBody, TableContainer, TableHead, TableRow, useMediaQuery, useTheme,} from '@mui/material';
import {LeaderboardEntry} from "./leaderboardTypes";
import LeaderboardEntryRow from "./LeaderboardEntryRow";
import {StyledTableCell} from "../styles/components/StyledTableCell";


interface Props {
    leaderboardEntries: LeaderboardEntry[];
}

export const LeaderboardTable = ({leaderboardEntries}: Props) => {
    const theme = useTheme();
    const isLargeWidth = useMediaQuery(theme.breakpoints.up("md"));

    return (
        <TableContainer
            component={Paper}
            sx={{width: isLargeWidth ? "60%" : "95%", m: "0 auto", mt: "10%"}}
        >
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
                    {leaderboardEntries.map((entry) => (
                        <LeaderboardEntryRow entry={entry} key={entry.displayName}/>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};