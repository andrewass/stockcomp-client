import { CircularProgress, Stack } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useApiWrapper } from "../../config/useApiWrapper";
import {
	GET_CONTEST_BY_NUMBER,
	getContestConfig,
} from "../../domain/contests/contestApi";
import type { Contest } from "../../domain/contests/contestTypes";
import {
	GET_PARTICIPANT_CONTEST,
	getDetailedParticipantForContestConfig,
} from "../../domain/participant/participantApi";
import type { DetailedParticipant } from "../../domain/participant/participantTypes";
import ErrorComponent from "../../error/ErrorComponent";
import ContestDetails from "./details/ContestDetails";
import ContestParticipant from "./participant/ContestParticipant";

interface Props {
	contestId: number;
}

export default function ContestPage({ contestId }: Props) {
	const { apiGet } = useApiWrapper();

	const {
		isPending: isContestPending,
		isError: isContestError,
		error: contestError,
		data: contest,
	} = useQuery<Contest>({
		queryKey: [GET_CONTEST_BY_NUMBER, contestId],
		queryFn: () => apiGet(getContestConfig(Number(contestId))),
	});

	const {
		isPending: isParticipantPending,
		isError: isParticipantError,
		error: participantError,
		data: participant,
	} = useQuery<DetailedParticipant | null>({
		queryKey: [GET_PARTICIPANT_CONTEST, contestId],
		queryFn: () =>
			apiGet(getDetailedParticipantForContestConfig(Number(contestId))),
	});

	if (isContestPending || isParticipantPending) return <CircularProgress />;

	if (isContestError || isParticipantError) {
		return <ErrorComponent error={contestError ?? participantError} />;
	}

	return (
		<Stack direction="row" gap={10} sx={{ paddingTop: "100px" }}>
			<ContestDetails contest={contest} />
			{participant && <ContestParticipant participant={participant} />}
		</Stack>
	);
}
