import {useParams} from "react-router-dom";
import {Box, Card, CardContent, CircularProgress, Typography} from "@mui/material";
import {ContestLeaderboard} from "./ContestLeaderboard";
import CircleIcon from "@mui/icons-material/Circle";
import {format, parseISO} from "date-fns";
import {useGetContest} from "../../../service/contestService";


const ContestDetail = () => {

    const {contestNumber} = useParams();

    const {isLoading,data,error} = useGetContest(contestNumber);

    if (isLoading) return <CircularProgress/>;

    if (error) return `Error! ${error}`;

    const contest = data.contest;

    const getContestStatusColor = () => {
        switch (contest.contestStatus) {
            case "Running" :
                return "orange"
            case "Completed" :
                return "green"
            case "Awaiting Start" :
                return "grey"
            case "Stopped" :
                return "red"
            default:
                console.error("Invalid contest status " + contest.contestStatus);
        }
    }

    const getContestStatus = () => {
        return (
            <Box display="flex">
                <Typography> {contest.contestStatus}</Typography>
                <CircleIcon sx={{color: getContestStatusColor(), marginLeft: "0.5rem"}}/>
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
            <ContestLeaderboard contestNumber={contestNumber}/>
        </Box>
    )
}

export default ContestDetail;