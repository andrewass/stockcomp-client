import {useTheme} from "@mui/material/styles";
import {AppBar, Button, Tab, Tabs, ThemeProvider, useMediaQuery} from "@mui/material";
import React, {useState} from "react";
import {NavLink} from "react-router-dom";
import EventIcon from "@mui/icons-material/Event";
import LogoutIcon from "@mui/icons-material/Logout";
import {useAuth} from "react-oidc-context";
import DropDownMenu from "../default/DropDownMenu";
import {navigationBarTheme} from "../../styles/theme/navigationBarTheme";

export const AdminNavigation = () => {

    const theme = useTheme();
    const isLargeWidth = useMediaQuery(theme.breakpoints.up("lg"));
    const [value, setValue] = useState(0);
    const auth = useAuth();


    const signOutUser = async () => {
        await auth.removeUser();
    };

    const renderWideNavBar = () => {
        return (
            <AppBar position="static">
                <Tabs value={value} onChange={handleChange} textColor="secondary" variant="fullWidth" centered>
                    <Tab label="STOCK COMP ADMIN" color="secondary" component={NavLink} to="/admin"
                         sx={{fontSize: "3rem"}}/>
                    <Tab label="CONTESTS" icon={<EventIcon/>} component={NavLink} to="/admin/contests"/>
                    <Tab label="SIGN OUT" icon={<LogoutIcon/>} component={Button} onClick={signOutUser}/>
                </Tabs>
            </AppBar>
        )
    }

    const handleChange = (event: any, newValue: React.SetStateAction<number>) => {
        setValue(newValue);
    }

    return (
        <ThemeProvider theme={navigationBarTheme}>
            {isLargeWidth ? renderWideNavBar() : <DropDownMenu signOutUser={signOutUser}/>}
        </ThemeProvider>
    );
};