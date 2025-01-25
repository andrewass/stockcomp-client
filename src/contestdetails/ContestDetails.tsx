import {useParams} from "react-router-dom";
import {Box, Card, CardContent, CircularProgress, Typography} from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import {format, parseISO} from "date-fns";
import {useApiWrapper} from "../config/useApiWrapper";
import {ContestLeaderboard} from "./ContestLeaderboard";
import ErrorComponent from "../error/ErrorComponent";
import {useQuery} from "@tanstack/react-query";
import {GET_CONTEST_BY_NUMBER, getContestConfig} from "../domain/contests/contestApi";
import {Contest, getStatusByColor} from "../domain/contests/contestTypes";


export const ContestDetails = () => {
    const {contestNumber} = useParams<{ contestNumber: string }>();
    const {apiGet} = useApiWrapper();

    const {isPending, isError, error, data: contest} = useQuery<Contest>({
        queryKey: [GET_CONTEST_BY_NUMBER, contestNumber],
        queryFn: () => apiGet(getContestConfig(Number(contestNumber!))),
    });

    if (isPending) return <CircularProgress/>;

    if (isError) return <ErrorComponent errorMessage={error.message}/>;


    const getContestStatus = () => {
        return (
            <Box display="flex">
                <Typography> {contest.contestStatus}</Typography>
                <CircleIcon sx={{color: getStatusByColor(contest), marginLeft: "0.5rem"}}/>
            </Box>
        );
    }

    return (
        <Box>
            <Card elevation={0}>
                <CardContent sx={{ml: "23%", mt: "10%"}}>
                    <Typography variant="h5">Contest {contestNumber}</Typography>
                    <Typography> Start date : {format(parseISO(contest.startTime), "yyyy-MM-dd HH:mm")}</Typography>
                    {getContestStatus()}
                    <Typography>Participants : {contest.participantCount}</Typography>
                </CardContent>
            </Card>
            <ContestLeaderboard contestNumber={parseInt(contestNumber!)}/>
        </Box>
    );
}