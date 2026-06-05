import RouteLoadingState from "@/components/route-boundaries/RouteLoadingState.tsx";

export default function AdminLoading() {
	return (
		<RouteLoadingState
			eyebrow="Admin"
			title="Loading admin page"
			showActionSkeleton={true}
		/>
	);
}
