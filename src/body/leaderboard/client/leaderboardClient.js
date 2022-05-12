import axios from "axios";
import {CONTEST_BASE_URL} from "../../../config/serviceConfig";

const URL = {
    user_entry: CONTEST_BASE_URL + "/leaderboard/user-entry",
    sorted_entries: CONTEST_BASE_URL + "/leaderboard/sorted-entries"
}

const getLeaderboardEntry = async (username) => {
    const response = await axios({
        method: "get",
        url: URL.user_entry,
        params: {username},
    });
    return response.data;
}

const getSortedLeaderboardEntries = async () => {
    const response = await axios({
        method: "get",
        url: URL.sorted_entries
    });
    return response.data;
}

export {getLeaderboardEntry, getSortedLeaderboardEntries}