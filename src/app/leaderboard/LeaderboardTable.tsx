import PageableTable from "@/components/table/PageableTable.tsx";
import LeaderboardEntryRow from "@/leaderboard/LeaderboardEntryRow.tsx";
import {
	leaderboardTableColumnClassNames,
	leaderboardTableHeaderItems,
} from "@/leaderboard/leaderboardTableColumns.ts";
import type { LeaderboardEntry } from "@/leaderboard/leaderboardTypes.ts";

interface Props {
	leaderboardEntries: LeaderboardEntry[];
	pageSize: number;
	currentPage: number;
	totalEntriesCount: number;
	returnTo: string;
}

type LeaderboardTableEntry = LeaderboardEntry & {
	id: number;
};

export default function LeaderboardTable({
	leaderboardEntries,
	pageSize,
	currentPage,
	totalEntriesCount,
	returnTo,
}: Props) {
	return (
		<div>
			<PageableTable<LeaderboardTableEntry>
				items={leaderboardEntries.map((entry) => ({
					...entry,
					id: entry.userId,
				}))}
				pageSize={pageSize}
				currentPage={currentPage}
				totalEntriesCount={totalEntriesCount}
				basePath="/leaderboard/"
				headerItems={leaderboardTableHeaderItems}
				columnClassNames={leaderboardTableColumnClassNames}
				renderRow={(entry) => (
					<LeaderboardEntryRow
						key={entry.id}
						entry={entry}
						returnTo={returnTo}
					/>
				)}
			/>
		</div>
	);
}
