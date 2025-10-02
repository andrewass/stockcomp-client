import { useState } from "react";
import PageableTable, {
	type Column,
} from "../../../components/table/PageableTable";
import type { Participant } from "../../../domain/participant/participantTypes";
import { useGetSortedParticipants } from "../../../domain/participant/useParticipant";
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
