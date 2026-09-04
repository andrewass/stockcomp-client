import DataTable, { TableFrame } from "@/components/table/DataTable.tsx";
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

export default function LeaderboardTable({
	leaderboardEntries,
	pageSize,
	currentPage,
	totalEntriesCount,
	returnTo,
}: Props) {
	return (
		<TableFrame>
			<DataTable
				items={leaderboardEntries}
				headerItems={leaderboardTableHeaderItems}
				columnDefinitions={leaderboardTableColumnDefinitions}
				renderRow={(entry) => (
					<LeaderboardEntryRow
						key={entry.userId}
						entry={entry}
						returnTo={returnTo}
					/>
				)}
			/>
			<UrlTablePager
				currentPage={currentPage}
				pageSize={pageSize}
				totalEntriesCount={totalEntriesCount}
				basePath="/leaderboard/"
			/>
		</TableFrame>
	);
}
