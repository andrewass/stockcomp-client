import React, {useEffect, useState} from "react";
import {Box, Card, CardContent, CircularProgress, Typography} from "@mui/material";
import {useLocation} from "react-router-dom";
import Flags from "country-flag-icons/react/3x2";
import {getParticipantHistory} from "../../service/contestService";
import {getLeaderboardUserEntry} from "../../service/leaderboardService";
import ParticipantHistory from "./ParticipantHistory";

const UserAccountRead = () => {

    const data = useLocation();
    const user = data.state.user;
    const EntryFlag = Flags[user.country];
    const [historyList, setHistoryList] = useState([]);
    const [leaderboardEntry, setLeaderboardEntry] = useState();
    const [isLoadingHistory, setIsLoadingHistory] = useState(true);
    const [isLoadingUserEntry, setIsLoadingUserEntry] = useState(true);

    const fetchParticipantHistory = async () => {
        const response = await getParticipantHistory(user.username);
        setHistoryList(response.data);
        setIsLoadingHistory(false);
    }

    const fetchLeaderboardEntry = async () => {
        const response = await getLeaderboardUserEntry(user.username);
        setLeaderboardEntry(response.data);
        setIsLoadingUserEntry(false);
    }

    useEffect(() => {
        fetchParticipantHistory().catch(error => console.log(error));
        fetchLeaderboardEntry().catch(error => console.log(error));
    }, [])

    if(isLoadingUserEntry || isLoadingHistory){
        return <CircularProgress/>
    }
    return (
        <Box>
            <Card elevation={0} sx={{marginTop: "10%", marginLeft: "30%"}}>
                <CardContent>
                    <Box display="flex">
                        <Typography variant="h5">{user.username}</Typography>
                        <EntryFlag style={{width: "2rem", marginLeft: "1rem"}}/>
                    </Box>
                    <Typography>Medals n/a</Typography>
                    <Typography>Leaderboard rank : {leaderboardEntry.ranking}</Typography>
                    <Typography>Contest participation : {leaderboardEntry.contestCount}</Typography>
                </CardContent>
            </Card>
            <ParticipantHistory historyList={historyList}/>
        </Box>
    );

}

export default UserAccountRead;