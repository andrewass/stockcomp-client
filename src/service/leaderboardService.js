import axios from "axios";
import {GRAPHQL_CONTEST_URL} from "../config/serviceConfig";


const leaderboardEntryQuery = username => ({
    "query": `query investments($username: String) {
        investments(username: $username){
            ranking
            score
            username
            country
        }
    }`,
    "variables": {username}
});

const getLeaderboardEntry = async username => {
    const response = await axios({
        method: "post",
        url: GRAPHQL_CONTEST_URL,
        data: leaderboardEntryQuery(username)
    });
    return response.data.data;
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

const getSortedLeaderboardEntries = async () => {
    const response = await axios({
        method: "post",
        url: GRAPHQL_CONTEST_URL,
        data: sortedLeaderBoardQuery
    });
    return response.data.data;
}

export {getLeaderboardEntry, getSortedLeaderboardEntries}