import {Card, CardContent, Typography} from "@mui/material";
import React from "react";


const LeaderboardEntry = ({entry}) => {

    return (
        <Card elevation={0} className="leaderboardEntry">
            <CardContent>
                <Typography variant="h6">{entry.ranking} </Typography>
            </CardContent>
        </Card>
    );
}

export default LeaderboardEntry;