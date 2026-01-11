"use client";

import { CircularProgress } from "@mui/material";
import { useState } from "react";
import LeaderboardEntryRow from "@/leaderboard/LeaderboardEntryRow.tsx";
import type { LeaderboardEntry } from "@/leaderboard/leaderboardTypes.ts";
import { useGetPageableLeaderboardEntries } from "@/leaderboard/useLeaderboard.ts";
import PageableTable, {
	type Column,
} from "../../components/table/PageableTable.tsx";
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

	if (isLoading) {
		return <CircularProgress />;
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
