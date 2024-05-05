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

    const {isPending, isError, error, data} = useQuery<DetailedParticipant[]>({
        queryKey: [GET_PARTICIPANT_HISTORY, username],
        queryFn: () => apiGet(getParticipantHistoryConfig(username)),
    });

    if (isPending) return <CircularProgress/>

    if (isError) return <ErrorComponent errorMessage={error.message}/>

    if (data.length > 0) {
        const participants = data.map(detailedEntry => detailedEntry.participant);
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
        return <React.Fragment/>;
    }
}