import { redirect } from "next/navigation";
import type React from "react";
import { getViewerHasAdminRole, requireViewerSession } from "@/lib/viewer.ts";
import AdminNavigationBarWide from "@/navigation/AdminNavigationBarWide.tsx";

export default async function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	await requireViewerSession("/admin");
	const hasAdminRole = await getViewerHasAdminRole();

	if (!hasAdminRole) {
		redirect("/");
	}

	return (
		<>
			<AdminNavigationBarWide hasAdminRole={true} />
			<div className="flex justify-center pt-20">{children}</div>
		</>
	);
}
