import {Box, Typography} from "@mui/material";
import {Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {Participant} from "../types/participant";

interface Props{
    historyList: Participant[]
}

export const ParticipantHistory = ({historyList}: Props) => {

    return (
        <Box id="participantHistory" sx={{marginTop: "10%", marginLeft:"10%", width: "80%"}}>
            <Typography variant="h5" align="center" marginBottom="3rem">Participant History</Typography>
            <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={historyList}>
                    <XAxis dataKey="startTime"/>
                    <YAxis/>
                    <Area dataKey="totalValue" stroke="#82ca9d" fill="#82ca9d"/>
                    <Tooltip/>
                </AreaChart>
            </ResponsiveContainer>
        </Box>
    );
}