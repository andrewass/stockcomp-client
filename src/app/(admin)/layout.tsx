import { redirect } from "next/navigation";
import type React from "react";
import { apiGet, isUnauthenticatedError } from "@/api/apiWrapper.ts";
import AdminNavigationBarWide from "@/navigation/AdminNavigationBarWide.tsx";

export default async function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	let hasAdminRole = false;
	try {
		hasAdminRole = await apiGet<boolean>({ url: "/users/admin" });
	} catch (error) {
		if (isUnauthenticatedError(error)) {
			redirect("/signin");
		}
		throw error;
	}

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
