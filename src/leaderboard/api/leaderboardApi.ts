import {CONTEST_BASE_URL} from "../../config/properties";

export const GET_LEADERBOARD_USER_ENTRY = "getLeaderboardUserEntry";
export const GET_SORTED_LEADERBOARD_ENTRIES = "getSortedLeaderboardEntries";

export const getLeaderboardEntryUserConfig = (username?: string) => {
    return {
        method: "get",
        url: CONTEST_BASE_URL + "/leaderboard/user-entry",
        params: {username}
    }
}

export const getSortedLeaderboardEntriesConfig = (pageNumber: number, pageSize: number) => {
    return {
        method: "get",
        url: CONTEST_BASE_URL + "/leaderboard/sorted-entries",
        params: {
            pageNumber: pageNumber,
            pageSize: pageSize
        }
    }
}