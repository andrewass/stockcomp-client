import {Box, CircularProgress} from "@mui/material";
import {Contest} from "../../contests/contestTypes";
import {useApiWrapper} from "../../config/useApiWrapper";
import {useQuery} from "@tanstack/react-query";
import {ActiveContestList} from "../../contests/ActiveContestList";
import {GET_ACTIVE_CONTESTS, getActiveContestsConfig} from "../../contests/api/contestApi";
import ErrorComponent from "../../error/ErrorComponent";


export const TrendingSymbolsRightMenu = () => {

    const {apiGet} = useApiWrapper();

    const {isLoading, error, data} = useQuery(
        [GET_ACTIVE_CONTESTS],
        () => apiGet(getActiveContestsConfig())
    );

    if (error) return <ErrorComponent errorMessage={error as string}/>

    if (isLoading) return <CircularProgress/>

    if (data) {
        const contests = data.map((contest: Contest) => new Contest(contest));
        return (
            <Box minWidth="300px">
                <ActiveContestList contests={contests}/>
            </Box>
        );
    } else {
        return (
            <>
                <p>No Contests found</p>
            </>
        );
    }
}