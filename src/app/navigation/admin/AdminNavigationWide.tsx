import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EventIcon from "@mui/icons-material/Event";
import LogoutIcon from "@mui/icons-material/Logout";
import NightlightIcon from "@mui/icons-material/Nightlight";
import PeopleIcon from "@mui/icons-material/People";
import SunnyIcon from "@mui/icons-material/Sunny";
import {
	AppBar,
	Box,
	Container,
	type Theme,
	Toolbar,
	Typography,
} from "@mui/material";
import Link from "next/link";
import StyledIconButton from "../../../components/icon/StyledIconButton.tsx";
import { useThemeMode } from "../../../theme/ThemeContext.ts";
import { darkTheme } from "../../../theme/themes.ts";

interface Props {
	signOutUser: () => void;
	theme: Theme;
}

export default function AdminNavigationWide({ signOutUser }: Props) {
	const { toggleTheme, activeTheme } = useThemeMode();

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
							STOCK COMP ADMIN
						</Typography>
						<Link href="/admin/contests">
							<div>
								<EventIcon />
								<span>Contests</span>
							</div>
						</Link>
						<Link href="/admin/users">
							<div>
								<PeopleIcon />
								<span>Users</span>
							</div>
						</Link>
						<Link href="/account">
							<div>
								<AccountCircleIcon />
								<span>Account</span>
							</div>
						</Link>
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
