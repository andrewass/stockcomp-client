import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { AdminContestRow } from "./AdminContestRow";
import { useQuery } from "@tanstack/react-query";
import { ChangeEvent, useState } from "react";
import {
  Box,
  CircularProgress,
  TableCell,
  TablePagination,
} from "@mui/material";
import { useApiWrapper } from "../../../config/useApiWrapper";
import { Contest, ContestPage } from "../../../domain/contests/contestTypes";
import {
  GET_ALL_CONTESTS,
  getAllContestsConfig,
} from "../../../domain/contests/contestApi";
import ErrorComponent from "../../../error/ErrorComponent";

export const AdminContestsTable = () => {
  const { apiGet } = useApiWrapper();

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [contestEntries, setContestEntries] = useState<Contest[]>([]);
  const [totalEntriesCount, setTotalEntriesCount] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const fetchContestEntries = async (page: number, pageRowCount: number) => {
    const data = await apiGet(getAllContestsConfig(page, pageRowCount));
    setTotalEntriesCount(data.totalEntriesCount);
    setContestEntries(data.contests);
    setCurrentPage(page);
    setRowsPerPage(pageRowCount);

    return data;
  };

  const { isPending, error, isError } = useQuery<ContestPage>({
    queryKey: [GET_ALL_CONTESTS],
    queryFn: () => fetchContestEntries(currentPage, rowsPerPage),
  });

  const handlePageChange = (event: unknown, newPage: number) => {
    fetchContestEntries(newPage, rowsPerPage).catch((error) =>
      console.log(error),
    );
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    fetchContestEntries(0, +event.target.value).catch((error) =>
      console.log(error),
    );
  };

  if (isPending) return <CircularProgress />;

  if (isError) return <ErrorComponent error={error} />;

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Contest Name</TableCell>
              <TableCell>Start time</TableCell>
              <TableCell>Contest Status</TableCell>
              <TableCell>Leaderboard Update Status</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contestEntries.map((contest) => (
              <AdminContestRow key={contest.contestId} contest={contest} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={totalEntriesCount}
        page={currentPage}
        rowsPerPageOptions={[1, 5, 10, 25]}
        rowsPerPage={rowsPerPage}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};
