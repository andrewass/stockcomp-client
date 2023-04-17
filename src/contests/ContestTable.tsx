import {
    CircularProgress,
    Paper,
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    useMediaQuery
} from "@mui/material";
import {useTheme} from '@mui/material/styles';
import {StyledTableCell} from "../styles/components/StyledTableCell";
import {ContestEntry} from "./ContestEntry";
import {Contest, ContestPage} from "./contestTypes";
import {ChangeEvent, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import ErrorComponent from "../error/ErrorComponent";
import {useApiWrapper} from "../config/apiWrapper";
import {GET_ALL_CONTESTS_SORTED, getAllContestsSortedByContestNumberConfig} from "./api/contestApi";


export const ContestTable = () => {
    const {apiGet} = useApiWrapper();
    const theme = useTheme();
    const isLargeWidth = useMediaQuery(theme.breakpoints.up("md"));
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [contestEntries, setContestEntries] = useState<Contest[]>([]);
    const [totalEntriesCount, setTotalEntriesCount] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(1);

    const fetchContestEntries = async (page: number, pageRowCount: number) => {
        const data = await apiGet(getAllContestsSortedByContestNumberConfig(page, pageRowCount));
        setTotalEntriesCount(data.totalEntriesCount);
        setContestEntries(data.contests);
        setCurrentPage(page);
        setRowsPerPage(pageRowCount);

        return data;
    }

    const {error, isLoading} = useQuery<ContestPage>(
        [GET_ALL_CONTESTS_SORTED],
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
        <Paper sx={{width: isLargeWidth ? "60%" : "95%", m: "0 auto", mt: "10%"}}>
            <TableContainer>
                <Table>
                    <TableHead sx={{backgroundColor: "greenyellow"}}>
                        <TableRow>
                            <StyledTableCell>Contest</StyledTableCell>
                            <StyledTableCell>Status</StyledTableCell>
                            <StyledTableCell>Start Date</StyledTableCell>
                            <StyledTableCell>Participants</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {contestEntries.map(contest => <ContestEntry key={contest.contestNumber} contest={contest}/>)}
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