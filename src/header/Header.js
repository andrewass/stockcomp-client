import React, {useState} from "react";
import ShowChartIcon from '@mui/icons-material/ShowChart';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import EventIcon from '@mui/icons-material/Event';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {AppBar, Button, Tab, Tabs, ThemeProvider, useMediaQuery} from "@mui/material";
import {NavLink, useHistory} from "react-router-dom";
import {removeSignedInFromLocalStorage, signOut} from "../service/authService";
import DropDownMenu from "./DropDownMenu";
import {useTheme} from "@mui/material/styles";
import {localTheme} from "./headerTheme";

const Header = () => {

    const theme = useTheme();
    const isLargeWidth = useMediaQuery(theme.breakpoints.up("lg"));
    const [value, setValue] = useState(0);
    const history = useHistory();

    const signOutUser = async () => {
        await signOut()
        removeSignedInFromLocalStorage()
        history.push("/authentication")
    };

    const renderWideNavBar = () => {
        return (
            <AppBar position="static">
                <Tabs value={value} onChange={handleChange} textColor="secondary" variant="fullWidth" centered>
                    <Tab label="STOCK COMP" color="secondary" component={NavLink} to="/stocks" sx={{fontSize: "3rem"}}/>
                    <Tab label="STOCKS" icon={<ShowChartIcon/>} component={NavLink} to="/stocks"/>
                    <Tab label="LEADERBOARD" icon={<LeaderboardIcon/>} component={NavLink} to="/leaderboard"/>
                    <Tab label="CONTESTS" icon={<EventIcon/>} component={NavLink} to="/contests"/>
                    <Tab label="ACCOUNT" icon={<AccountCircleIcon/>} component={NavLink} to="/account"/>
                    <Tab label="SIGN OUT" icon={<LogoutIcon/>} component={Button} onClick={signOutUser}/>
                </Tabs>
            </AppBar>
        )
    }

    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    return (
        <ThemeProvider theme={localTheme}>
            {isLargeWidth ? renderWideNavBar() : <DropDownMenu signOutUser={signOutUser}/>}
        </ThemeProvider>
    );
};

export default Header;
