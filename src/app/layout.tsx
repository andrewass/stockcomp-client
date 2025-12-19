import React from "react";
import { Metadata } from "next";
import ThemeRegistry from "../theme/ThemeRegistry.tsx";

export const metadata: Metadata = {
	title: "Stock Comp",
	description: "Stock Comp is a web app for arranging stock trade contests.",
};

/**
 *             <AppThemeProvider>
 *                 <QueryClientProvider client={queryClient}>
 *                     {children}
 *                     <ReactQueryDevtools initialIsOpen={false}/>
 *                 </QueryClientProvider>
 *             </AppThemeProvider>{children}</div>
 * @param children
 * @constructor
 */

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>
				<ThemeRegistry>{children}</ThemeRegistry>
			</body>
		</html>
	);
}
