import type React from "react";

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex justify-center px-4 pt-20 sm:px-6 lg:px-8">
			{children}
		</div>
	);
}
