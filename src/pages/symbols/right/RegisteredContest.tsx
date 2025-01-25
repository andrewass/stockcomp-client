import {Box, Tooltip, Typography} from "@mui/material";
import CircleIcon from '@mui/icons-material/Circle';
import React from "react";
import {Contest, contestStatusRecord, getStatusByColor} from "../../../domain/contests/contestTypes";
import {formatDate} from "../../../util/dateUtils";

interface Props {
    contest: Contest
}

const RegisteredContest = ({contest}: Props) => {
    return (
        <React.Fragment>
            <Box display="flex" flexDirection="row">
                <Typography>{contest.contestName}</Typography>
                <Tooltip title={contestStatusRecord[contest.contestStatus]} placement="top">
                    <CircleIcon sx={{color: getStatusByColor(contest), marginRight: 1}}/>
                </Tooltip>
            </Box>
            <Typography>Ending {formatDate(contest.endTime)}</Typography>
        </React.Fragment>
    )
}

export default RegisteredContest;
