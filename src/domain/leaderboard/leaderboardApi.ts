import { CLIENT_BACKEND_BASE_PATH } from "../../config/properties";

export const GET_LEADERBOARD_USER_ENTRY = "getLeaderboardUserEntry";
export const GET_SORTED_LEADERBOARD_ENTRIES = "getSortedLeaderboardEntries";

export const getLeaderboardEntryUserConfig = (username: string) => {
	return {
		method: "get",
		url: CLIENT_BACKEND_BASE_PATH + "/leaderboard/user-entry",
		params: { username },
	};
};

export const getSortedLeaderboardEntriesConfig = (
	pageNumber: number,
	pageSize: number,
) => {
	return {
		method: "get",
		url: CLIENT_BACKEND_BASE_PATH + "/leaderboard/sorted",
		params: { pageNumber, pageSize },
	};
};
