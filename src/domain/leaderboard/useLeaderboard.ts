import { useApiWrapper } from "../../config/useApiWrapper";
import { LeaderboardEntry } from "./leaderboardTypes";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
  GET_SORTED_LEADERBOARD_ENTRIES,
  getSortedLeaderboardEntriesConfig,
} from "./leaderboardApi";

interface LeaderboardResponse {
  leaderboardEntries: LeaderboardEntry[];
  totalEntriesCount: number;
}

export function useGetPageableLeaderboardEntries(
  pageNumber: number,
  pageSize: number,
) {
  const { apiGet } = useApiWrapper();

  return useQuery<LeaderboardResponse>({
    queryKey: [GET_SORTED_LEADERBOARD_ENTRIES, pageNumber],
    queryFn: () =>
      apiGet(getSortedLeaderboardEntriesConfig(pageNumber, pageSize)),
    placeholderData: keepPreviousData,
  });
}
