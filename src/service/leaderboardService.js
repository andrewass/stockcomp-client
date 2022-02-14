import axios from "axios";
import {CONTEST_BASE_URL} from "../config/ServiceConfig";


const URL = {
    leaderboard_entries: CONTEST_BASE_URL + "/leaderboard/entries",
    leaderboard_user_entry: CONTEST_BASE_URL + "/leaderboard/user-entry"
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