import PageableTable, { Column } from "../../components/table/PageableTable";
import { useApiWrapper } from "../../config/useApiWrapper";
import { getAllContestsConfig } from "../../domain/contests/contestApi";
import { Contest } from "../../domain/contests/contestTypes";
import { ContestRow } from "./ContestRow";

const columns: Column[] = [
  { id: "contest", label: "Contest" },
  { id: "status", label: "Status" },
  { id: "startDate", label: "Start Date" },
  { id: "endDate", label: "End Date" },
  { id: "participants", label: "Participants" },
];

export default function ContestsTable() {
  const { apiGet } = useApiWrapper();

  async function fetchContestEntries(page: number, pageRowCount: number) {
    const response = await apiGet(getAllContestsConfig(page, pageRowCount));
    return {
      rows: response.contests,
      total: response.totalEntriesCount,
    };
  }

  function renderRow(row: Contest, key: number) {
    return <ContestRow contest={row} key={key} />;
  }

  return (
    <PageableTable<Contest>
      columns={columns}
      fetchData={fetchContestEntries}
      renderRow={renderRow}
    />
  );
}
