import {Box, Card, CardContent, Stack, Typography} from "@mui/material";
import {format, parseISO} from "date-fns";
import {Contest, getStatusByColor} from "../../../domain/contests/contestTypes";
import CircleIcon from "@mui/icons-material/Circle";
import {ContestLeaderboard} from "./ContestLeaderboard";

interface Props {
    contest: Contest
}

export default function ContestLeftPart({contest}: Props) {

    const getContestStatus = () => {
        return (
            <Box display="flex">
                <Typography> {contest.contestStatus}</Typography>
                <CircleIcon sx={{color: getStatusByColor(contest), marginLeft: "0.5rem"}}/>
            </Box>
        );
    }

    return (
        <Stack direction="column" width="60%">
            <Card elevation={0}>
                <CardContent>
                    <Typography variant="h5">Contest {contest.contestName}</Typography>
                    <Typography> Start date : {format(parseISO(contest.startTime), "yyyy-MM-dd HH:mm")}</Typography>
                    {getContestStatus()}
                    <Typography>Participants : {contest.participantCount}</Typography>
                </CardContent>
            </Card>
            <ContestLeaderboard contestId={contest.contestId}/>
        </Stack>
    );
}
