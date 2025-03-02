import {CircularProgress, Stack} from "@mui/material";
import ContestInvestments from "./ContestInvestments";
import ContestActiveOrders from "./ContestActiveOrders";
import {Contest} from "../../../domain/contests/contestTypes";
import ContestCompletedOrders from "./ContestCompletedOrders";
import {useQuery} from "@tanstack/react-query";
import {GET_CONTEST_BY_NUMBER} from "../../../domain/contests/contestApi";
import ErrorComponent from "../../../error/ErrorComponent";
import {getContestParticipantConfig} from "../../../domain/participant/participantApi";
import {useApiWrapper} from "../../../config/useApiWrapper";

interface Props {
    contestId: number
}

export default function ContestRightPart({contestId}: Props) {
    const {apiGet} = useApiWrapper();

    const {isPending, isError, error, data: contest} = useQuery<Contest>({
        queryKey: [GET_CONTEST_BY_NUMBER, contestId],
        queryFn: () => apiGet(getContestParticipantConfig(contestId)),
    });

    if (isPending) return <CircularProgress/>;

    if (isError) return <ErrorComponent errorMessage={error.message}/>;

    return (
        <Stack>
            <ContestInvestments/>
            <ContestActiveOrders/>
            <ContestCompletedOrders/>
        </Stack>
    );
}
