import axios from "axios";
import {CONTEST_BASE_URL, GRAPHQL_CONTEST_URL} from "../config/serviceConfig";


const URL = {
    leaderboard_user_entry: CONTEST_BASE_URL + "/leaderboard/user-entry"
}

const getLeaderboardUserEntry = (username) => {
    return axios({
        method: "get",
        url: URL.leaderboard_user_entry,
        params: {username},
        withCredentials: true
    });
}

const sortedLeaderBoardQuery = {
    "query": `query GetSortedLeaderboardEntries {
        sortedLeaderboardEntries{
            ranking
            score
            username
            country
        }
    }`
}

const getSortedLeaderboardEntries = () => {
    return axios({
        method: "post",
        url: GRAPHQL_CONTEST_URL,
        data: sortedLeaderBoardQuery
    });
}

export {getLeaderboardUserEntry, getSortedLeaderboardEntries}