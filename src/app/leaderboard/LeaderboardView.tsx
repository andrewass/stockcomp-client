import type { LeaderboardEntry } from "@/leaderboard/leaderboardTypes.ts";
import CurrentUserLeaderboardEntry from "./CurrentUserLeaderboardEntry.tsx";
import LeaderboardTable from "./LeaderboardTable.tsx";

interface Props {
	leaderboardEntries: LeaderboardEntry[];
	currentUserLeaderboardEntry: LeaderboardEntry | null;
	pageSize: number;
	currentPage: number;
	totalEntriesCount: number;
}

export default function LeaderboardView({
	leaderboardEntries,
	currentUserLeaderboardEntry,
	pageSize,
	currentPage,
	totalEntriesCount,
}: Props) {
	return (
		<div className="space-y-8">
			<div
				className="flex min-h-12 items-center justify-end"
				aria-hidden="true"
			/>
			<div className="space-y-12">
				<LeaderboardTable
					leaderboardEntries={leaderboardEntries}
					pageSize={pageSize}
					currentPage={currentPage}
					totalEntriesCount={totalEntriesCount}
				/>
				<CurrentUserLeaderboardEntry entry={currentUserLeaderboardEntry} />
			</div>
		</div>
	);
}
