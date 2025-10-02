import { useState } from "react";
import PageableTable, {
	type Column,
} from "../../../components/table/PageableTable";
import type { Contest } from "../../../domain/contests/contestTypes";
import { useGetPageableContests } from "../../../domain/contests/useContest";
import ErrorComponent from "../../../error/ErrorComponent";
import { AdminContestRow } from "./AdminContestRow";

const columns: Column[] = [
	{ id: "contest", label: "Contest" },
	{ id: "status", label: "Status" },
	{ id: "startDate", label: "Start Date" },
	{ id: "endDate", label: "End Date" },
	{ id: "edit", label: "Edit" },
	{ id: "delete", label: "Delete" },
];

export default function AdminContestsTable() {
	const [page, setPage] = useState<number>(0);
	const [rowsPerPage, setRowsPerPage] = useState<number>(10);

	const { data, isLoading, isError, error } = useGetPageableContests(
		page,
		rowsPerPage,
	);

	function renderRow(row: Contest, key: number) {
		return <AdminContestRow contest={row} key={key} />;
	}

	if (isError) {
		return <ErrorComponent error={error} />;
	}

	return (
		<PageableTable<Contest>
			columns={columns}
			page={page}
			rowsPerPage={rowsPerPage}
			totalEntriesCount={data?.totalEntriesCount}
			rows={data?.contests}
			isLoading={isLoading}
			onChangePage={setPage}
			onChangeRowsPerPage={setRowsPerPage}
			renderRow={renderRow}
		/>
	);
}
