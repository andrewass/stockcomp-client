import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { AuthProvider, useAuth } from "./auth/Auth";
import { queryClient } from "./config/queryConfig";
import { routeTree } from "./routeTree.gen";
import AppThemeProvider from "./theme/AppThemeProvider";

const router = createRouter({
	routeTree,
	context: {} as { auth: ReturnType<typeof useAuth> },
});

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

function InnerApp() {
	const auth = useAuth();
	return <RouterProvider router={router} context={{ auth }} />;
}

export default function App() {
	return (
		<AppThemeProvider>
			<LocalizationProvider dateAdapter={AdapterDateFns}>
				<QueryClientProvider client={queryClient}>
					<AuthProvider>
						<InnerApp />
					</AuthProvider>
					<ReactQueryDevtools initialIsOpen={false} />
				</QueryClientProvider>
			</LocalizationProvider>
		</AppThemeProvider>
	);
}
