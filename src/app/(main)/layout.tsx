import type React from "react";
import {
	getViewerAdminRoleStatus,
	requireViewerSession,
} from "@/lib/viewer.ts";
import DefaultNavigationBarWide from "@/navigation/DefaultNavigationBarWide.tsx";

export default async function MainLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	await requireViewerSession();
	const adminRoleStatus = await getViewerAdminRoleStatus();

	return (
		<>
			<DefaultNavigationBarWide hasAdminRole={adminRoleStatus === "admin"} />
			<div className="flex justify-center px-4 pt-20 sm:px-6 lg:px-8">
				{children}
			</div>
		</>
	);
}
