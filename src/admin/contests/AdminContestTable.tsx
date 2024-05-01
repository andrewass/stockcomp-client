import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {AdminContestRow} from "./AdminContestRow";
import {StyledTableCell} from "../../styles/components/StyledTableCell";
import {useQuery} from "@tanstack/react-query";
import {GET_ALL_CONTESTS_ADMIN, getContestsSortedConfig} from "../api/adminApi";
import {ChangeEvent, useState} from "react";
import {CircularProgress, TablePagination} from "@mui/material";
import ErrorComponent from "../../error/ErrorComponent";
import {useApiWrapper} from "../../config/useApiWrapper";
import {Contest, ContestPage} from "../../domain/contests/contestTypes";


export const AdminContestTable = () => {
    const {apiGet} = useApiWrapper();

    const [currentPage, setCurrentPage] = useState<number>(0);
    const [contestEntries, setContestEntries] = useState<Contest[]>([]);
    const [totalEntriesCount, setTotalEntriesCount] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(10);

    const fetchContestEntries = async (page: number, pageRowCount: number) => {
        const data = await apiGet(getContestsSortedConfig(page, pageRowCount));
        setTotalEntriesCount(data.totalEntriesCount);
        setContestEntries(data.contests);
        setCurrentPage(page);
        setRowsPerPage(pageRowCount);

        return data;
    }

    const {isLoading, error, data: contests} = useQuery<ContestPage>(
        [GET_ALL_CONTESTS_ADMIN],
        () => fetchContestEntries(currentPage, rowsPerPage)
    );

    const handlePageChange = (event: unknown, newPage: number) => {
        fetchContestEntries(newPage, rowsPerPage)
            .catch(error => console.log(error));
    }

    const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
        fetchContestEntries(0, +event.target.value)
            .catch(error => console.log(error));
    }

    if (isLoading) return <CircularProgress/>

    if (error) return <ErrorComponent errorMessage={error as string}/>

    return (
        <Paper>
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
                        {contestEntries.map(contest => <AdminContestRow key={contest.contestNumber}
                                                                        contest={contest}/>)}
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