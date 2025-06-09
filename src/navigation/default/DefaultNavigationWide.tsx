import {AppBar, Box, Container, IconButton, Toolbar, Typography} from "@mui/material";
import NavigationButton from "../NavigationButton";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import EventIcon from "@mui/icons-material/Event";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {darkTheme} from "../../theme/themes";
import SunnyIcon from "@mui/icons-material/Sunny";
import NightlightIcon from "@mui/icons-material/Nightlight";
import LogoutIcon from "@mui/icons-material/Logout";
import {useThemeContext} from "../../theme/AppThemeContext";


export default function DefaultNavigationWide({signOutUser}: { signOutUser: () => void }) {
    const {toggleTheme, appTheme} = useThemeContext();

    return (
        <AppBar position="fixed" component="nav" sx={{height: "100px", backgroundColor: appTheme.palette.primary.main}}>
            <Toolbar sx={{height: "100%"}}>
                <Container maxWidth="xl" sx={{display: "flex", justifyContent: "space-between", height: "100%"}}>
                    <Box sx={{display: "flex", alignItems: "center", gap: 10}}>
                        <Typography sx={{color: "white", fontWeight: "bold", fontSize: "large"}}>STOCK COMP</Typography>
                        <NavigationButton to="/symbols" startIcon={<ShowChartIcon/>} text="Stocks"/>
                        <NavigationButton to="/leaderboard" startIcon={<LeaderboardIcon/>} text="Leaderboard"/>
                        <NavigationButton to="/contests" startIcon={<EventIcon/>} text="Contests"/>
                        <NavigationButton to="/account" startIcon={<AccountCircleIcon/>} text="Account"/>
                    </Box>
                    <Box sx={{display: "flex", alignItems: "center", gap: 6}}>
                        <IconButton sx={{color: "white"}} onClick={toggleTheme}>
                            {appTheme === darkTheme ? <SunnyIcon/> : <NightlightIcon/>}
                        </IconButton>
                        <IconButton sx={{color: "white"}} onClick={signOutUser}>
                            <LogoutIcon/>
                        </IconButton>
                    </Box>
                </Container>
            </Toolbar>
        </AppBar>
    );
}
