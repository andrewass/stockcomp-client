import type React from "react";
import { getViewerHasAdminRole, requireViewerSession } from "@/lib/viewer.ts";
import DefaultNavigationBarWide from "@/navigation/DefaultNavigationBarWide.tsx";

export default async function MainLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	await requireViewerSession();
	const hasAdminRole = await getViewerHasAdminRole();

	return (
		<>
			<DefaultNavigationBarWide hasAdminRole={hasAdminRole} />
			<div className="flex justify-center pt-20">{children}</div>
		</>
	);
}
