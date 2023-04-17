import {useParams} from "react-router-dom";
import {Box, Card, CardContent, CircularProgress, Typography} from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import {format, parseISO} from "date-fns";
import {useApiWrapper} from "../config/apiWrapper";
import {GET_CONTEST_BY_NUMBER, getContestConfig} from "../contests/api/contestApi";
import {ContestLeaderboard} from "./ContestLeaderboard";
import ErrorComponent from "../error/ErrorComponent";
import {Contest} from "../contests/contestTypes";
import {useQuery} from "@tanstack/react-query";


export const ContestDetails = () => {
    const {contestNumber} = useParams<{ contestNumber: string }>();
    const {apiGet} = useApiWrapper();

    const {isLoading, data, error} = useQuery(
        [GET_CONTEST_BY_NUMBER, contestNumber],
        () => apiGet(getContestConfig(Number(contestNumber!)))
    );

    if (isLoading) return <CircularProgress/>

    if (error) return <ErrorComponent errorMessage={error as string}/>

    const contest = new Contest(data);

    const getContestStatus = () => {
        return (
            <Box display="flex">
                <Typography> {contest.contestStatus}</Typography>
                <CircleIcon sx={{color: contest.getStatusByColor(), marginLeft: "0.5rem"}}/>
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