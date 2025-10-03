import { CircularProgress, Stack } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useApiWrapper } from "../../../config/useApiWrapper";
import type { Contest } from "../../../domain/contests/contestTypes";
import {
	GET_ALL_UNREGISTERED_CONTESTS,
	getUnregisteredContestsConfig,
} from "../../../domain/participant/participantApi";
import ErrorComponent from "../../../error/ErrorComponent";
import UnregisteredContest from "./UnregisteredContest";

const UnregisteredContests = () => {
	const { apiGet } = useApiWrapper();

	const {
		isPending,
		isError,
		error,
		data: contests,
	} = useQuery<Contest[]>({
		queryKey: [GET_ALL_UNREGISTERED_CONTESTS],
		queryFn: () => apiGet(getUnregisteredContestsConfig()),
	});

	if (isError) return <ErrorComponent error={error} />;

	if (isPending) return <CircularProgress />;

	if (contests.length === 0) return null;

	return (
		<Stack spacing={3} sx={{ mt: 3 }}>
			{contests.map((contest) => (
				<UnregisteredContest contest={contest} key={contest.contestId} />
			))}
		</Stack>
	);
};

export default UnregisteredContests;
