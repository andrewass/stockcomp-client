import {CircularProgress} from "@mui/material";
import {LeaderboardTable} from "../components/leaderboard/LeaderboardTable";
import {useQuery} from "react-query";
import ErrorComponent from "../components/common/ErrorComponent";
import {useApiWrapper} from "../config/apiWrapper";
import {
    GET_LEADERBOARD_USER_ENTRY,
    GET_SORTED_LEADERBOARD_ENTRIES, getLeaderboardEntryUserConfig,
    getSortedLeaderboardEntriesConfig
} from "./api/leaderboardApi";


export const Leaderboard = () => {

    const {apiGet} = useApiWrapper();

    const {isLoading: entriesLoading, error: entriesError, data: leaderboardEntries} =
        useQuery(GET_SORTED_LEADERBOARD_ENTRIES,
            () => apiGet(getSortedLeaderboardEntriesConfig()));

    const {isLoading: userEntryLoading, error: userEntryError, data: userEntryData} =
        useQuery(GET_LEADERBOARD_USER_ENTRY,
            () => apiGet(getLeaderboardEntryUserConfig()));


    if (entriesLoading || userEntryLoading) return <CircularProgress/>

    if (entriesError || userEntryError)
        return <ErrorComponent errorMessage={ entriesError ? entriesError as string : userEntryError as string } />

    return (
        <>
            <LeaderboardTable leaderboardEntries={leaderboardEntries}/>
        </>
    );
}