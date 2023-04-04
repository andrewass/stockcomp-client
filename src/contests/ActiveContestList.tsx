import {List} from "@mui/material";
import {ActiveContest} from "./ActiveContest";
import {Contest} from "./contestTypes";


export const ActiveContestList = ({contests}: { contests: Contest[] }) => {

    return (
        <List sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
            {contests.map(contest =>
                <ActiveContest key={contest.contestNumber} contest={contest}/>
            )}
        </List>
    )
}