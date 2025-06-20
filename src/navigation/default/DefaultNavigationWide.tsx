import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";
import NavigationLink from "../NavigationLink";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import EventIcon from "@mui/icons-material/Event";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { darkTheme } from "../../theme/themes";
import SunnyIcon from "@mui/icons-material/Sunny";
import NightlightIcon from "@mui/icons-material/Nightlight";
import LogoutIcon from "@mui/icons-material/Logout";
import { useThemeContext } from "../../theme/AppThemeContext";
import StyledIconButton from "../../components/icon/StyledIconButton";

export default function DefaultNavigationWide({
  signOutUser,
}: {
  signOutUser: () => void;
}) {
  const { toggleTheme, appTheme } = useThemeContext();

  return (
    <AppBar
      position="fixed"
      component="nav"
      sx={{
        height: "100px",
        backgroundColor: appTheme.palette.primary.main,
        backgroundImage: "none",
      }}
    >
      <Toolbar sx={{ height: "100%" }}>
        <Container
          maxWidth="xl"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            height: "100%",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Typography
              variant="h5"
              sx={{ color: appTheme.palette.primary.contrastText }}
            >
              STOCK COMP
            </Typography>
            <NavigationLink
              to="/symbols"
              icon={<ShowChartIcon />}
              text="Stocks"
            />
            <NavigationLink
              to="/leaderboard"
              icon={<LeaderboardIcon />}
              text="Leaderboard"
            />
            <NavigationLink
              to="/contests"
              icon={<EventIcon />}
              text="Contests"
            />
            <NavigationLink
              to="/account"
              icon={<AccountCircleIcon />}
              text="Account"
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 6 }}>
            <StyledIconButton
              icon={appTheme === darkTheme ? <SunnyIcon /> : <NightlightIcon />}
              onClick={toggleTheme}
            />
            <StyledIconButton icon={<LogoutIcon />} onClick={signOutUser} />
          </Box>
        </Container>
      </Toolbar>
    </AppBar>
  );
}
