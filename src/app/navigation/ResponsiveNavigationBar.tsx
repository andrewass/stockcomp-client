"use client";

import {
	ArrowRightStartOnRectangleIcon,
	Bars3Icon,
	LockClosedIcon,
	LockOpenIcon,
	UserCircleIcon,
	UserIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { authClient } from "@/lib/auth-client.ts";
import BrandLink from "@/navigation/BrandLink.tsx";
import ThemeToggler from "@/navigation/ThemeToggler.tsx";

interface NavigationItem {
	activePathPrefix: string;
	href: string;
	label: string;
}

interface Props {
	brandSubtitle?: string;
	defaultHref: string;
	hasAdminRole: boolean;
	isAdminMode: boolean;
	items: NavigationItem[];
}

function isActivePath(pathname: string, activePathPrefix: string) {
	return (
		pathname === activePathPrefix || pathname.startsWith(`${activePathPrefix}/`)
	);
}

export default function ResponsiveNavigationBar({
	brandSubtitle,
	defaultHref,
	hasAdminRole,
	isAdminMode,
	items,
}: Props) {
	const pathname = usePathname();
	const router = useRouter();
	const [isSigningOut, startSignOutTransition] = useTransition();
	const [signOutError, setSignOutError] = useState<string | null>(null);
	const adminHref = "/admin/contests/0?pageSize=10";
	const adminToggleHref = isAdminMode ? defaultHref : adminHref;
	const adminToggleLabel = isAdminMode
		? "Leave admin mode"
		: "Enter admin mode";

	function handleSignOut() {
		setSignOutError(null);
		startSignOutTransition(async () => {
			const { error } = await authClient.signOut();
			if (error) {
				setSignOutError("Unable to sign out. Try again.");
				return;
			}

			router.replace("/signin");
			router.refresh();
		});
	}

	return (
		<div className="border-b border-base-content/10 bg-base-300">
			<div className="navbar mx-auto min-h-20 w-full max-w-7xl gap-2 px-3 sm:px-4 lg:px-6">
				<div className="navbar-start min-w-0 flex-1 gap-2">
					<div className="dropdown lg:hidden">
						<button
							type="button"
							tabIndex={0}
							className="btn btn-ghost btn-square"
							aria-label="Open navigation menu"
						>
							<Bars3Icon className="size-6" />
						</button>
						<ul className="menu menu-sm dropdown-content z-50 mt-3 w-72 rounded-lg bg-base-300 p-2 shadow-xl">
							{items.map((item) => {
								const active = isActivePath(pathname, item.activePathPrefix);

								return (
									<li key={item.href}>
										<Link
											href={item.href}
											aria-current={active ? "page" : undefined}
											className={active ? "active font-semibold" : undefined}
										>
											{item.label}
										</Link>
									</li>
								);
							})}
						</ul>
					</div>
					<BrandLink
						href={defaultHref}
						label="Stock Comp"
						subtitle={brandSubtitle}
					/>
				</div>

				<div className="navbar-center hidden lg:flex">
					<ul className="menu menu-horizontal gap-2 rounded-lg bg-transparent px-1.5 py-1 shadow-none">
						{items.map((item) => {
							const active = isActivePath(pathname, item.activePathPrefix);

							return (
								<li key={item.href}>
									<Link
										href={item.href}
										aria-current={active ? "page" : undefined}
										className="rounded-md px-4 text-[1.02rem] hover:bg-transparent focus:bg-transparent active:bg-transparent"
									>
										{item.label}
									</Link>
								</li>
							);
						})}
					</ul>
				</div>

				<div className="navbar-end flex-1 gap-1 sm:gap-2">
					{hasAdminRole && (
						<button
							type="button"
							onClick={() => router.replace(adminToggleHref)}
							className="btn btn-ghost btn-square rounded-lg"
							aria-label={adminToggleLabel}
							title={adminToggleLabel}
						>
							{isAdminMode ? (
								<LockClosedIcon className="size-5" />
							) : (
								<LockOpenIcon className="size-5" />
							)}
						</button>
					)}
					<div className="flex h-10 w-10 items-center justify-center">
						<ThemeToggler iconSize="size-5" />
					</div>
					<div className="dropdown dropdown-end">
						<button
							type="button"
							tabIndex={0}
							className="btn btn-ghost btn-square rounded-lg"
							aria-label="Open account menu"
							title="Account"
						>
							<UserIcon className="size-5" />
						</button>
						<ul className="menu dropdown-content z-50 mt-3 w-56 rounded-lg bg-base-300 p-2 shadow-xl">
							<li>
								<Link href="/account">
									<UserCircleIcon className="size-4" />
									Account
								</Link>
							</li>
							<li>
								<button
									type="button"
									onClick={handleSignOut}
									disabled={isSigningOut}
								>
									<ArrowRightStartOnRectangleIcon className="size-4" />
									{isSigningOut ? "Signing out..." : "Sign out"}
								</button>
							</li>
							{signOutError && (
								<li className="px-3 py-2 text-sm text-error">{signOutError}</li>
							)}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}
