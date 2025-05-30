import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow
} from "@mui/material";
import {ContestEntry} from "./ContestEntry";
import {Contest} from "../../domain/contests/contestTypes";
import {ChangeEvent} from "react";


interface Props {
    contests: Contest[];
    totalEntriesCount: number
    currentPage: number
    rowsPerPage: number
    handlePageChange: (event: unknown, newPage: number) => void
    handleChangeRowsPerPage: (event: ChangeEvent<HTMLInputElement>) => void
}

export default function ContestsTable({
                                  contests,
                                  totalEntriesCount,
                                  currentPage,
                                  rowsPerPage,
                                  handlePageChange,
                                  handleChangeRowsPerPage
                              }: Props){
    return (
        <Paper>
            <TableContainer>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell>Contest</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Start Date</TableCell>
                            <TableCell>End Date</TableCell>
                            <TableCell>Participants</TableCell>
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
