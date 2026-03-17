"use client";

import {
	LockClosedIcon,
	LockOpenIcon,
	UserIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ThemeToggler from "@/navigation/ThemeToggler.tsx";

interface Props {
	hasAdminRole: boolean;
}

export default function DefaultNavigationBarWide({ hasAdminRole }: Props) {
	const router = useRouter();

	const urlSuffix = "1?pageSize=10";
	const adminRoute = `/admin/contests/${urlSuffix}`;

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
						<label
							className="toggle [--input-color:var(--color-base-content)]"
							title="Toggle admin mode"
						>
							<input
								type="checkbox"
								checked={false}
								onChange={(event) => {
									if (event.target.checked) {
										router.replace(adminRoute);
									}
								}}
							/>
							<LockOpenIcon />
							<LockClosedIcon />
						</label>
					)}
					<ThemeToggler iconSize="size-5" />
					<UserIcon className="size-6" />
				</div>
			</div>
		</div>
	);
}
