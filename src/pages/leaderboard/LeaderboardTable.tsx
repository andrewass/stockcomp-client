import {
    Box,
    CircularProgress,
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
import {lightTheme} from "../../theme/themes";
import {useThemeContext} from "../../theme/AppThemeContext";


export const LeaderboardTable = () => {
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [leaderboardEntries, setLeaderboardEntries] = useState<LeaderboardEntry[]>([]);
    const [totalEntriesCount, setTotalEntriesCount] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(10);
    const {apiGet} = useApiWrapper();
    const {appTheme} = useThemeContext();

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
        <Box sx={{border: "4px solid", borderColor: "divider", borderRadius: 2}}>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            {["Rank", "Username", "Country", "Score", "Medals"].map(header =>
                                <TableCell key={header}
                                           sx={{backgroundColor: appTheme === lightTheme ? appTheme.palette.secondary.main : appTheme.palette.primary.main}} >
                                    {header}
                                </TableCell>
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {leaderboardEntries.length > 0 ? (
                                leaderboardEntries.map((entry) => (
                                    <LeaderboardEntryRow entry={entry} key={entry.displayName}/>
                                )))
                            : (
                                <TableRow>
                                    <TableCell align="center" colSpan={5}>No entries found</TableCell>
                                </TableRow>
                            )
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                sx={{backgroundColor: appTheme === lightTheme ? appTheme.palette.secondary.main : appTheme.palette.primary.main}}
                component="div" count={totalEntriesCount}
                page={currentPage} rowsPerPageOptions={[1, 5, 10, 25]}
                rowsPerPage={rowsPerPage} onPageChange={handlePageChange}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Box>
    );
}
