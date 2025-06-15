import ContestsTable from "./ContestsTable";
import { useQuery } from "@tanstack/react-query";
import { ChangeEvent, useState } from "react";
import { CircularProgress, Container } from "@mui/material";
import { ContestPage } from "../../domain/contests/contestTypes";
import { useApiWrapper } from "../../config/useApiWrapper";
import {
  GET_ALL_CONTESTS,
  getAllContestsConfig,
} from "../../domain/contests/contestApi";
import ErrorComponent from "../../error/ErrorComponent";

export default function ContestsPage() {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalEntriesCount, setTotalEntriesCount] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const { apiGet } = useApiWrapper();

  const fetchContestEntries = async (page: number, pageRowCount: number) => {
    const data = await apiGet(getAllContestsConfig(page, pageRowCount));
    setTotalEntriesCount(data.totalEntriesCount);
    setCurrentPage(page);
    setRowsPerPage(pageRowCount);

    return data;
  };

  const {
    error,
    isPending,
    isError,
    data: contestPage,
  } = useQuery<ContestPage>({
    queryKey: [GET_ALL_CONTESTS],
    queryFn: () => fetchContestEntries(currentPage, rowsPerPage),
  });

  const handlePageChange = (event: unknown, newPage: number) => {
    fetchContestEntries(newPage, rowsPerPage).catch((error) =>
      console.error(error),
    );
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    fetchContestEntries(0, +event.target.value).catch((error) =>
      console.error(error),
    );
  };

  if (isPending) return <CircularProgress />;

  if (isError) return <ErrorComponent error={error} />;

  return (
    <Container sx={{ paddingTop: "100px" }}>
      <ContestsTable
        contests={contestPage.contests}
        totalEntriesCount={totalEntriesCount}
        currentPage={currentPage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        handlePageChange={handlePageChange}
        rowsPerPage={rowsPerPage}
      />
    </Container>
  );
}
