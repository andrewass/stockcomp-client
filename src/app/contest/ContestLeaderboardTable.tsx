import PageableTable from "@/components/table/PageableTable.tsx";
import type { ContestLeaderboardParticipant } from "@/domain/contests/contestParticipantTypes.ts";

interface Props {
	participants: ContestLeaderboardParticipant[];
	contestId: number;
	pageSize: number;
	currentPage: number;
	totalEntriesCount: number;
}

type ContestLeaderboardRow = ContestLeaderboardParticipant & {
	id: number;
};

const numberFormatter = new Intl.NumberFormat(undefined, {
	maximumFractionDigits: 2,
});

const contestLeaderboardHeaderItems = [
	"Ranking",
	"Country",
	"Name",
	"Total Value",
	"Remaining Funds",
];

function formatNumericValue(value: number): string {
	return numberFormatter.format(value);
}

export default function ContestLeaderboardTable({
	participants,
	contestId,
	pageSize,
	currentPage,
	totalEntriesCount,
}: Props) {
	return (
		<PageableTable<ContestLeaderboardRow>
			items={participants.map((participant) => ({
				...participant,
				id: participant.participantId,
			}))}
			pageSize={pageSize}
			currentPage={currentPage}
			totalEntriesCount={totalEntriesCount}
			basePath={`/contest/${contestId}`}
			headerItems={contestLeaderboardHeaderItems}
			renderRow={(participant) => (
				<tr key={participant.id}>
					<td>{participant.rank ?? "-"}</td>
					<td>{participant.country ?? "-"}</td>
					<td>{participant.username}</td>
					<td>{formatNumericValue(participant.totalValue)}</td>
					<td>{formatNumericValue(participant.remainingFunds)}</td>
				</tr>
			)}
		/>
	);
}
