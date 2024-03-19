import {Box, CircularProgress, Typography} from "@mui/material";
import {Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {useQuery} from "@tanstack/react-query";
import {useApiWrapper} from "../config/useApiWrapper";
import ErrorComponent from "../error/ErrorComponent";
import {GET_PARTICIPANT_HISTORY, getParticipantHistoryConfig} from "./api/participantApi";
import {DetailedParticipant} from "./participantTypes";
import React from "react";


export const ParticipantHistory = ({username}: { username: string }) => {

    const {apiGet} = useApiWrapper();

    const {isLoading, error, data: participantEntries} = useQuery<DetailedParticipant[]>(
        [GET_PARTICIPANT_HISTORY, username],
        () => apiGet(getParticipantHistoryConfig(username))
    );

    if (isLoading) return <CircularProgress/>

    if (error) return <ErrorComponent errorMessage={error as string}/>

    if (participantEntries && participantEntries.length > 0) {
        const participants = participantEntries.map(detailedEntry => detailedEntry.participant);
        return (
            <Box id="participantHistory" sx={{marginTop: "10%", marginLeft: "10%", width: "80%"}}>
                <Typography variant="h5" align="center" marginBottom="3rem">Participant History</Typography>
                <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={participants}>
                        <XAxis dataKey="startTime"/>
                        <YAxis/>
                        <Area dataKey="totalValue" stroke="#82ca9d" fill="#82ca9d"/>
                        <Tooltip/>
                    </AreaChart>
                </ResponsiveContainer>
            </Box>
        );
    } else {
        return <React.Fragment/>
    }


}