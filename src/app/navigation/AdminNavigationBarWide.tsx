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

export default function AdminNavigationBarWide({ hasAdminRole }: Props) {
	const router = useRouter();

	const urlSuffix = "0?pageSize=10";

	return (
		<div className="navbar justify-center bg-base-300">
			<div className="flex flex-row mt-5 mb-5 w-2/4 justify-between">
				<div className="flex flex-row items-center gap-8">
					<BrandLink href="/" label="Stock Comp" subtitle="Admin Console" />
					<Link href={`/admin/contests/${urlSuffix}`}>Contests</Link>
					<Link href={`/admin/users/${urlSuffix}`}>Users</Link>
				</div>
				<div className="flex flex-row gap-8">
					{hasAdminRole && (
						<label
							className="toggle [--input-color:var(--color-base-content)]"
							title="Toggle admin mode"
						>
							<input
								type="checkbox"
								checked={true}
								onChange={(event) => {
									if (!event.target.checked) {
										router.replace("/");
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
