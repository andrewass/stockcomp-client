import axios from "axios";
import {CONTEST_BASE_URL, graphqlClientContest} from "../config/serviceConfig";
import {useQuery} from "react-query";
import {gql} from "graphql-request";


const URL = {
    leaderboard_entries: CONTEST_BASE_URL + "/leaderboard/entries",
    leaderboard_user_entry: CONTEST_BASE_URL + "/leaderboard/user-entry"
}
const useGetSortedLeaderboardEntries = () => {
    return useQuery("getSortedLeaderboardEntries", async () => {
        return await graphqlClientContest.request(
            gql`
                query GetSortedLeaderboardEntries {
                    sortedLeaderboardEntries{
                        ranking
                        score
                        username
                        country
                    }
                }
            `);
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

export {useGetSortedLeaderboardEntries, getLeaderboardUserEntry}