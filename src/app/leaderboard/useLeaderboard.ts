import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { apiGet } from "../../config/apiWrapper";
import type { LeaderboardEntry } from "./leaderboardTypes";

const GET_SORTED_LEADERBOARD_ENTRIES = "getSortedLeaderboardEntries";

interface LeaderboardResponse {
	leaderboardEntries: LeaderboardEntry[];
	totalEntriesCount: number;
}

export function useGetPageableLeaderboardEntries(
	pageNumber: number,
	pageSize: number,
) {
	return useQuery<LeaderboardResponse>({
		queryKey: [GET_SORTED_LEADERBOARD_ENTRIES, pageNumber],
		queryFn: () =>
			apiGet(getSortedLeaderboardEntriesConfig(pageNumber, pageSize)),
		placeholderData: keepPreviousData,
	});
}

const getSortedLeaderboardEntriesConfig = (
	pageNumber: number,
	pageSize: number,
) => {
	return {
		method: "get",
		url: `/api/proxy/leaderboard/sorted`,
		params: { pageNumber, pageSize },
	};
};
