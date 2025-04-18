import {useState} from "react";
import {AppBar, Box, IconButton, ListItemIcon, Menu, MenuItem, styled, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import EventIcon from '@mui/icons-material/Event';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {Link} from "@tanstack/react-router";


const StyledItemIcon = styled(ListItemIcon)({
    marginRight: "0.5rem"
});


const DropDownMenu = ({signOutUser}: { signOutUser: () => void }) => {

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = () => {
        setAnchorEl(null);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography color="secondary" component={Link} to="/symbols"
                            sx={{fontSize: "3rem", marginLeft: "5%"}}>
                    STOCK COMP
                </Typography>
                <Box sx={{marginLeft: "auto", marginRight: "5%"}}>
                    <IconButton aria-expanded={open ? "true" : undefined} onClick={handleClick}>
                        <MenuIcon sx={{fontSize: "3.5rem"}}/>
                    </IconButton>
                    <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                        <MenuItem color="primary" component={Link} to={"/symbols"} onClick={handleClose}>
                            <StyledItemIcon>
                                <ShowChartIcon/>
                            </StyledItemIcon>
                            Stocks
                        </MenuItem>
                        <MenuItem component={Link} to={"/leaderboard"} onClick={handleClose}>
                            <StyledItemIcon>
                                <LeaderboardIcon/>
                            </StyledItemIcon>
                            Leaderboard
                        </MenuItem>
                        <MenuItem component={Link} to={"/contests"} onClick={handleClose}>
                            <StyledItemIcon>
                                <EventIcon/>
                            </StyledItemIcon>
                            Contests
                        </MenuItem>
                        <MenuItem component={Link} to={"/account"} onClick={handleClose}>
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
