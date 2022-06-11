import {Box, Card, CardContent, CircularProgress, Typography} from "@mui/material";
import {useParams} from "react-router-dom";
import {getParticipantHistory} from "../../api/contestClient";
import {getLeaderboardEntry} from "../../api/leaderboardClient";
import ParticipantHistory from "./ParticipantHistory";
import {useQuery} from "react-query";


export const UserDetails = () => {

    const {username} = useParams();

    const fetchParticipantHistory = async () => {
        const response = await getParticipantHistory(username);
        return response.data;
    }

    const fetchLeaderboardEntry = async () => {
        return getLeaderboardEntry(username);
    }

    const {isLoading: historyLoading, error: historyError, data: historyData} =
        useQuery(["participantHistory", username], fetchParticipantHistory);

    const {isLoading: entryLoading, error: entryError, data: entryData} =
        useQuery(["leaderboardEntry", username], fetchLeaderboardEntry);

    if (historyLoading || entryLoading) return <CircularProgress/>;

    if (historyError || entryError) return `Error! ${historyError ? historyError : entryError}`;

    //TODO: Fix Flags[user.country];
    const EntryFlag = null;

    return (
        <Box>
            <Card elevation={0} sx={{marginTop: "10%", marginLeft: "30%"}}>
                <CardContent>
                    <Box display="flex">
                        <Typography variant="h5">{username}</Typography>
                        {EntryFlag ? <EntryFlag style={{width: "2rem", marginLeft: "1rem"}}/> : null}
                    </Box>
                    <Typography>Medals n/a</Typography>
                    <Typography>Leaderboard rank : {entryData.ranking}</Typography>
                    <Typography>Contest participation : {entryData.contestCount}</Typography>
                </CardContent>
            </Card>
            <ParticipantHistory historyList={historyData}/>
        </Box>
    );
}