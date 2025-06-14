import {Box, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow} from "@mui/material";
import {ContestEntry} from "./ContestEntry";
import {Contest} from "../../domain/contests/contestTypes";
import {ChangeEvent} from "react";
import {useThemeContext} from "../../theme/AppThemeContext";
import {lightTheme} from "../../theme/themes";


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
                                      }: Props) {
    const {appTheme} = useThemeContext();

    return (
        <Box sx={{border: "4px solid", borderColor: "divider", borderRadius: 2}}>
            <TableContainer>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            {["Contest", "Status", "Start Date", "End Date", "Participants"]
                                .map(header =>
                                    <TableCell key={header}
                                               sx={{backgroundColor: appTheme === lightTheme ? appTheme.palette.secondary.main : appTheme.palette.primary.main}} >
                                        {header}
                                    </TableCell>
                                )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {contests.map(contest => <ContestEntry key={contest.contestId} contest={contest}/>)}
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
