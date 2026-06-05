import RouteNotFoundState from "@/components/route-boundaries/RouteNotFoundState.tsx";

export default function AdminNotFound() {
	return (
		<RouteNotFoundState
			eyebrow="Admin"
			title="Admin page not found"
			message="The admin page you requested does not exist, is no longer available, or has invalid route parameters."
			href="/symbols"
			linkLabel="Go to symbols"
		/>
	);
}
