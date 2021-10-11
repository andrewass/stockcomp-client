import React, {useState} from "react";
import ActiveContest from "./ActiveContest";
import {CircularProgress, Collapse, List, ListItemButton, ListItemText, Typography} from "@mui/material";
import {ExpandLess, ExpandMore} from "@mui/icons-material";

const ActiveContests = ({contests, fetchUpcomingContests}) => {

    const [open, setOpen] = useState(true);

    if (contests === undefined) {
        return (<CircularProgress/>);
    } else {
        return (
            <List sx={{width: "100%"}}>
                <ListItemButton sx={{p: 0}} onClick={() => setOpen(!open)}>
                    <ListItemText primary={<Typography variant="h5">Contests</Typography>}/>
                    {open ? <ExpandLess/> : <ExpandMore/>}
                </ListItemButton>
                <Collapse in={open} unmountOnExit>
                    <List>
                        {contests.map((contest) => <ActiveContest key={contest.contestNumber}
                                                                  fetchUpcomingContests={fetchUpcomingContests}
                                                                  contest={contest}/>)}
                    </List>
                </Collapse>
            </List>
        );
    }
}

export default ActiveContests;