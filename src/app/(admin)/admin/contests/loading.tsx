import TableLoadingState from "@/components/route-boundaries/TableLoadingState.tsx";

export default function AdminContestsLoading() {
	return (
		<TableLoadingState
			title="Loading admin contests"
			columnCount={7}
			showActionSkeleton={true}
		/>
	);
}
