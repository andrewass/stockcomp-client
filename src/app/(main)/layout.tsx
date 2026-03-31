import { redirect } from "next/navigation";
import type React from "react";
import { apiGet, isUnauthenticatedError } from "@/api/apiWrapper.ts";
import DefaultNavigationBarWide from "@/navigation/DefaultNavigationBarWide.tsx";

export default async function MainLayout({
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

	return (
		<>
			<DefaultNavigationBarWide hasAdminRole={hasAdminRole} />
			<div className="flex justify-center pt-20">{children}</div>
		</>
	);
}
