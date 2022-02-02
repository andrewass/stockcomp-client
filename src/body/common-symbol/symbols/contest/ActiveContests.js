import {useState} from "react";
import ActiveContest from "./ActiveContest";
import {Collapse, List, ListItemButton, ListItemText, Typography} from "@mui/material";
import {ExpandLess, ExpandMore} from "@mui/icons-material";

export const ActiveContests = ({contests}) => {

    const [open, setOpen] = useState(true);

    return (
        <List sx={{width: "100%"}}>
            <ListItemButton sx={{p: 0}} onClick={() => setOpen(!open)}>
                <ListItemText primary={<Typography variant="h5">Contests</Typography>}/>
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