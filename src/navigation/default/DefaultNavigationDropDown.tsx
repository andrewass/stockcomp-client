import React, { useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import EventIcon from "@mui/icons-material/Event";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { darkTheme } from "../../theme/themes";
import SunnyIcon from "@mui/icons-material/Sunny";
import NightlightIcon from "@mui/icons-material/Nightlight";
import { useThemeContext } from "../../theme/AppThemeContext";
import NavigationButton from "../NavigationButton";

const DefaultNavigationDropDown = ({
  signOutUser,
}: {
  signOutUser: () => void;
}) => {
  const { toggleTheme, appTheme } = useThemeContext();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        height: "100px",
        backgroundColor: appTheme.palette.primary.main,
        backgroundImage: "none",
      }}
    >
      <Toolbar sx={{ height: "100%" }}>
        <Container
          sx={{
            display: "flex",
            width: "100%",
            height: "100%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              color: appTheme.palette.primary.contrastText,
              fontWeight: "bold",
              fontSize: "large",
            }}
          >
            STOCK COMP
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 6 }}>
            <IconButton
              sx={{ color: appTheme.palette.primary.contrastText }}
              onClick={toggleTheme}
            >
              {appTheme === darkTheme ? <SunnyIcon /> : <NightlightIcon />}
            </IconButton>
            <Box>
              <IconButton
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <MenuIcon
                  sx={{ color: appTheme.palette.primary.contrastText }}
                />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                sx={{
                  "& .MuiPaper-root": {
                    backgroundColor: appTheme.palette.secondary.main,
                    border: "1px solid",
                    borderRadius: 2,
                    backgroundImage: "none",
                    borderColor: appTheme.palette.primary.main,
                  },
                }}
              >
                <MenuItem onClick={handleClose}>
                  <NavigationButton
                    to="/symbols"
                    startIcon={<ShowChartIcon />}
                    text="Symbols"
                  />
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <NavigationButton
                    to="/leaderboard"
                    startIcon={<LeaderboardIcon />}
                    text="Leaderboard"
                  />
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <NavigationButton
                    to="/contests"
                    startIcon={<EventIcon />}
                    text="Contests"
                  />
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <NavigationButton
                    to="/account"
                    startIcon={<AccountCircleIcon />}
                    text="Account"
                  />
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Button
                    sx={{ color: appTheme.palette.primary.contrastText }}
                    size="large"
                    onClick={signOutUser}
                    startIcon={<LogoutIcon />}
                  >
                    Logout
                  </Button>
                </MenuItem>
              </Menu>
            </Box>
          </Box>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default DefaultNavigationDropDown;
