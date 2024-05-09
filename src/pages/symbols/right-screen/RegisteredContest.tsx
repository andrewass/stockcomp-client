import {Typography} from "@mui/material";
import React from "react";
import {Contest} from "../../../domain/contests/contestTypes";

interface Props {
    contest: Contest
}

const RegisteredContest = ({contest}: Props) => {
    return (
        <React.Fragment>
            <Typography>Contest {contest.contestNumber}</Typography>
            <Typography>Status {contest.contestStatus}</Typography>
            <Typography>From {contest.startTime}</Typography>
        </React.Fragment>
    )
}

export default RegisteredContest;