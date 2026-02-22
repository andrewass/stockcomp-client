import { MoonIcon, SunIcon, UserIcon } from "@heroicons/react/24/solid";
import Link from "next/dist/client/link";
import { useSession } from "next-auth/react";
import { useTheme } from "@/theme/useTheme.ts";
import { UserMode } from "../../config/UserMode.ts";

export default function AdminNavigationBarWide() {
	const { activeTheme, toggleTheme } = useTheme();
	const { update, data: session } = useSession();

	const urlSuffix = "1?pageSize=10";

	async function toggleMode() {
		await update({
			userMode:
				session?.userMode === UserMode.ADMIN
					? UserMode.DEFAULT
					: UserMode.ADMIN,
		});
	}

	return (
		<div className="navbar justify-center">
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
					<label className="label">
						<input
							type="checkbox"
							defaultChecked
							className="toggle"
							onChange={toggleMode}
						/>
						Admin
					</label>
					<UserIcon className="size-6" />
				</div>
			</div>
		</div>
	);
}
