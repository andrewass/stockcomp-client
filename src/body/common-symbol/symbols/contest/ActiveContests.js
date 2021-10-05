import React, {useState} from "react";
import ActiveContest from "./ActiveContest";
import {CircularProgress, Collapse, List, ListItemButton, ListItemText} from "@mui/material";
import {ExpandLess, ExpandMore} from "@mui/icons-material";

const ActiveContests = ({contests}) => {

    const [open, setOpen] = useState(true);

    if (contests === undefined) {
        return (<CircularProgress/>);
    } else {
        return (
            <List sx={{width:"100%"}}>
                <ListItemButton sx={{p:0}} onClick={() => setOpen(!open)}>
                    <ListItemText primary="Contests"/>
                    {open ? <ExpandLess/> : <ExpandMore/>}
                </ListItemButton>
                <Collapse in={open} unmountOnExit>
                    <List>
                        {contests.map((contest) => <ActiveContest key={contest.contestNumber} contest={contest}/>)}
                    </List>
                </Collapse>
            </List>
        );
    }
}

export default ActiveContests;