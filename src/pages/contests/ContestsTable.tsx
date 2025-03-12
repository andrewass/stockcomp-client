import {
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
import {ContestEntry} from "./ContestEntry";
import {Contest} from "../../domain/contests/contestTypes";
import {ChangeEvent} from "react";
import {StyledTableCell} from "../../styles/components/StyledTableCell";


interface Props {
    contests: Contest[];
    totalEntriesCount: number
    currentPage: number
    rowsPerPage: number
    handlePageChange: (event: unknown, newPage: number) => void
    handleChangeRowsPerPage: (event: ChangeEvent<HTMLInputElement>) => void
}

export const ContestsTable = ({
                                  contests,
                                  totalEntriesCount,
                                  currentPage,
                                  rowsPerPage,
                                  handlePageChange,
                                  handleChangeRowsPerPage
                              }: Props) => {
    const theme = useTheme();
    const isLargeWidth = useMediaQuery(theme.breakpoints.up("md"));


    return (
        <Paper sx={{width: isLargeWidth ? "60%" : "95%"}}>
            <TableContainer>
                <Table>
                    <TableHead sx={{backgroundColor: "greenyellow"}}>
                        <TableRow>
                            <StyledTableCell>Contest</StyledTableCell>
                            <StyledTableCell>Status</StyledTableCell>
                            <StyledTableCell>Start Date</StyledTableCell>
                            <StyledTableCell>End Date</StyledTableCell>
                            <StyledTableCell>Participants</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {contests.map(contest => <ContestEntry key={contest.contestId} contest={contest}/>)}
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
