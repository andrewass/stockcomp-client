"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import type React from "react";
import { useState } from "react";

const ReactQueryDevtools =
	process.env.NODE_ENV === "development"
		? dynamic(
				() =>
					import("@tanstack/react-query-devtools").then(
						(module) => module.ReactQueryDevtools,
					),
				{ ssr: false },
			)
		: null;

export default function AppProviders({
	children,
}: {
	children: React.ReactNode;
}) {
	// Create a new QueryClient instance for each user session
	// This prevents sharing state between different users on the server
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						staleTime: 1000 * 60, // 1 minute
						gcTime: 1000 * 60 * 5, // 5 minutes
						refetchOnWindowFocus: false,
						retry: 1,
					},
				},
			}),
	);

	return (
		<QueryClientProvider client={queryClient}>
			{children}
			{ReactQueryDevtools ? <ReactQueryDevtools initialIsOpen={false} /> : null}
		</QueryClientProvider>
	);
}
