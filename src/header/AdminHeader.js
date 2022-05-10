import {useTheme} from "@mui/material/styles";
import {AppBar, Button, Tab, Tabs, ThemeProvider, useMediaQuery} from "@mui/material";
import React, {useState} from "react";
import {NavLink, useNavigate} from "react-router-dom";
import {removeSignedInFromLocalStorage, signOut} from "../service/authService";
import EventIcon from "@mui/icons-material/Event";
import LogoutIcon from "@mui/icons-material/Logout";
import {localTheme} from "./headerTheme";
import DropDownMenu from "./DropDownMenu";

export const AdminHeader = () => {

    const theme = useTheme();
    const isLargeWidth = useMediaQuery(theme.breakpoints.up("lg"));
    const [value, setValue] = useState(0);
    const navigate = useNavigate();

    const signOutUser = async () => {
        await signOut()
        removeSignedInFromLocalStorage()
        navigate("/authentication")
    };

    const renderWideNavBar = () => {
        return (
            <AppBar position="static">
                <Tabs value={value} onChange={handleChange} textColor="secondary" variant="fullWidth" centered>
                    <Tab label="STOCK COMP ADMIN" color="secondary" component={NavLink} to="/admin" sx={{fontSize: "3rem"}}/>
                    <Tab label="CONTESTS" icon={<EventIcon/>} component={NavLink} to="/admin-contests"/>
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