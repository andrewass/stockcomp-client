import React from "react";
import {signUpForContest} from "../../../../service/contestService";
import {Button, List, ListItem, ListItemIcon, ListItemText} from "@mui/material";
import CircleIcon from '@mui/icons-material/Circle';

const ActiveContest = ({contest}) => {

    const handleContestSignUp = async (contestNumber) => {
        signUpForContest(contestNumber)
    }

    const getContestStatus = () => {
        return (
            <ListItem sx={{p: 0}}>
                <ListItemIcon sx={{minWidth: "2rem"}}>
                    <CircleIcon sx={{color: contest.running ? "green" : "orange"}}/>
                </ListItemIcon>
                <ListItemText primary={contest.running ? "Running" : "Starting " + contest.startTime}/>
            </ListItem>
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
        <List>
            <ListItemText>Contest {contest.contestNumber}</ListItemText>
            {getContestStatus()}
            {getParticipantStatus()}
        </List>
    );
}

export default ActiveContest;