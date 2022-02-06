import {getAllLeaderboardEntries, getLeaderboardUserEntry} from "../../service/leaderboardService";
import {CircularProgress} from "@mui/material";
import {LeaderboardTable} from "./LeaderboardTable";
import {useQuery} from "react-query";


export const Leaderboard = () => {

    const fetchAllLeaderboardEntries = async () => {
        const response = await getAllLeaderboardEntries();
        return response.data;
    }

    const fetchUserLeaderboardEntry = async () => {
        const response = await getLeaderboardUserEntry();
        return response.data;
    }

    const {isLoading: allEntriesLoading, error: allEntriesErrror, data: allEntriesData} =
        useQuery("getAllLeaderboardEntries", fetchAllLeaderboardEntries);

    const {isLoading: userEntryLoading, error: userEntryError, data: userEntryData} =
        useQuery("getUserLeaderboardEntry", fetchUserLeaderboardEntry);

    if (allEntriesLoading || userEntryLoading) return <CircularProgress/>

    if (allEntriesErrror || userEntryError) return `Error! ${allEntriesErrror ? allEntriesErrror : userEntryError}`;

    return (
        <>
            <LeaderboardTable leaderboardEntries={allEntriesData}/>
        </>
    );
}