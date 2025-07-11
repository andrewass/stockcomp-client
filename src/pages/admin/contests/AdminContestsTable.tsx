import PageableTable, { Column } from "../../../components/table/PageableTable";
import { getAllContestsConfig } from "../../../domain/contests/contestApi";
import { useApiWrapper } from "../../../config/useApiWrapper";
import { AdminContestRow } from "./AdminContestRow";
import { Contest } from "../../../domain/contests/contestTypes";

const columns: Column[] = [
  { id: "contest", label: "Contest" },
  { id: "status", label: "Status" },
  { id: "startDate", label: "Start Date" },
  { id: "endDate", label: "End Date" },
  { id: "edit", label: "Edit" },
  { id: "delete", label: "Delete" },
];

export default function AdminContestsTable() {
  const { apiGet } = useApiWrapper();

  async function fetchContestEntries(page: number, pageRowCount: number) {
    const data = await apiGet(getAllContestsConfig(page, pageRowCount));
    return {
      rows: data.contests,
      total: data.totalEntriesCount,
    };
  }

  function renderRow(row: Contest, key: number) {
    return <AdminContestRow contest={row} key={key} />;
  }

  return (
    <PageableTable
      columns={columns}
      fetchData={fetchContestEntries}
      renderRow={renderRow}
    />
  );
}
