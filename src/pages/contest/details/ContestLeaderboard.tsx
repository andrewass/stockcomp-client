import { useApiWrapper } from "../../../config/useApiWrapper";
import { getSortedParticipantsConfig } from "../../../domain/participant/participantApi";
import PageableTable, { Column } from "../../../components/table/PageableTable";
import { Participant } from "../../../domain/participant/participantTypes";
import ContestLeaderboardEntry from "./ContestLeaderboardEntry";

interface Props {
  contestId: number;
}

const columns: Column[] = [
  { id: "ranking", label: "Ranking" },
  { id: "username", label: "Username" },
  { id: "country", label: "Country" },
  { id: "totalValue", label: "Total Value" },
];

export default function ContestLeaderboard({ contestId }: Props) {
  const { apiGet } = useApiWrapper();

  async function fetchParticipantEntries(page: number, pageRowCount: number) {
    const data = await apiGet(
      getSortedParticipantsConfig(contestId, page, pageRowCount),
    );
    return {
      rows: data.participants,
      total: data.totalEntriesCount,
    };
  }

  function renderRow(row: Participant, key: number) {
    return <ContestLeaderboardEntry participant={row} key={key} />;
  }

  return (
    <PageableTable
      fetchData={fetchParticipantEntries}
      columns={columns}
      renderRow={renderRow}
    />
  );
}
