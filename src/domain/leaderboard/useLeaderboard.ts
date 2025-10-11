import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { apiGet } from "../../config/apiWrapper";
import {
	GET_SORTED_LEADERBOARD_ENTRIES,
	getSortedLeaderboardEntriesConfig,
} from "./leaderboardApi";
import type { LeaderboardEntry } from "./leaderboardTypes";

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
