import {Box, Card, CardContent, CircularProgress, Typography} from "@mui/material";
import {useParams} from "react-router-dom";
import {getParticipantHistory} from "../api/contestClient";
import {getLeaderboardEntry} from "../api/leaderboardClient";
import ParticipantHistory from "../components/participant/ParticipantHistory";
import {useQuery} from "react-query";
import ErrorComponent from "../components/common/ErrorComponent";


const UserDetails = () => {

    const {username} = useParams<{username: string}>()

    const fetchParticipantHistory = () => {
        return getParticipantHistory(username!)
    }

    const fetchLeaderboardEntry = () => {
        return getLeaderboardEntry(username)
    }

    const {isLoading: historyLoading, error: historyError, data: historyData} =
        useQuery(["participantHistory", username], fetchParticipantHistory)

    const {isLoading: entryLoading, error: entryError, data: entryData} =
        useQuery(["leaderboardEntry", username], fetchLeaderboardEntry)

    if (historyLoading || entryLoading) return <CircularProgress/>

    if (historyError || entryError)
        return <ErrorComponent errorMessage={historyError ? historyError as string : entryError as string} />

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

export default UserDetails