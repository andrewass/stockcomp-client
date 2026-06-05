import RouteNotFoundState from "@/components/route-boundaries/RouteNotFoundState.tsx";

export default function MainNotFound() {
	return (
		<RouteNotFoundState
			title="Page not found"
			message="The page you requested does not exist, is no longer available, or has invalid route parameters."
			href="/symbols"
			linkLabel="Go to symbols"
		/>
	);
}
