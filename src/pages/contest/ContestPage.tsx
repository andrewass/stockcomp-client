import {Box, CircularProgress, Stack} from "@mui/material";
import {useParams} from "react-router";
import {useApiWrapper} from "@/config/useApiWrapper";
import {useQuery} from "@tanstack/react-query";
import type {Contest} from "@/domain/contests/contestTypes";
import {GET_CONTEST_BY_NUMBER, getContestConfig} from "@/domain/contests/contestApi";
import ErrorComponent from "../../error/ErrorComponent";
import ContestLeftPart from "./leftpart/ContestLeftPart";
import ContestRightPart from "./rightpart/ContestRightPart";
import type {DetailedParticipant} from "@/domain/participant/participantTypes";
import {GET_PARTICIPANT_CONTEST, getDetailedParticipantForContestConfig} from "@/domain/participant/participantApi";

export default function ContestPage() {
    const {contestId} = useParams<{ contestId: string }>();
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
    } = useQuery<DetailedParticipant>({
        queryKey: [GET_PARTICIPANT_CONTEST, contestId],
        queryFn: () => apiGet(getDetailedParticipantForContestConfig(Number(contestId))),
    });

    if (isContestPending || isParticipantPending) return <CircularProgress/>;

    if (isContestError || isParticipantError) {
        return <ErrorComponent errorMessage={contestError?.message ?? participantError!!.message}/>;
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
