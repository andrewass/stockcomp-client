"use client";

import { useState } from "react";
import PageableTable, {
	type Column,
} from "../../components/table/PageableTable";
import ErrorComponent from "../../error/ErrorComponent";
import LeaderboardEntryRow from "../../app/leaderboard/LeaderboardEntryRow.tsx";
import { CircularProgress } from "@mui/material";
import {useGetPageableLeaderboardEntries} from "./useLeaderboard.ts";
import {LeaderboardEntry} from "./leaderboardTypes.ts";

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
        <p>{JSON.stringify(data)}</p>
    )

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
