import React, {useEffect, useState} from "react";
import {getAllLeaderboardEntries, getLeaderboardUserEntry} from "../../service/leaderboardService";
import {CircularProgress} from "@mui/material";
import LeaderboardEntry from "./LeaderboardEntry";

const Leaderboard = () => {

    const [leaderboardEntries, setLeaderboardEntries] = useState([]);
    const [userEntry, setUserEntry] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const populateLeaderboardEntries = async () => {
        const leaderboardEntriesResponse = await getAllLeaderboardEntries();
        const userEntryResponse = await getLeaderboardUserEntry();
        setLeaderboardEntries(leaderboardEntriesResponse.data);
        setUserEntry(userEntryResponse.data);
        setIsLoading(false);
    }

    useEffect(() => {
        populateLeaderboardEntries().catch(error => console.log(error));
    }, []);


    if (isLoading) {
        return <CircularProgress/>
    }
    return (
        <div>
            <p>Leaderboard</p>
                {leaderboardEntries.map(entry => <LeaderboardEntry entry={entry}/>
            )}
        </div>
    );
};

export default Leaderboard;