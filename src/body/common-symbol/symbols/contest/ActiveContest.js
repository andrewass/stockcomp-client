import {signUpForContest} from "../../../../service/contestService";
import {Box, Button, Card, CardContent, ListItem, ListItemText, Typography} from "@mui/material";
import CircleIcon from '@mui/icons-material/Circle';
import {format, parseISO} from "date-fns";
import {useMutation} from "react-query";
import toast from "react-hot-toast";
import {queryClient} from "../../../../config/queryConfig";
import {CONTEST_STATUS} from "../../../../util/constants";


export const ActiveContest = ({contestParticipant}) => {

    const {contest, participant} = contestParticipant;

    const mutation = useMutation((contestNumber) => signUpForContest(contestNumber), {
        onSuccess: () => queryClient.invalidateQueries("getUpcomingContests"),
        onError: () => {
            toast.error("Unable to sign up for contest", {
                duration: 4000,
                position: "top-center"
            });
        }
    });

    const handleContestSignUp = () => {
        mutation.mutate(contest.contestNumber);
    }

    const getContestStatus = () => {
        return (
            <Box display="flex">
                <CircleIcon sx={{color: contest.contestStatus === CONTEST_STATUS.RUNNING
                        ? "green" : "orange", marginRight: 1}}/>
                <Typography> {contest.contestStatus === CONTEST_STATUS.RUNNING
                    ? "Ending " + format(parseISO(contest.endTime), "yyyy-MM-dd HH:mm")
                    : "Starting " + format(parseISO(contest.startTime), "yyyy-MM-dd HH:mm")}</Typography>
            </Box>
        );
    }

    const getParticipantStatus = () => {
        if (participant.rank) {
            return <ListItemText primary={"Rank " + participant.rank + " / " + contest.participantCount}/>
        } else if (participant) {
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
