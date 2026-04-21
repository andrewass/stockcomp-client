"use client";

import ResponsiveNavigationBar from "@/navigation/ResponsiveNavigationBar.tsx";

interface Props {
	hasAdminRole: boolean;
}

export default function DefaultNavigationBarWide({ hasAdminRole }: Props) {
	const urlSuffix = "0?pageSize=10";

	return (
		<ResponsiveNavigationBar
			defaultHref="/"
			hasAdminRole={hasAdminRole}
			isAdminMode={false}
			items={[
				{
					activePathPrefix: "/symbols",
					href: "/symbols",
					label: "Symbols",
				},
				{
					activePathPrefix: "/contests",
					href: `/contests/${urlSuffix}`,
					label: "Contests",
				},
				{
					activePathPrefix: "/leaderboard",
					href: `/leaderboard/${urlSuffix}`,
					label: "Leaderboard",
				},
			]}
		/>
	);
}
