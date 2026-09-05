"use client";

import { TrophyIcon, UsersIcon } from "@heroicons/react/24/outline";
import ResponsiveNavigationBar from "@/navigation/ResponsiveNavigationBar.tsx";

interface Props {
	hasAdminRole: boolean;
}

export default function AdminNavigationBarWide({ hasAdminRole }: Props) {
	const urlSuffix = "0?pageSize=10";

	return (
		<ResponsiveNavigationBar
			brandSubtitle="Admin Console"
			defaultHref="/"
			hasAdminRole={hasAdminRole}
			isAdminMode={true}
			items={[
				{
					activePathPrefix: "/admin/contests",
					href: `/admin/contests/${urlSuffix}`,
					icon: TrophyIcon,
					label: "Contests",
				},
				{
					activePathPrefix: "/admin/users",
					href: `/admin/users/${urlSuffix}`,
					icon: UsersIcon,
					label: "Users",
				},
			]}
		/>
	);
}
