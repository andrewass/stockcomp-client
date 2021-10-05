import React, {useState} from "react";
import {Collapse, List, ListItemButton, ListItemText} from "@mui/material";
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import Investment from "./Investment";

const Investments = ({investments}) => {

    const [open, setOpen] = useState(false);

    return (
        <List>
            <ListItemButton sx={{p:0}} onClick={() => setOpen(!open)}>
                <ListItemText primary="Investments"/>
                {open ? <ExpandLess/> : <ExpandMore/>}
            </ListItemButton>
            <Collapse in={open} unmountOnExit>
                <List component="div" disablePadding>
                    {investments.map((investment) => <Investment investment={investment}/>)}
                </List>
            </Collapse>
        </List>
    );
}

export default Investments;