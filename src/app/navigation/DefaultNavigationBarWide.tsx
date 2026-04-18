"use client";

import {
	LockClosedIcon,
	LockOpenIcon,
	UserIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { useRouter } from "next/navigation";
import BrandLink from "@/navigation/BrandLink.tsx";
import ThemeToggler from "@/navigation/ThemeToggler.tsx";

interface Props {
	hasAdminRole: boolean;
}

export default function DefaultNavigationBarWide({ hasAdminRole }: Props) {
	const router = useRouter();

	const urlSuffix = "0?pageSize=10";
	const adminRoute = `/admin/contests/${urlSuffix}`;

	return (
		<div className="navbar justify-center bg-base-300">
			<div className="mt-5 mb-5 flex w-2/4 flex-row items-center justify-between">
				<div className="flex flex-row items-center gap-8">
					<BrandLink href="/" label="Stock Comp" subtitle="Portfolio Arena" />
					<Link href="/symbols">Symbols</Link>
					<Link href={`/contests/${urlSuffix}`}>Contests</Link>
					<Link href={`/leaderboard/${urlSuffix}`}>
						<span>Leaderboard</span>
					</Link>
				</div>
				<div className="flex flex-row items-center gap-8">
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
