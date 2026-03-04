import type React from "react";
import DefaultNavigationBarWide from "@/navigation/DefaultNavigationBarWide.tsx";

export default function MainLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<DefaultNavigationBarWide />
			<div className="flex justify-center pt-20">{children}</div>
		</>
	);
}
