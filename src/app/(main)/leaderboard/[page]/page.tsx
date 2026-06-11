import { notFound } from "next/navigation";

import { parseParams } from "@/components/table/paginationParams.ts";
import LeaderboardView from "@/leaderboard/LeaderboardView.tsx";
import {
	getCurrentUserLeaderboardEntry,
	getLeaderboardEntries,
} from "@/leaderboard/leaderboardData.ts";

export default async function LeaderboardPage({
	params,
	searchParams,
}: {
	params: Promise<{ page: string }>;
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
	const { page } = await params;
	const resolvedSearchParams = await searchParams;
	const parsedParams = parseParams(page, resolvedSearchParams);

	if (!parsedParams) {
		notFound();
	}

	const [leaderboardResponse, currentUserLeaderboardEntry] = await Promise.all([
		getLeaderboardEntries(parsedParams.pageNumber, parsedParams.pageSize),
		getCurrentUserLeaderboardEntry(),
	]);

	return (
		<div>
			<LeaderboardView
				leaderboardEntries={leaderboardResponse.entries}
				currentUserLeaderboardEntry={currentUserLeaderboardEntry}
				pageSize={parsedParams.pageSize}
				currentPage={parsedParams.pageNumber}
				totalEntriesCount={leaderboardResponse.totalEntriesCount}
			/>
		</div>
	);
}
