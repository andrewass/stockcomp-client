import type { Metadata } from "next";
import type React from "react";
import "./globals.css";
import AppProviders from "@/providers/AppProviders.tsx";
import NavigationBar from "./navigation/NavigationBar";

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
				<AppProviders>
					<NavigationBar />
					<div className="flex justify-center pt-20">{children}</div>
				</AppProviders>
			</body>
		</html>
	);
}
