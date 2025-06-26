import PageableTable, { Column } from "../../components/table/PageableTable";
import { LeaderboardEntry } from "../../leaderboard/leaderboardTypes";
import LeaderboardEntryRow from "./LeaderboardEntryRow";
import { getSortedLeaderboardEntriesConfig } from "../../leaderboard/api/leaderboardApi";
import { useApiWrapper } from "../../config/useApiWrapper";

const columns: Column[] = [
  { id: "rank", label: "Rank" },
  { id: "username", label: "Username" },
  { id: "country", label: "Country" },
  { id: "score", label: "Score" },
  { id: "medals", label: "Medals" },
];

export default function LeaderboardTable() {
  const { apiGet } = useApiWrapper();

  async function fetchLeaderboardEntries(page: number, pageRowCount: number) {
    const response = await apiGet(
      getSortedLeaderboardEntriesConfig(page, pageRowCount),
    );
    return {
      rows: response.entries,
      total: response.totalEntriesCount,
    };
  }

  function renderRow(row: LeaderboardEntry, key: number) {
    return <LeaderboardEntryRow entry={row} key={key} />;
  }

  return (
    <PageableTable<LeaderboardEntry>
      columns={columns}
      fetchData={fetchLeaderboardEntries}
      renderRow={renderRow}
    />
  );
}
