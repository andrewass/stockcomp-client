import {useLocation, useParams} from "react-router-dom";
import {Box, Card, CardContent, Typography} from "@mui/material";
import {ContestLeaderboard} from "./ContestLeaderboard";
import CircleIcon from "@mui/icons-material/Circle";
import {format, parseISO} from "date-fns";


const ContestDetail = () => {

    const {contestNumber} = useParams();

    const data = useLocation();
    const contestData = data.state.contest;

    const getContestStatusColor = () => {
        switch (contestData.contestStatus) {
            case "Running" :
                return "orange"
            case "Completed" :
                return "green"
            case "Awaiting Start" :
                return "grey"
            case "Stopped" :
                return "red"
            default:
                console.error("Invalid contest status " + contestData.contestStatus);
        }
    }

    const getContestStatus = () => {
        return (
            <Box display="flex">
                <Typography> {contestData.contestStatus}</Typography>
                <CircleIcon sx={{color: getContestStatusColor(), marginLeft: "0.5rem"}}/>
            </Box>
        );
    }

    return (
        <Box>
            <Card elevation={0}>
                <CardContent sx={{ml: "23%", mt: "10%"}}>
                    <Typography variant="h5">Contest {contestData.contestNumber}</Typography>
                    <Typography> Start date : {format(parseISO(contestData.startTime), "yyyy-MM-dd HH:mm")}</Typography>
                    {getContestStatus()}
                    <Typography>Participants : {contestData.participantCount}</Typography>
                </CardContent>
            </Card>
            <ContestLeaderboard contestNumber={contestData.contestNumber}/>
        </Box>
    )
}

export default ContestDetail;