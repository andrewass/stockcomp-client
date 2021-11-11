import {useLocation} from "react-router-dom";
import {useState} from "react";
import {Box} from "@mui/material";
import ContestLeaderboard from "./ContestLeaderboard";


const ContestDetail = () => {
    const data = useLocation();
    const contest = data.state.contest;

    const [leaderboard, setLeaderboard] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    return (
        <Box>
            <p>Contest detail {JSON.stringify(contest)}</p>
            <ContestLeaderboard contestNumber={contest.contestNumber}/>
        </Box>
    )
}

export default ContestDetail;