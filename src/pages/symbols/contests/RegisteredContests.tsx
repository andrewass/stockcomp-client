import { CircularProgress, Stack } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useApiWrapper } from "../../../config/useApiWrapper";
import {
	GET_ALL_REGISTERED_CONTESTS,
	getRegisteredContestsConfig,
} from "../../../domain/participant/participantApi";
import type { ContestParticipant } from "../../../domain/participant/participantTypes";
import ErrorComponent from "../../../error/ErrorComponent";
import RegisteredContest from "./RegisteredContest";

export default function RegisteredContests() {
	const { apiGet } = useApiWrapper();

	const {
		isError,
		isPending,
		error,
		data: contests,
	} = useQuery<ContestParticipant[]>({
		queryKey: [GET_ALL_REGISTERED_CONTESTS],
		queryFn: () => apiGet(getRegisteredContestsConfig()),
	});

	if (isError) return <ErrorComponent error={error} />;

	if (isPending) return <CircularProgress />;

	if (contests.length === 0) return null;

	return (
		<Stack gap={3}>
			{contests.map((contestParticipant) => (
				<RegisteredContest
					contest={contestParticipant.contest}
					key={contestParticipant.contest.contestId}
				/>
			))}
		</Stack>
	);
}
