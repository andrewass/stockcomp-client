import {
    CircularProgress,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
} from '@mui/material';
import {ChangeEvent, useState} from 'react';
import {LeaderboardEntry, LeaderboardEntryPage} from '../../leaderboard/leaderboardTypes';
import {useApiWrapper} from '../../config/useApiWrapper';
import {useQuery} from '@tanstack/react-query';
import {GET_SORTED_LEADERBOARD_ENTRIES, getSortedLeaderboardEntriesConfig} from '../../leaderboard/api/leaderboardApi';
import ErrorComponent from '../../error/ErrorComponent';
import LeaderboardEntryRow from './LeaderboardEntryRow';


export const LeaderboardTable = () => {
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [leaderboardEntries, setLeaderboardEntries] = useState<LeaderboardEntry[]>([]);
    const [totalEntriesCount, setTotalEntriesCount] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(10);
    const {apiGet} = useApiWrapper();

    const {isError, error, isPending} = useQuery<LeaderboardEntryPage>({
        queryKey: [GET_SORTED_LEADERBOARD_ENTRIES],
        queryFn: () => fetchLeaderboardEntries(currentPage, rowsPerPage),
    });

    const fetchLeaderboardEntries = async (page: number, pageRowCount: number) => {
        const data = await apiGet(getSortedLeaderboardEntriesConfig(page, pageRowCount));
        setTotalEntriesCount(data.totalEntriesCount);
        setLeaderboardEntries(data.entries);
        setCurrentPage(page);
        setRowsPerPage(pageRowCount);

        return data;
    }

    const handlePageChange = (event: unknown, newPage: number) => {
        fetchLeaderboardEntries(newPage, rowsPerPage)
            .catch(error => console.log(error));
    }

    const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
        fetchLeaderboardEntries(0, +event.target.value)
            .catch(error => console.log(error));
    };

    if (isPending) return <CircularProgress/>

    if (isError) return <ErrorComponent error={error}/>

    return (
        <Paper>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Ranking</TableCell>
                            <TableCell>Username</TableCell>
                            <TableCell>Country</TableCell>
                            <TableCell>Score</TableCell>
                            <TableCell>Medals</TableCell>
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
                component="div" count={totalEntriesCount}
                page={currentPage} rowsPerPageOptions={[1, 5, 10, 25]}
                rowsPerPage={rowsPerPage} onPageChange={handlePageChange}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
