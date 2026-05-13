import { parseParams } from "@/components/table/PageableTable.tsx";
import LeaderboardView from "@/leaderboard/LeaderboardView.tsx";
import { getLeaderboardEntries } from "@/leaderboard/leaderboardData.ts";

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
		return <p>404: Page not found</p>;
	}

	const leaderboardResponse = await getLeaderboardEntries(
		parsedParams.pageNumber,
		parsedParams.pageSize,
	);

	return (
		<div>
			<LeaderboardView
				leaderboardEntries={leaderboardResponse.entries}
				pageSize={parsedParams.pageSize}
				currentPage={parsedParams.pageNumber}
				totalEntriesCount={leaderboardResponse.totalEntriesCount}
			/>
		</div>
	);
}
