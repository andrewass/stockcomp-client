import {useState} from "react";
import {AppBar, Box, IconButton, ListItemIcon, Menu, MenuItem, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {NavLink} from "react-router-dom";
import ShowChartIcon from '@mui/icons-material/ShowChart';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import EventIcon from '@mui/icons-material/Event';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {styled} from "@mui/material";


const StyledItemIcon = styled(ListItemIcon)({
    marginRight: "0.5rem"
});

const DropDownMenu = ({signOutUser}) => {

    const [anchorEl, setAnchorEl] = useState(null);
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
                        <MenuItem color="primary" component={NavLink} to={"/stocks"} onClick={handleClose}>
                            <StyledItemIcon>
                                <ShowChartIcon/>
                            </StyledItemIcon>
                            Stocks
                        </MenuItem>
                        <MenuItem component={NavLink} to={"/leaderboard"} onClick={handleClose}>
                            <StyledItemIcon>
                                <LeaderboardIcon/>
                            </StyledItemIcon>
                            Leaderboard
                        </MenuItem>
                        <MenuItem component={NavLink} to={"/contests"} onClick={handleClose}>
                            <StyledItemIcon>
                                <EventIcon/>
                            </StyledItemIcon>
                            Contests
                        </MenuItem>
                        <MenuItem component={NavLink} to={"/user"} onClick={handleClose}>
                            <StyledItemIcon>
                                <AccountCircleIcon/>
                            </StyledItemIcon>
                            Account
                        </MenuItem>
                        <MenuItem onClick={signOutUser}>
                            <StyledItemIcon>
                                <LogoutIcon/>
                            </StyledItemIcon>
                            Sign Out
                        </MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default DropDownMenu;