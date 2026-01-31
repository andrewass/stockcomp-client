import type { LeaderboardEntry } from "@/leaderboard/leaderboardTypes.ts";
import { parseParams } from "@/util/PageableTableUtils.ts";
import { apiGet } from "../../../config/apiWrapper.ts";

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
	params: Promise<{ slug: string }>;
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
	const { slug } = await params;
	const resolvedSearchParams = await searchParams;
	const parsedParams = parseParams(slug, resolvedSearchParams);
	if (!parsedParams) {
		return <p>404: Page not found</p>;
	}

	const leaderboardEntries = await apiGet<LeaderboardEntry[]>(
		getSortedLeaderboardEntriesConfig(
			parsedParams.pageNumber,
			parsedParams.pageSize,
		),
	);

	return (
		<div>
			My Post: {slug} :
			{JSON.stringify(leaderboardEntries)}
		</div>
	);
}
