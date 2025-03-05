import {CircularProgress, Stack} from "@mui/material";
import ContestInvestments from "./ContestInvestments";
import ContestActiveOrders from "./ContestActiveOrders";
import ContestCompletedOrders from "./ContestCompletedOrders";
import {useQuery} from "@tanstack/react-query";
import {GET_CONTEST_BY_NUMBER} from "../../../domain/contests/contestApi";
import ErrorComponent from "../../../error/ErrorComponent";
import {getDetailedParticipantForContestConfig} from "../../../domain/participant/participantApi";
import {useApiWrapper} from "../../../config/useApiWrapper";
import {DetailedParticipant} from "../../../domain/participant/participantTypes";

interface Props {
    contestId: number
}

export default function ContestRightPart({contestId}: Props) {
    const {apiGet} = useApiWrapper();

    const {isPending, isError, error, data: participant} = useQuery<DetailedParticipant>({
        queryKey: [GET_CONTEST_BY_NUMBER, contestId],
        queryFn: () => apiGet(getDetailedParticipantForContestConfig(contestId)),
    });

    if (isPending) return <CircularProgress/>;

    if (isError) return <ErrorComponent errorMessage={error.message}/>;

    if(participant === null) return null;

    return (
        <Stack>
            <ContestInvestments investments={participant.investments}/>
            <ContestActiveOrders orders={participant.activeOrders}/>
            <ContestCompletedOrders orders={participant.completedOrders}/>
        </Stack>
    );
}
