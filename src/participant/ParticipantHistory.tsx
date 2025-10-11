import { Box, CircularProgress, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React, { useId } from "react";
import {
	Area,
	AreaChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import { apiGet } from "../config/apiWrapper";
import {
	GET_PARTICIPANT_HISTORY,
	getParticipantHistoryConfig,
} from "../domain/participant/participantApi";
import type { DetailedParticipant } from "../domain/participant/participantTypes";
import ErrorComponent from "../error/ErrorComponent";

export const ParticipantHistory = ({ username }: { username: string }) => {
	const uniqueId = useId();

	const { isPending, isError, error, data } = useQuery<DetailedParticipant[]>({
		queryKey: [GET_PARTICIPANT_HISTORY, username],
		queryFn: () => apiGet(getParticipantHistoryConfig(username)),
	});

	if (isPending) return <CircularProgress />;

	if (isError) return <ErrorComponent error={error} />;

	if (data.length > 0) {
		const participants = data.map((detailedEntry) => detailedEntry.participant);
		return (
			<Box
				id={uniqueId}
				sx={{ marginTop: "10%", marginLeft: "10%", width: "80%" }}
			>
				<Typography variant="h5" align="center" marginBottom="3rem">
					Participant History
				</Typography>
				<ResponsiveContainer width="100%" height={300}>
					<AreaChart data={participants}>
						<XAxis dataKey="startTime" />
						<YAxis />
						<Area dataKey="totalValue" stroke="#82ca9d" fill="#82ca9d" />
						<Tooltip />
					</AreaChart>
				</ResponsiveContainer>
			</Box>
		);
	} else {
		return <React.Fragment />;
	}
};
