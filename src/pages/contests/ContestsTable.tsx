import PageableTable, { Column } from "../../components/table/PageableTable";
import { Contest } from "../../domain/contests/contestTypes";
import { ContestRow } from "./ContestRow";
import { useGetPageableContests } from "../../domain/contests/useContest";
import { useState } from "react";
import ErrorComponent from "../../error/ErrorComponent";

const columns: Column[] = [
  { id: "contest", label: "Contest" },
  { id: "status", label: "Status" },
  { id: "startDate", label: "Start Date" },
  { id: "endDate", label: "End Date" },
  { id: "participants", label: "Participants" },
];

export default function ContestsTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { data, isLoading, isError, error } = useGetPageableContests(
    page,
    rowsPerPage,
  );

  function renderRow(row: Contest, key: number) {
    return <ContestRow contest={row} key={key} />;
  }

  if (isError) {
    return <ErrorComponent error={error} />;
  }

  return (
    <PageableTable<Contest>
      columns={columns}
      renderRow={renderRow}
      rows={data?.contests}
      page={page}
      rowsPerPage={rowsPerPage}
      totalEntriesCount={data?.totalEntriesCount}
      isLoading={isLoading}
      onChangePage={setPage}
      onChangeRowsPerPage={setRowsPerPage}
    />
  );
}
