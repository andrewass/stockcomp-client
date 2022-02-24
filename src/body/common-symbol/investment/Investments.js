import React, {useState} from "react";
import {Collapse, List, ListItemButton, ListItemText, Typography} from "@mui/material";
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import Investment from "./Investment";

const Investments = ({investments}) => {

    const [open, setOpen] = useState(false);

    return (
        <List>
            <ListItemButton sx={{p:0}} onClick={() => setOpen(!open)}>
                <ListItemText primary={<Typography variant="h5">Investments</Typography> }/>
                {open ? <ExpandLess/> : <ExpandMore/>}
            </ListItemButton>

            <Collapse in={open} unmountOnExit>
                <List sx={{width: "100%", maxHeight: "20rem", overflow: "auto", ml:2}}component="div" disablePadding>
                    {investments.map((investment) => <Investment key={investment.id} investment={investment}/>)}
                </List>
            </Collapse>
        </List>
    );
}

export default Investments;