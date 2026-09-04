import PageableTable from "@/components/table/PageableTable.tsx";
import UrlTablePager from "@/components/table/UrlTablePager.tsx";
import LeaderboardEntryRow from "@/leaderboard/LeaderboardEntryRow.tsx";
import {
	leaderboardTableColumnDefinitions,
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
				headerItems={leaderboardTableHeaderItems}
				columnDefinitions={leaderboardTableColumnDefinitions}
				pagination={
					<UrlTablePager
						currentPage={currentPage}
						pageSize={pageSize}
						totalEntriesCount={totalEntriesCount}
						basePath="/leaderboard/"
					/>
				}
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
