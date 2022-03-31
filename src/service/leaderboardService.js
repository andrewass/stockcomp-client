import axios from "axios";
import {GRAPHQL_CONTEST_URL} from "../config/serviceConfig";


const leaderboardEntryQuery = () => ({
    "query": `query leaderboardEntry {
        leaderboardEntry {
            ranking
            score
            username
            country
        }
    }`
});

const getLeaderboardEntry = async () => {
    const response = await axios({
        method: "post",
        url: GRAPHQL_CONTEST_URL+"?op=getLeaderboardEntry",
        data: leaderboardEntryQuery()
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
        url: GRAPHQL_CONTEST_URL+"?op=getSortedLeaderboardEntries",
        data: sortedLeaderBoardQuery
    });
    return response.data.data;
}

export {getLeaderboardEntry, getSortedLeaderboardEntries}