import React from "react";
import { Metadata } from "next";
import AppThemeProvider from "../theme/AppThemeProvider.tsx";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {QueryClientProvider} from "@tanstack/react-query";
import {queryClient} from "../config/queryConfig.ts";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

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
				<div id="root">
                    <AppThemeProvider>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <QueryClientProvider client={queryClient}>
                                {children}
                                <ReactQueryDevtools initialIsOpen={false} />
                            </QueryClientProvider>
                        </LocalizationProvider>
                    </AppThemeProvider>{children}</div>
			</body>
		</html>
	);
}
