import {getLeaderboardEntry, getSortedLeaderboardEntries} from "../api/leaderboardClient";
import {CircularProgress} from "@mui/material";
import {LeaderboardTable} from "../components/leaderboard/LeaderboardTable";
import {useQuery} from "react-query";
import ErrorComponent from "../components/common/ErrorComponent";


const Leaderboard = () => {

    const fetchUserLeaderboardEntry = () => {
        return getLeaderboardEntry()
    }

    const fetchSortedLeaderboardEntries = () => {
        return getSortedLeaderboardEntries()
    }

    const {isLoading: entriesLoading, error: entriesError, data: leaderboardEntries} =
        useQuery("getSortedLeaderboardEntries", fetchSortedLeaderboardEntries)

    const {isLoading: userEntryLoading, error: userEntryError, data: userEntryData} =
        useQuery("getUserLeaderboardEntry", fetchUserLeaderboardEntry)

    if (entriesLoading || userEntryLoading) return <CircularProgress/>

    if (entriesError || userEntryError)
        return <ErrorComponent errorMessage={ entriesError ? entriesError as string : userEntryError as string } />

    return (
        <>
            <LeaderboardTable leaderboardEntries={leaderboardEntries}/>
        </>
    )
}

export default Leaderboard