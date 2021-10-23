import React from "react";
import {AppBar, IconButton, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {NavLink} from "react-router-dom";


const DropDownMenu = () => {

    return (
        <AppBar position="static" sx={{flexDirection:"row"}}>
            <Typography color="secondary" component={NavLink} to="/stocks"
                        sx={{fontSize: "3rem", marginLeft:"5%"}}>
                STOCK COMP
            </Typography>
            <IconButton sx={{marginLeft:"auto", marginRight:"5%"}}>
                <MenuIcon sx={{fontSize:"3.5rem"}}/>
            </IconButton>
        </AppBar>
    )
}

export default DropDownMenu;