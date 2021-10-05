import React from "react";
import {signUpForContest} from "../../../../service/contestService";
import {Box, Button, Card, CardContent, ListItem, ListItemText, Typography} from "@mui/material";
import CircleIcon from '@mui/icons-material/Circle';


const ActiveContest = ({contest}) => {

    const handleContestSignUp = async (contestNumber) => {
        signUpForContest(contestNumber)
    }

    const getContestStatus = () => {
        return (
            <Box display="flex">
                <CircleIcon sx={{color: contest.running ? "green" : "orange", marginRight: 1}}/>
                <Typography> {contest.running ? "Running" : "Starting " + contest.startTime}</Typography>
            </Box>
        );
    }

    const getParticipantStatus = () => {
        if (contest.rank) {
            return <ListItemText primary={"Rank " + contest.rank + " / " + contest.participantCount}/>
        } else if (contest.userParticipating) {
            return <ListItemText primary={"Signed Up"}/>
        } else {
            return <Button onClick={() => handleContestSignUp(contest.contestNumber)}>Sign Up</Button>
        }
    }

    return (
        <ListItem sx={{p:"0.5rem 0"}}>
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