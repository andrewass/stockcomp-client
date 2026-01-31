import PageableTable from "@/components/table/PageableTable.tsx";
import type { LeaderboardEntry } from "@/leaderboard/leaderboardTypes.ts";

type Props = {
	leaderboardEntries: LeaderboardEntry[];
	pageSize: number;
	currentPage: number;
	totalEntriesCount: number;
};

const leaderboardTableHeaderItems = [
	"Ranking",
	"Country",
	"Name",
	"Score",
	"Medals",
];

export default function LeaderboardTable({
	leaderboardEntries,
	pageSize,
	currentPage,
	totalEntriesCount,
}: Props) {
	return (
		<div>
			<PageableTable
				items={leaderboardEntries.map((entry) => ({
					...entry,
					id: entry.ranking,
				}))}
				pageSize={pageSize}
				currentPage={currentPage}
				headerItems={leaderboardTableHeaderItems}
				renderRow={() => <p>hello</p>}
			/>
		</div>
	);
}
