import {
    CircularProgress,
    Paper,
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import {LeaderboardEntry, LeaderboardEntryPage} from "./leaderboardTypes";
import LeaderboardEntryRow from "./LeaderboardEntryRow";
import {StyledTableCell} from "../styles/components/StyledTableCell";
import {ChangeEvent, useState} from "react";
import {useQuery} from "react-query";
import {useApiWrapper} from "../config/apiWrapper";
import {GET_SORTED_LEADERBOARD_ENTRIES, getSortedLeaderboardEntriesConfig} from "./api/leaderboardApi";
import ErrorComponent from "../error/ErrorComponent";


export const LeaderboardTable = () => {
    const theme = useTheme();
    const isLargeWidth = useMediaQuery(theme.breakpoints.up("md"));
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [leaderboardEntries, setLeaderboardEntries] = useState<LeaderboardEntry[]>([]);
    const [totalEntriesCount, setTotalEntriesCount] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(1);
    const {apiGet} = useApiWrapper();

    const fetchLeaderboardEntries = async (page: number) => {
        const data = await apiGet(getSortedLeaderboardEntriesConfig(page));
        setTotalEntriesCount(data.totalEntriesCount);
        setLeaderboardEntries(data.entries);
        setCurrentPage(page);

        return data;
    }

    const {isLoading, error} = useQuery<LeaderboardEntryPage>(
        GET_SORTED_LEADERBOARD_ENTRIES,
        () => fetchLeaderboardEntries(currentPage)
    );

    const handlePageChange = (event: unknown, newPage: number) => {
        fetchLeaderboardEntries(newPage)
            .catch(error => console.log(error));
    }

    const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        fetchLeaderboardEntries(0)
            .catch(error => console.log(error));
    };

    if (isLoading) return <CircularProgress/>

    if (error) return <ErrorComponent errorMessage={error as string}/>

    return (
        <Paper sx={{width: isLargeWidth ? "60%" : "95%", m: "0 auto", mt: "10%"}}>
            <TableContainer>
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
            <TablePagination
                count={totalEntriesCount} page={currentPage}
                rowsPerPageOptions={[1, 5, 10, 25]}
                rowsPerPage={rowsPerPage} onPageChange={handlePageChange}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
};