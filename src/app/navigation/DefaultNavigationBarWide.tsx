"use client";

import {
	LockClosedIcon,
	LockOpenIcon,
	MoonIcon,
	SunIcon,
	UserIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTheme } from "@/theme/useTheme.ts";

interface Props {
	hasAdminRole: boolean;
}

export default function DefaultNavigationBarWide({
	hasAdminRole,
}: Props) {
	const { activeTheme, toggleTheme } = useTheme();
	const router = useRouter();

	const urlSuffix = "1?pageSize=10";

	return (
		<div className="navbar justify-center bg-base-300">
			<div className="flex flex-row mt-5 mb-5 w-2/4 justify-between">
				<div className="flex flex-row gap-8">
					<Link href="/">Stock Comp</Link>
					<Link href="/symbols">Symbols</Link>
					<Link href={`/contests/${urlSuffix}`}>Contests</Link>
					<Link href={`/leaderboard/${urlSuffix}`}>
						<span>Leaderboard</span>
					</Link>
				</div>
				<div className="flex flex-row gap-8">
					{hasAdminRole && (
						<label className="toggle" title="Toggle admin mode">
							<input
								type="checkbox"
								defaultChecked
								onChange={(event) => {
									if (!event.target.checked) {
										router.push(`/`);
									}
								}}
							/>
							<LockOpenIcon />
							<LockClosedIcon />
						</label>
					)}
					<label className="toggle" title="Toggle theme">
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
