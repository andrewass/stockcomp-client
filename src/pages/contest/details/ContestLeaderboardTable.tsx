import PageableTable, { Column } from "../../../components/table/PageableTable";
import { Participant } from "../../../domain/participant/participantTypes";
import ContestLeaderboardEntry from "./ContestLeaderboardEntry";
import { useState } from "react";
import { useGetSortedParticipants } from "../../../domain/participant/useParticipant";

interface Props {
  contestId: number;
}

const columns: Column[] = [
  { id: "ranking", label: "Ranking" },
  { id: "username", label: "Username" },
  { id: "country", label: "Country" },
  { id: "totalValue", label: "Total Value" },
];

export default function ContestLeaderboardTable({ contestId }: Props) {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const { data, isLoading } = useGetSortedParticipants(
    contestId,
    page,
    rowsPerPage,
  );

  function renderRow(row: Participant, key: number) {
    return <ContestLeaderboardEntry participant={row} key={key} />;
  }

  return (
    <PageableTable
      columns={columns}
      renderRow={renderRow}
      rows={data?.participants}
      page={page}
      rowsPerPage={rowsPerPage}
      totalEntriesCount={data?.totalEntriesCount}
      isLoading={isLoading}
      onChangePage={setPage}
      onChangeRowsPerPage={setRowsPerPage}
    />
  );
}
