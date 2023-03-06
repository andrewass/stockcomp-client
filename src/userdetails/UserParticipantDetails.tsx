import {Box, Card, CardContent, CircularProgress, Typography} from "@mui/material";
import {useParams} from "react-router-dom";
import {useQuery} from "react-query";
import {GET_LEADERBOARD_USER_ENTRY, getLeaderboardEntryUserConfig} from "../leaderboard/api/leaderboardApi";
import {useApiWrapper} from "../config/apiWrapper";
import {GET_PARTICIPANT_HISTORY, getParticipantHistoryConfig} from "../participant/api/participantApi";
import ErrorComponent from "../error/ErrorComponent";
import {ParticipantHistory} from "../participant/ParticipantHistory";


export const UserParticipantDetails = () => {
    const {username} = useParams<{ username: string }>()
    const {apiGet} = useApiWrapper();

    const {isLoading: historyLoading, error: historyError, data: historyData} =
        useQuery(GET_PARTICIPANT_HISTORY,
            () => apiGet(getParticipantHistoryConfig()));

    const {isLoading: entryLoading, error: entryError, data: entryData} =
        useQuery(GET_LEADERBOARD_USER_ENTRY,
            () => apiGet(getLeaderboardEntryUserConfig()));

    if (historyLoading || entryLoading) return <CircularProgress/>

    if (historyError || entryError)
        return <ErrorComponent errorMessage={historyError ? historyError as string : entryError as string}/>

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
            <ParticipantHistory historyList={historyData}/>
        </Box>
    )
}