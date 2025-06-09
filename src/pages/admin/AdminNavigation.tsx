import {useTheme} from "@mui/material/styles";
import {AppBar, Button, Tab, Tabs, ThemeProvider, useMediaQuery} from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import LogoutIcon from "@mui/icons-material/Logout";
import {navigationBarTheme} from "../../styles/theme/navigationBarTheme";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {Link} from "@tanstack/react-router";
import DefaultNavigationDropDown from "../../navigation/default/DefaultNavigationDropDown";

export const AdminNavigation = () => {

    const theme = useTheme();
    const isLargeWidth = useMediaQuery(theme.breakpoints.up("lg"));

    const signOutUser = async () => {
        alert("Sign out user")
    };

    const renderWideNavBar = () => {
        return (
            <AppBar position="static">
                <Tabs value={0} textColor="secondary" variant="fullWidth" centered>
                    <Tab label="STOCK COMP ADMIN" color="secondary" component={Link} to="/admin"
                         sx={{fontSize: "3rem"}}/>
                    <Tab label="CONTESTS" icon={<EventIcon/>} component={Link} to="/admin/contests"/>
                    <Tab label="USERS" icon={<AccountCircleIcon/>} component={Link} to="/admin/users"/>
                    <Tab label="SIGN OUT" icon={<LogoutIcon/>} component={Button} onClick={signOutUser}/>
                </Tabs>
            </AppBar>
        )
    }

    return (
        <ThemeProvider theme={navigationBarTheme}>
            {isLargeWidth ? renderWideNavBar() : <DefaultNavigationDropDown signOutUser={signOutUser}/>}
        </ThemeProvider>
    );
};
