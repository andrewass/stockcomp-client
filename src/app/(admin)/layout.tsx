import { unstable_rethrow } from "next/navigation";
import type React from "react";
import AdminAccessUnavailable from "@/admin/AdminAccessUnavailable.tsx";
import {
	isViewerAdminRoleUnavailableError,
	requireViewerAdminRole,
} from "@/lib/viewer.ts";
import AdminNavigationBarWide from "@/navigation/AdminNavigationBarWide.tsx";

export default async function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	try {
		await requireViewerAdminRole("/admin");
	} catch (error) {
		unstable_rethrow(error);

		if (isViewerAdminRoleUnavailableError(error)) {
			return <AdminAccessUnavailable />;
		}

		throw error;
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
