import React from "react";
import ActiveContest from "./ActiveContest";
import {CircularProgress, Typography} from "@mui/material";

const ActiveContests = ({contests}) => {

    if (contests === undefined) {
        return (<CircularProgress/>);
    } else if (contests.length === 0) {
        return <Typography variant="p">No upcoming contests</Typography>
    } else {
        return (
            <div id="upcomingContests">
                <ul id="contestList">
                    {contests.map((contest) =>
                        <ActiveContest key={contest.contestNumber} contest={contest}/>
                    )}
                </ul>
            </div>
        );
    }
}

export default ActiveContests;