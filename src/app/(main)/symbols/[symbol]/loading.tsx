import DetailLoadingState from "@/components/route-boundaries/DetailLoadingState.tsx";

export default function SymbolDetailsLoading() {
	return (
		<DetailLoadingState
			title="Loading symbol details"
			showBackAction={true}
			showSidebar={true}
		/>
	);
}
