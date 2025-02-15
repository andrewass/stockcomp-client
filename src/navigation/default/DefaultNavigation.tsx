import React, {SyntheticEvent, useState} from "react";
import {AppBar, Box, Button, Stack, ThemeProvider, Toolbar, Typography, useMediaQuery} from "@mui/material";
import {Link} from "react-router-dom";
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
            <AppBar position="static" component="nav">
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
                            <Stack>
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
