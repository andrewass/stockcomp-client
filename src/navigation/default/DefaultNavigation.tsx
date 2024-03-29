import React, {SyntheticEvent, useState} from "react";
import ShowChartIcon from '@mui/icons-material/ShowChart';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import EventIcon from '@mui/icons-material/Event';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {AppBar, Button, Tab, Tabs, ThemeProvider, useMediaQuery} from "@mui/material";
import {NavLink} from "react-router-dom";
import DropDownMenu from "./DropDownMenu";
import {useTheme} from "@mui/material/styles";
import {navigationBarTheme} from "../../styles/theme/navigationBarTheme";
import {useApiWrapper} from "../../config/useApiWrapper";
import {getLogOutConfig} from "../../auth/api/authApi";

export const DefaultNavigation = () => {

    const theme = useTheme();
    const isLargeWidth = useMediaQuery(theme.breakpoints.up("lg"));
    const [value, setValue] = useState(0);
    const {apiPost} = useApiWrapper();

    const signOutUser = async () => {
        await apiPost(getLogOutConfig());
        window.location.reload();
    };

    const handleChange = (event: SyntheticEvent, newValue: number) => {
        setValue(newValue)
    }

    const renderWideNavBar = () => {
        return (
            <AppBar position="static">
                <Tabs value={value} onChange={handleChange} textColor="secondary" variant="fullWidth" centered>
                    <Tab label="STOCK COMP" color="secondary" component={NavLink} to="/symbols" sx={{fontSize: "3rem"}}/>
                    <Tab label="STOCKS" icon={<ShowChartIcon/>} component={NavLink} to="/symbols"/>
                    <Tab label="LEADERBOARD" icon={<LeaderboardIcon/>} component={NavLink} to="/leaderboard"/>
                    <Tab label="CONTESTS" icon={<EventIcon/>} component={NavLink} to="/contests"/>
                    <Tab label="ACCOUNT" icon={<AccountCircleIcon/>} component={NavLink} to="/account"/>
                    <Tab label="SIGN OUT" icon={<LogoutIcon/>} component={Button} onClick={signOutUser}/>
                </Tabs>
            </AppBar>
        )
    }


    return (
        <ThemeProvider theme={navigationBarTheme}>
            {isLargeWidth ? renderWideNavBar() : <DropDownMenu signOutUser={signOutUser}/>}
        </ThemeProvider>
    );
};
