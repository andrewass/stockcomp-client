import {
    Paper,
    Table,
    TableBody,
    TableCell,
    tableCellClasses,
    TableContainer,
    TableHead,
    TableRow,
    useMediaQuery
} from "@mui/material";
import {styled, useTheme} from '@mui/material/styles';
import LeaderboardEntryRow from "./LeaderboardEntryRow";
import {LeaderboardEntry} from "../../types/leaderboard";


const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#2196f3",
        color: theme.palette.common.white,
    }
}))

interface Props{
    leaderboardEntries: LeaderboardEntry[]
}

export const LeaderboardTable = ({leaderboardEntries} : Props) => {

    const theme = useTheme();
    const isLargeWidth = useMediaQuery(theme.breakpoints.up("md"));

    return (
        <TableContainer component={Paper} sx={{width: isLargeWidth ? "60%" : "95%", m: "0 auto", mt: "10%"}}>
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
                    {leaderboardEntries.map(entry => <LeaderboardEntryRow entry={entry} key={entry.username}/>)}
                </TableBody>
            </Table>
        </TableContainer>
    );
}