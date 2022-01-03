import axios from "axios";
import {BASE_URL} from "./serviceConfig";


const URL = {
    leaderboard_entries: BASE_URL + "/leaderboard/entries",
    leaderboard_user_entry: BASE_URL + "/leaderboard/user-entry"
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