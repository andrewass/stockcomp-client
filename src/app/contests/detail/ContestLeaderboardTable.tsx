import PageableTable from "@/components/table/PageableTable.tsx";
import type { ContestLeaderboardParticipant } from "@/domain/contests/contestParticipantTypes.ts";
import { formatNumber } from "@/lib/formatters.ts";

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

const contestLeaderboardHeaderItems = [
	"Ranking",
	"Country",
	"Name",
	"Total Value",
	"Remaining Funds",
];

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
					<td>
						{formatNumber(participant.totalValue, { maximumFractionDigits: 2 })}
					</td>
					<td>
						{formatNumber(participant.remainingFunds, {
							maximumFractionDigits: 2,
						})}
					</td>
				</tr>
			)}
		/>
	);
}
