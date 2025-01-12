import {Typography} from "@mui/material";
import CircleIcon from '@mui/icons-material/Circle';
import React from "react";
import {Contest} from "../../../domain/contests/contestTypes";
import {formatDate} from "../../../util/dateUtils";

interface Props {
    contest: Contest
}

const RegisteredContest = ({contest}: Props) => {
    return (
        <React.Fragment>
            <Typography>Contest {contest.contestName}</Typography>
            <Typography>Status {contest.contestStatus}</Typography>
            <CircleIcon sx={{color: contest.getStatusByColor(), marginRight: 1}}/>
            <Typography>Ending {formatDate(contest.endTime)}</Typography>
        </React.Fragment>
    )
}

export default RegisteredContest;
