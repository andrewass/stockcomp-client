import axios from "axios";

const baseUrl = process.env.REACT_APP_STOCK_CONTEST_BASE_URL;

const URL = {
    leaderboard_entries: baseUrl + "/leaderboard/entries",
    leaderboard_user_entry: baseUrl + "/leaderboard/user-entry"
}

const getAllLeaderboardEntries = () => {
    return axios({
        method: "get",
        url: URL.leaderboard_entries,
        withCredentials: true
    });
}

const getLeaderboardUserEntry = (username) => {
    return axios({
        method: "get",
        url: URL.leaderboard_user_entry,
        params: {username},
        withCredentials: true
    });
}

export {
    getAllLeaderboardEntries, getLeaderboardUserEntry
}