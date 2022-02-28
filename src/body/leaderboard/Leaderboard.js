import {
    getLeaderboardUserEntry,
    useGetSortedLeaderboardEntries
} from "../../service/leaderboardService";
import {CircularProgress} from "@mui/material";
import {LeaderboardTable} from "./LeaderboardTable";
import {useQuery} from "react-query";


export const Leaderboard = () => {

    const fetchUserLeaderboardEntry = async () => {
        const response = await getLeaderboardUserEntry();
        return response.data;
    }

    const {isLoading: entriesLoading, error: entriesError, data: entriesData} = useGetSortedLeaderboardEntries();

    const {isLoading: userEntryLoading, error: userEntryError, data: userEntryData} =
        useQuery("getUserLeaderboardEntry", fetchUserLeaderboardEntry);

    if (entriesLoading || userEntryLoading) return <CircularProgress/>

    if (entriesError || userEntryError) return `Error! ${entriesError ? entriesError : userEntryError}`;

    return (
        <>
            <LeaderboardTable leaderboardEntries={entriesData.sortedLeaderboardEntries}/>
        </>
    );
}