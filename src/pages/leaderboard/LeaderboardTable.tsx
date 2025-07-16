import PageableTable, { Column } from "../../components/table/PageableTable";
import LeaderboardEntryRow from "./LeaderboardEntryRow";
import { LeaderboardEntry } from "../../domain/leaderboard/leaderboardTypes";
import { useGetPageableLeaderboardEntries } from "../../domain/leaderboard/useLeaderboard";
import { useState } from "react";
import ErrorComponent from "../../error/ErrorComponent";

const columns: Column[] = [
  { id: "rank", label: "Rank" },
  { id: "username", label: "Username" },
  { id: "country", label: "Country" },
  { id: "score", label: "Score" },
  { id: "medals", label: "Medals" },
];

export default function LeaderboardTable() {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const { data, isLoading, isError, error } = useGetPageableLeaderboardEntries(
    page,
    rowsPerPage,
  );

  function renderRow(row: LeaderboardEntry, key: number) {
    return <LeaderboardEntryRow entry={row} key={key} />;
  }

  if (isError) {
    return <ErrorComponent error={error} />;
  }

  return (
    <PageableTable<LeaderboardEntry>
      columns={columns}
      renderRow={renderRow}
      rows={data?.leaderboardEntries}
      page={page}
      rowsPerPage={rowsPerPage}
      totalEntriesCount={data?.totalEntriesCount}
      isLoading={isLoading}
      onChangePage={setPage}
      onChangeRowsPerPage={setRowsPerPage}
    />
  );
}
