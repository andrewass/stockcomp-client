"use client";

import {
	ChartBarIcon,
	PresentationChartLineIcon,
	TrophyIcon,
} from "@heroicons/react/24/outline";
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
					icon: PresentationChartLineIcon,
					label: "Symbols",
				},
				{
					activePathPrefix: "/contests",
					href: `/contests/${urlSuffix}`,
					icon: TrophyIcon,
					label: "Contests",
				},
				{
					activePathPrefix: "/leaderboard",
					href: `/leaderboard/${urlSuffix}`,
					icon: ChartBarIcon,
					label: "Leaderboard",
				},
			]}
		/>
	);
}
