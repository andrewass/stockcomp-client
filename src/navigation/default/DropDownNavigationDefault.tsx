import {useState} from "react";
import {AppBar, Box, IconButton, Menu, MenuItem, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import EventIcon from '@mui/icons-material/Event';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {Link} from "@tanstack/react-router";


const DropDownNavigationDefault = ({signOutUser}: { signOutUser: () => void }) => {

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = () => {
        setAnchorEl(null);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="fixed" sx={{height: "100px"}}>
            <Toolbar>
                <Typography color="secondary" component={Link} to="/symbols"
                            sx={{fontSize: "3rem", paddingLeft: "5%"}}>
                    STOCK COMP
                </Typography>
                <Box sx={{marginLeft: "auto", marginRight: "5%"}}>
                    <IconButton aria-expanded={open ? "true" : undefined} onClick={handleClick}>
                        <MenuIcon sx={{fontSize: "3.5rem"}}/>
                    </IconButton>
                    <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                        <MenuItem color="primary" component={Link} to={"/symbols"} onClick={handleClose}>
                            <ShowChartIcon/>
                            Stocks
                        </MenuItem>
                        <MenuItem component={Link} to={"/leaderboard"} onClick={handleClose}>
                            <LeaderboardIcon/>
                            Leaderboard
                        </MenuItem>
                        <MenuItem component={Link} to={"/contests"} onClick={handleClose}>
                            <EventIcon/>
                            Contests
                        </MenuItem>
                        <MenuItem component={Link} to={"/account"} onClick={handleClose}>
                            <AccountCircleIcon/>
                            Account
                        </MenuItem>
                        <MenuItem onClick={signOutUser}>
                            <LogoutIcon/>
                            Sign Out
                        </MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default DropDownNavigationDefault;
