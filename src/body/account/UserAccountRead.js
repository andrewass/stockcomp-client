import React, {useState} from "react";
import {Box, Card, CardContent, Typography} from "@mui/material";
import {useLocation} from "react-router-dom";
import Flags from "country-flag-icons/react/3x2";

const UserAccountRead = () => {

    const data = useLocation();
    const user = data.state.user;
    const EntryFlag = Flags[user.country];
    const [participantHistory, setParticipantHistory] = useState([]);

    const getParticipantHistory = async () => {
        const response = await getParticipantHistory(user.username);
        setParticipantHistory(response.data);
    }


    return (
        <Box>
            <Card elevation={0} sx={{marginTop:"10%", marginLeft:"30%"}}>
                <CardContent>
                    <Box display="flex">
                        <Typography variant="h5">{user.username}</Typography>
                        <EntryFlag style={{width: "2rem", marginLeft:"1rem"}}/>
                    </Box>
                    <Typography>Leaderboard rank : {user.rank}</Typography>
                </CardContent>
            </Card>
        </Box>
    );

}

export default UserAccountRead;