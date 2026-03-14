import { redirect } from "next/navigation";
import type React from "react";
import { apiGet } from "@/api/apiWrapper.ts";
import AdminNavigationBarWide from "@/navigation/AdminNavigationBarWide.tsx";

export default async function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const hasAdminRole = await apiGet<boolean>({ url: "/users/admin" });
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
