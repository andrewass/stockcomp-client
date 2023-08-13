import {Box, Card, CardContent, CircularProgress, Typography} from "@mui/material";
import {useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {GET_LEADERBOARD_USER_ENTRY, getLeaderboardEntryUserConfig} from "../leaderboard/api/leaderboardApi";
import {useApiWrapper} from "../config/useApiWrapper";
import ErrorComponent from "../error/ErrorComponent";
import {ParticipantHistory} from "../participant/ParticipantHistory";


export const UserLeaderboardDetails = () => {
    const {username} = useParams<{ username: string }>()
    const {apiGet} = useApiWrapper();

    const {isLoading, error, data: entryData} = useQuery(
        [GET_LEADERBOARD_USER_ENTRY, username],
        () => apiGet(getLeaderboardEntryUserConfig(username))
    );

    if (isLoading) return <CircularProgress/>

    if (error) return <ErrorComponent errorMessage={error as string}/>

    return (
        <Box>
            <Card elevation={0} sx={{marginTop: "10%", marginLeft: "30%"}}>
                <CardContent>
                    <Box display="flex">
                        <Typography variant="h5">{username}</Typography>
                    </Box>
                    <Typography>Medals n/a</Typography>
                    <Typography>Leaderboard rank : {entryData.ranking}</Typography>
                    <Typography>Contest participation : {entryData.contestCount}</Typography>
                </CardContent>
            </Card>
            <ParticipantHistory username={username!}/>
        </Box>
    )
}