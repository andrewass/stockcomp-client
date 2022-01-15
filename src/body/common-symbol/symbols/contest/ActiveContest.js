import {signUpForContest} from "../../../../service/contestService";
import {Box, Button, Card, CardContent, ListItem, ListItemText, Typography} from "@mui/material";
import CircleIcon from '@mui/icons-material/Circle';
import {format, parseISO} from "date-fns";


const ActiveContest = ({contest, fetchUpcomingContests}) => {

    const handleContestSignUp = async (contestNumber) => {
        await signUpForContest(contestNumber);
        fetchUpcomingContests();
    }

    const getContestStatus = () => {
        return (
            <Box display="flex">
                <CircleIcon sx={{color: contest.contestStatus === "Running" ? "green" : "orange", marginRight: 1}}/>
                <Typography> {contest.contestStatus === "Running"
                    ? "Ending " + format(parseISO(contest.endTime), "yyyy-MM-dd HH:mm")
                    : "Starting " + format(parseISO(contest.startTime), "yyyy-MM-dd HH:mm")}</Typography>
            </Box>
        );
    }

    const getParticipantStatus = () => {
        if (contest.rank) {
            return <ListItemText primary={"Rank " + contest.rank + " / " + contest.participantCount}/>
        } else if (contest.userParticipating) {
            return <ListItemText primary={"Signed Up"} sx={{p: 0}}/>
        } else {
            return <Button onClick={() => handleContestSignUp(contest.contestNumber)}>Sign Up</Button>
        }
    }

    return (
        <ListItem sx={{p: 0, pl: 2}}>
            <Card elevation={0}>
                <CardContent>
                    <Typography variant="h6">Contest {contest.contestNumber}</Typography>
                    {getContestStatus()}
                    {getParticipantStatus()}
                </CardContent>
            </Card>
        </ListItem>
    );
}

export default ActiveContest;