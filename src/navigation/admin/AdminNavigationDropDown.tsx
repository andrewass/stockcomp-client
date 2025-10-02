import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EventIcon from "@mui/icons-material/Event";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import NightlightIcon from "@mui/icons-material/Nightlight";
import PeopleIcon from "@mui/icons-material/People";
import SunnyIcon from "@mui/icons-material/Sunny";
import {
	AppBar,
	Box,
	Container,
	IconButton,
	Menu,
	MenuItem,
	Toolbar,
	Typography,
} from "@mui/material";
import type React from "react";
import { useState } from "react";
import { useThemeContext } from "../../theme/AppThemeContext";
import { darkTheme } from "../../theme/themes";
import NavigationLink from "../NavigationLink";

interface Props {
	signOutUser: () => void;
}

export default function AdminNavigationDropDown({ signOutUser }: Props) {
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
						STOCK COMP ADMIN
					</Typography>

					<Box sx={{ display: "flex", alignItems: "center", gap: 6 }}>
						<IconButton
							sx={{ color: appTheme.palette.primary.contrastText }}
							onClick={toggleTheme}
						>
							{appTheme === darkTheme ? <SunnyIcon /> : <NightlightIcon />}
						</IconButton>
						<IconButton
							sx={{ color: appTheme.palette.primary.contrastText }}
							onClick={signOutUser}
						>
							{<LogoutIcon />}
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
									<NavigationLink
										to="/admin/contests"
										icon={<EventIcon />}
										text="Contests"
									/>
								</MenuItem>
								<MenuItem onClick={handleClose}>
									<NavigationLink
										to="/admin/users"
										icon={<PeopleIcon />}
										text="Users"
									/>
								</MenuItem>
								<MenuItem onClick={handleClose}>
									<NavigationLink
										to="/account"
										icon={<AccountCircleIcon />}
										text="Account"
									/>
								</MenuItem>
							</Menu>
						</Box>
					</Box>
				</Container>
			</Toolbar>
		</AppBar>
	);
}
