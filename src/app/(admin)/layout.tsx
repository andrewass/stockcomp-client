import type React from "react";
import AdminNavigationBarWide from "@/navigation/AdminNavigationBarWide.tsx";

export default function AdminLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<AdminNavigationBarWide />
			<div className="flex justify-center pt-20">{children}</div>
		</>
	);
}
