import {AppBar, Box, Button, Stack, ThemeProvider, Toolbar, Typography, useMediaQuery} from "@mui/material";
import DropDownMenu from "./DropDownMenu";
import {useTheme} from "@mui/material/styles";
import {navigationBarTheme} from "../../styles/theme/navigationBarTheme";
import {useApiWrapper} from "../../config/useApiWrapper";
import {getLogOutConfig} from "../../auth/api/authApi";
import {Link} from "@tanstack/react-router";
import {useThemeContext} from "../../theme/AppThemeContext";

export const DefaultNavigation = () => {
    const {toggleTheme} = useThemeContext();
    const theme = useTheme();
    const isLargeWidth = useMediaQuery(theme.breakpoints.up("lg"));
    const {apiPost} = useApiWrapper();

    const signOutUser = async () => {
        await apiPost(getLogOutConfig());
        window.location.reload();
    };

    const renderWideNavBar = () => {
        return (
            <AppBar position="fixed" component="nav" sx={{height: "100px"}}>
                <Toolbar>
                    <Box display="flex" justifyContent="center" width="100%">
                        <Stack direction="row" alignItems="center" spacing={20}>
                            <Stack direction="row" alignItems="center" gap={8}>
                                <Typography>STOCK COMP</Typography>
                                <Button sx={{color: "white"}} component={Link} to="/symbols">
                                    Symbols
                                </Button>
                                <Button sx={{color: "white"}} component={Link} to="/leaderboard">
                                    Leaderboard
                                </Button>
                                <Button sx={{color: "white"}} component={Link} to="/contests">
                                    Contests
                                </Button>
                                <Button sx={{color: "white"}} component={Link} to="/account">
                                    Account
                                </Button>
                            </Stack>
                            <Stack direction="row">
                                <Button sx={{color: "white"}} onClick={toggleTheme} >Toggle Theme</Button>
                                <Button sx={{color: "white"}} onClick={signOutUser}>
                                    Logout
                                </Button>
                            </Stack>
                        </Stack>
                    </Box>
                </Toolbar>
            </AppBar>
        );
    }

    return (
        <ThemeProvider theme={navigationBarTheme}>
            {isLargeWidth ? renderWideNavBar() : <DropDownMenu signOutUser={signOutUser}/>}
        </ThemeProvider>
    );
};
