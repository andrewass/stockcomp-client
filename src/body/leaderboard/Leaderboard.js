import {getLeaderboardEntry, getSortedLeaderboardEntries} from "./client/leaderboardClient";
import {CircularProgress} from "@mui/material";
import {LeaderboardTable} from "./LeaderboardTable";
import {useQuery} from "react-query";


export const Leaderboard = () => {

    const fetchUserLeaderboardEntry = () => {
        return getLeaderboardEntry();
    }

    const fetchSortedLeaderboardEntries = () => {
        return getSortedLeaderboardEntries();
    }

    const {isLoading: entriesLoading, error: entriesError, data: leaderboardEntries} =
        useQuery("getSortedLeaderboardEntries", fetchSortedLeaderboardEntries);

    const {isLoading: userEntryLoading, error: userEntryError, data: userEntryData} =
        useQuery("getUserLeaderboardEntry", fetchUserLeaderboardEntry);

    if (entriesLoading || userEntryLoading) return <CircularProgress/>

    if (entriesError || userEntryError) return `Error! ${entriesError ? entriesError : userEntryError}`;

    return (
        <>
            <LeaderboardTable leaderboardEntries={leaderboardEntries}/>
        </>
    );
}