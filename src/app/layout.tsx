import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Stock Comp",
	description: "Stock Comp is a web app for arranging stock trade contests.",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>
				<div id="root">{children}</div>
			</body>
		</html>
	);
}
