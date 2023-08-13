import {CircularProgress} from "@mui/material";
import {useQuery} from "@tanstack/react-query";
import {useApiWrapper} from "../config/useApiWrapper";
import ErrorComponent from "../error/ErrorComponent";
import {GET_LEADERBOARD_USER_ENTRY, getLeaderboardEntryUserConfig} from "./api/leaderboardApi";
import {LeaderboardTable} from "./LeaderboardTable";


export const Leaderboard = () => {

    const {apiGet} = useApiWrapper();

    const {isLoading, error, data} = useQuery(
        [GET_LEADERBOARD_USER_ENTRY],
        () => apiGet(getLeaderboardEntryUserConfig())
    );

    if (isLoading) return <CircularProgress/>

    if (error)
        return <ErrorComponent errorMessage={error as string}/>

    return (
        <>
            <LeaderboardTable/>
        </>
    );
}