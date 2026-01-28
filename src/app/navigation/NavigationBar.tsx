"use client";

import { MoonIcon, SunIcon, UserIcon } from "@heroicons/react/24/solid";
import Link from "next/dist/client/link";
import { useTheme } from "@/theme/useTheme.ts";

export default function NavigationBar() {
	const { activeTheme, toggleTheme } = useTheme();

	const urlSuffix = "1?pageSize=10";
	return (
		<div className="navbar justify-center">
			<div className="flex flex-row ml-30 mr-40 mt-5 mb-5 w-3/4 justify-between">
				<div className="flex flex-row gap-8">
					<Link href="/">Stock Comp</Link>
					<Link href="/symbols">Symbols</Link>
					<Link href={`/contests/${urlSuffix}`}>Contests</Link>
					<Link href={`/leaderboard/${urlSuffix}`}>
						<span>Leaderboard</span>
					</Link>
				</div>
				<div className="flex flex-row gap-8">
					<label className="toggle">
						<input
							type="checkbox"
							value={activeTheme}
							className="theme-controller"
							onChange={toggleTheme}
						/>
						<SunIcon />
						<MoonIcon />
					</label>
					<UserIcon className="size-6" />
				</div>
			</div>
		</div>
	);
}
