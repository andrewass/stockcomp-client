import type { LeaderboardEntry } from "@/leaderboard/leaderboardTypes.ts";
import LeaderboardTable from "./LeaderboardTable.tsx";

interface Props {
	leaderboardEntries: LeaderboardEntry[];
	pageSize: number;
	currentPage: number;
	totalEntriesCount: number;
}

export default function LeaderboardView({
	leaderboardEntries,
	pageSize,
	currentPage,
	totalEntriesCount,
}: Props) {
	return (
		<div className="space-y-4">
			<div
				className="flex min-h-12 items-center justify-end"
				aria-hidden="true"
			/>
			<LeaderboardTable
				leaderboardEntries={leaderboardEntries}
				pageSize={pageSize}
				currentPage={currentPage}
				totalEntriesCount={totalEntriesCount}
			/>
		</div>
	);
}
