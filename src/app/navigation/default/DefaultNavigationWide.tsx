import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EventIcon from "@mui/icons-material/Event";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import LogoutIcon from "@mui/icons-material/Logout";
import NightlightIcon from "@mui/icons-material/Nightlight";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import SunnyIcon from "@mui/icons-material/Sunny";
import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";
import StyledLink from "@/components/link/StyledLink.tsx";
import { useThemeMode } from "@/theme/ThemeContext.ts";
import { darkTheme } from "@/theme/themes.ts";
import StyledIconButton from "../../../components/icon/StyledIconButton.tsx";

interface Props {
	signOutUser: () => void;
}

export default function DefaultNavigationWide({ signOutUser }: Props) {
	const { activeTheme, toggleTheme } = useThemeMode();
	return (
		<AppBar
			position="fixed"
			component="nav"
			sx={{
				height: "100px",
				backgroundColor: activeTheme.palette.primary.main,
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
							sx={{ color: activeTheme.palette.primary.contrastText }}
						>
							STOCK COMP
						</Typography>
						<StyledLink href={{ pathname: "/contests" }}>
							<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
								<EventIcon />
								<Typography component="span">Contests</Typography>
							</Box>
						</StyledLink>
						<StyledLink href={{ pathname: "/symbols" }}>
							<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
								<ShowChartIcon />
								<Typography component="span">Stocks</Typography>
							</Box>
						</StyledLink>
						<StyledLink href={{ pathname: "/leaderboard" }}>
							<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
								<LeaderboardIcon />
								<Typography component="span">Leaderboard</Typography>
							</Box>
						</StyledLink>
						<StyledLink href={{ pathname: "/account" }}>
							<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
								<AccountCircleIcon />
								<Typography component="span">Account</Typography>
							</Box>
						</StyledLink>
					</Box>
					<Box sx={{ display: "flex", alignItems: "center", gap: 6 }}>
						<StyledIconButton
							icon={
								activeTheme === darkTheme ? <SunnyIcon /> : <NightlightIcon />
							}
							onClick={toggleTheme}
						/>
						<StyledIconButton icon={<LogoutIcon />} onClick={signOutUser} />
					</Box>
				</Container>
			</Toolbar>
		</AppBar>
	);
}
