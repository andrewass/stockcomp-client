"use client";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EventIcon from "@mui/icons-material/Event";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import NightlightIcon from "@mui/icons-material/Nightlight";
import ShowChartIcon from "@mui/icons-material/ShowChart";
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
import Link from "next/link";
import type React from "react";
import { useState } from "react";
import { useThemeMode } from "@/theme/ThemeContext.ts";
import { darkTheme } from "@/theme/themes.ts";

interface Props {
	signOutUser: () => void;
}

export function DefaultNavigationDropDown({ signOutUser }: Props) {
	const { activeTheme, toggleTheme } = useThemeMode();
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
				backgroundColor: activeTheme.palette.primary.main,
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
							color: activeTheme.palette.primary.contrastText,
							fontWeight: "bold",
							fontSize: "large",
						}}
					>
						STOCK COMP
					</Typography>

					<Box sx={{ display: "flex", alignItems: "center", gap: 6 }}>
						<IconButton
							sx={{ color: activeTheme.palette.primary.contrastText }}
							onClick={toggleTheme}
						>
							{activeTheme === darkTheme ? <SunnyIcon /> : <NightlightIcon />}
						</IconButton>
						<IconButton
							sx={{ color: activeTheme.palette.primary.contrastText }}
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
									sx={{ color: activeTheme.palette.primary.contrastText }}
								/>
							</IconButton>
							<Menu
								anchorEl={anchorEl}
								open={open}
								onClose={handleClose}
								sx={{
									"& .MuiPaper-root": {
										backgroundColor: activeTheme.palette.secondary.main,
										border: "1px solid",
										borderRadius: 2,
										backgroundImage: "none",
										borderColor: activeTheme.palette.primary.main,
									},
								}}
							>
								<MenuItem onClick={handleClose}>
									<Link href="/symbols">
										<div>
											<ShowChartIcon />
											<span>Symbols</span>
										</div>
									</Link>
								</MenuItem>
								<MenuItem onClick={handleClose}>
									<Link href="/leaderboard">
										<div>
											<LeaderboardIcon />
											<span>Leaderboard</span>
										</div>
									</Link>
								</MenuItem>
								<MenuItem onClick={handleClose}>
									<Link href="/contests">
										<div>
											<EventIcon />
											<span>Contests</span>
										</div>
									</Link>
								</MenuItem>
								<MenuItem onClick={handleClose}>
									<Link href="/account">
										<div>
											<AccountCircleIcon />
											<span>Account</span>
										</div>
									</Link>
								</MenuItem>
							</Menu>
						</Box>
					</Box>
				</Container>
			</Toolbar>
		</AppBar>
	);
}

export default DefaultNavigationDropDown;
