import { apiGet } from "@/api/apiWrapper.ts";
import LeaderboardTable from "@/leaderboard/LeaderboardTable.tsx";
import type { LeaderboardEntryPage } from "@/leaderboard/leaderboardTypes.ts";
import { parseParams } from "@/util/PageableTableUtils.ts";

function getSortedLeaderboardEntriesConfig(
	pageNumber: number,
	pageSize: number,
) {
	return {
		method: "get",
		url: `/leaderboard/sorted`,
		params: { pageNumber, pageSize },
	};
}

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

	const leaderboardResponse = await apiGet<LeaderboardEntryPage>(
		getSortedLeaderboardEntriesConfig(
			parsedParams.pageNumber,
			parsedParams.pageSize,
		),
	);

	return (
		<div>
			<LeaderboardTable
				leaderboardEntries={leaderboardResponse.entries}
				pageSize={parsedParams.pageSize}
				currentPage={parsedParams.pageNumber}
				totalEntriesCount={leaderboardResponse.totalEntriesCount}
			/>
		</div>
	);
}
