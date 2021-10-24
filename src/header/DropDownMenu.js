import React from "react";
import {AppBar, Box, IconButton, ListItemIcon, Menu, MenuItem, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {NavLink} from "react-router-dom";
import ShowChartIcon from '@mui/icons-material/ShowChart';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import EventIcon from '@mui/icons-material/Event';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const DropDownMenu = ({signOutUser}) => {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography color="secondary" component={NavLink} to="/stocks"
                            sx={{fontSize: "3rem", marginLeft: "5%"}}>
                    STOCK COMP
                </Typography>
                <Box sx={{marginLeft: "auto", marginRight: "5%"}}>
                    <IconButton aria-expanded={open ? "true" : undefined} onClick={handleClick}>
                        <MenuIcon sx={{fontSize: "3.5rem"}}/>
                    </IconButton>
                    <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                        <MenuItem color="primary" component={NavLink} to={"/stocks"}>
                            <ListItemIcon>
                                <ShowChartIcon/>
                            </ListItemIcon>
                            Stocks
                        </MenuItem>
                        <MenuItem component={NavLink} to={"/leaderboard"}>
                            <ListItemIcon>
                                <LeaderboardIcon/>
                            </ListItemIcon>
                            Lederboard
                        </MenuItem>
                        <MenuItem component={NavLink} to={"/contests"}>
                            <ListItemIcon>
                                <EventIcon/>
                            </ListItemIcon>
                            Contests
                        </MenuItem>
                        <MenuItem component={NavLink} to={"/account"}>
                            <ListItemIcon>
                                <AccountCircleIcon/>
                            </ListItemIcon>
                            Account
                        </MenuItem>
                        <MenuItem onClick={signOutUser}>
                            <ListItemIcon>
                                <LogoutIcon/>
                            </ListItemIcon>
                            Sign Out
                        </MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default DropDownMenu;