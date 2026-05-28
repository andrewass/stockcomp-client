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
			<div className="flex justify-center px-4 pt-20 sm:px-6 lg:px-8">
				{children}
			</div>
		</>
	);
}
