import type { LeaderboardEntry } from "@/leaderboard/leaderboardTypes.ts";
import { apiGet } from "../../../config/apiWrapper.ts";

function getSortedLeaderboardEntriesConfig(
	pageNumber: number,
	pageSize: number,
) {
	return {
		method: "get",
		url: `/api/proxy/leaderboard/sorted`,
		params: { pageNumber, pageSize },
	};
}

function parseParams(
	pageNumber: string,
	searchParams: { [key: string]: string | string[] | undefined },
): { pageNumber: number; pageSize: number } | null {
	const parsedPageNumber = parseInt(pageNumber, 10);
	const parsedPageSize = searchParams.pageSize
		? parseInt(String(searchParams.pageSize), 10)
		: 10;

	if (isNaN(parsedPageNumber) || isNaN(parsedPageSize)) {
		return null;
	}
	return { pageNumber: parsedPageNumber, pageSize: parsedPageSize };
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

	const leaderboardEntries = apiGet<LeaderboardEntry[]>(
		getSortedLeaderboardEntriesConfig(
			parsedParams.pageNumber,
			parsedParams.pageSize,
		),
	);

	return <div>My Post: {slug}</div>;
}
