import React from "react";
import {Box, Card, CardContent, CircularProgress, Typography} from "@mui/material";
import {useLocation} from "react-router-dom";
import Flags from "country-flag-icons/react/3x2";
import {getParticipantHistory} from "../../service/contestService";
import {getLeaderboardUserEntry} from "../../service/leaderboardService";
import ParticipantHistory from "./ParticipantHistory";
import {useQuery} from "react-query";


const fetchParticipantHistory = async (key, username) => {
    const response = await getParticipantHistory(username);
    return response.data;
}

const fetchLeaderboardEntry = async (username) => {
    const response = await getLeaderboardUserEntry(username);
    return response.data;
}

const UserAccountRead = () => {

    const location = useLocation();
    const user = location.state.user;
    const EntryFlag = Flags[user.country];

    const {isLoading: historyLoading, error: historyError, data: historyData} =
        useQuery(["participantHistory", user.username], () => fetchParticipantHistory(user.username));

    const {isLoading: entryLoading, error: entryError, data: entryData} =
        useQuery(["leaderboardEntry", user.username], () => fetchLeaderboardEntry(user.username));

    if (historyLoading || entryLoading) return <CircularProgress/>;

    if (historyError || entryError) return `Error! ${historyError ? historyError : entryError}`;

    return (
        <Box>
            <Card elevation={0} sx={{marginTop: "10%", marginLeft: "30%"}}>
                <CardContent>
                    <Box display="flex">
                        <Typography variant="h5">{user.username}</Typography>
                        {EntryFlag ? <EntryFlag style={{width: "2rem", marginLeft: "1rem"}}/> : <React.Fragment/>}
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

export default UserAccountRead;