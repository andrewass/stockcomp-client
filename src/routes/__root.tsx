import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import type { AuthContext } from "../auth/Auth";
import { CLIENT_BACKEND_BASE_URL } from "../config/properties";

interface MyRouterContext {
	auth: AuthContext;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
	beforeLoad: async ({ context }) => {
		const response = await context.auth.isAuthenticated();
		if (!response.validSession) {
			window.location.href = `${CLIENT_BACKEND_BASE_URL}/auth/login`;
		}
	},
	component: () => (
		<>
			<Outlet />
			<TanStackRouterDevtools />
		</>
	),
});
