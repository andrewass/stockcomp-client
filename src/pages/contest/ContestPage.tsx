import {CircularProgress, Stack} from "@mui/material";
import {useParams} from "react-router-dom";
import {useApiWrapper} from "../../config/useApiWrapper";
import {useQuery} from "@tanstack/react-query";
import {Contest} from "../../domain/contests/contestTypes";
import {GET_CONTEST_BY_NUMBER, getContestConfig} from "../../domain/contests/contestApi";
import ErrorComponent from "../../error/ErrorComponent";
import ContestLeftPart from "./leftpart/ContestLeftPart";
import ContestRightPart from "./rightpart/ContestRightPart";

export default function ContestPage() {
    const {contestNumber} = useParams<{ contestNumber: string }>();
    const {apiGet} = useApiWrapper();

    const {isPending, isError, error, data: contest} = useQuery<Contest>({
        queryKey: [GET_CONTEST_BY_NUMBER, contestNumber],
        queryFn: () => apiGet(getContestConfig(Number(contestNumber!))),
    });

    if (isPending) return <CircularProgress/>;

    if (isError) return <ErrorComponent errorMessage={error.message}/>;

    return (
        <Stack direction="row">
            <ContestLeftPart contest={contest}/>
            <ContestRightPart contestId={contest.contestId}/>
        </Stack>
    );
}
