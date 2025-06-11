import {Box, CircularProgress, Stack} from "@mui/material";
import {useQuery} from "@tanstack/react-query";
import ErrorComponent from "../../error/ErrorComponent";
import ContestLeftPart from "./leftpart/ContestLeftPart";
import ContestRightPart from "./rightpart/ContestRightPart";
import { useApiWrapper } from "../../config/useApiWrapper";
import {Contest} from "../../domain/contests/contestTypes";
import {GET_CONTEST_BY_NUMBER, getContestConfig} from "../../domain/contests/contestApi";
import { DetailedParticipant } from "../../domain/participant/participantTypes";
import {GET_PARTICIPANT_CONTEST, getDetailedParticipantForContestConfig} from "../../domain/participant/participantApi";

interface Props{
    contestId: number
}

export default function ContestPage({contestId}: Props) {
    const {apiGet} = useApiWrapper();

    const {
        isPending: isContestPending,
        isError: isContestError,
        error: contestError,
        data: contest
    } = useQuery<Contest>({
        queryKey: [GET_CONTEST_BY_NUMBER, contestId],
        queryFn: () => apiGet(getContestConfig(Number(contestId))),
    });

    const {
        isPending: isParticipantPending,
        isError: isParticipantError,
        error: participantError,
        data: participant
    } = useQuery<DetailedParticipant | null>({
        queryKey: [GET_PARTICIPANT_CONTEST, contestId],
        queryFn: () => apiGet(getDetailedParticipantForContestConfig(Number(contestId))),
    });

    if (isContestPending || isParticipantPending) return <CircularProgress/>;

    if (isContestError || isParticipantError) {
        return <ErrorComponent error={contestError ?? participantError}/>;
    }
    
    return (
        <Box sx={{paddingTop: "100px", backgroundColor: "purple"}}>
            <Stack direction="row">
                <ContestLeftPart contest={contest}/>
                {participant &&
                    <ContestRightPart participant={participant}/>
                }
            </Stack>
        </Box>
    );
}
