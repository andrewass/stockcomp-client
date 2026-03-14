import type React from "react";
import { apiGet } from "@/api/apiWrapper.ts";
import DefaultNavigationBarWide from "@/navigation/DefaultNavigationBarWide.tsx";

export default async function MainLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const hasAdminRole = await apiGet<boolean>({ url: "/users/admin" });

	return (
		<>
			<DefaultNavigationBarWide hasAdminRole={hasAdminRole} />
			<div className="flex justify-center pt-20">{children}</div>
		</>
	);
}
