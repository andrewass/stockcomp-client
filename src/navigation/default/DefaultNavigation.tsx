import {AppBar, Box, Container, IconButton, Toolbar, Typography, useMediaQuery} from "@mui/material";
import SunnyIcon from "@mui/icons-material/Sunny";
import NightlightIcon from "@mui/icons-material/Nightlight";
import DropDownNavigationDefault from "./DropDownNavigationDefault";
import {useTheme} from "@mui/material/styles";
import {useApiWrapper} from "../../config/useApiWrapper";
import {getLogOutConfig} from "../../auth/api/authApi";
import {useThemeContext} from "../../theme/AppThemeContext";
import {darkTheme} from "../../theme/themes";
import NavigationButton from "../NavigationButton";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import EventIcon from "@mui/icons-material/Event";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";

export const DefaultNavigation = () => {
    const {toggleTheme, appTheme} = useThemeContext();
    const theme = useTheme();
    const isLargeWidth = useMediaQuery(theme.breakpoints.up("lg"));
    const {apiPost} = useApiWrapper();

    const signOutUser = async () => {
        await apiPost(getLogOutConfig());
        window.location.reload();
    };

    const renderWideNavigationBar = () => {
        return (
            <AppBar position="fixed" component="nav" sx={{height: "100px", backgroundColor: appTheme.palette.primary.main}}>
                <Toolbar sx={{height: "100%"}}>
                    <Container maxWidth="xl" sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        height: "100%"
                    }}>
                        <Box sx={{display: "flex", alignItems: "center", gap: 10}}>
                            <Typography sx={{color: "white" , fontWeight: "bold", fontSize: "large"}}>STOCK COMP</Typography>
                            <NavigationButton to="/symbols" startIcon={<ShowChartIcon/>} text="Stocks"/>
                            <NavigationButton to="/leaderboard" startIcon={<LeaderboardIcon/>} text="Leaderboard"/>
                            <NavigationButton to="/contests" startIcon={<EventIcon/>} text="Contests"/>
                            <NavigationButton to="/account" startIcon={<AccountCircleIcon/>} text="Account"/>
                        </Box>
                        <Box sx={{display: "flex", alignItems: "center", gap: 6}}>
                            <IconButton sx={{color: "white"}} onClick={toggleTheme}>
                                {appTheme === darkTheme ? <SunnyIcon/> : <NightlightIcon/>}
                            </IconButton>
                            <IconButton sx={{color: "white"}}>
                                <LogoutIcon/>
                            </IconButton>
                        </Box>
                    </Container>
                </Toolbar>
            </AppBar>
        );
    };

    return (isLargeWidth ? renderWideNavigationBar() : <DropDownNavigationDefault signOutUser={signOutUser}/>);
};
