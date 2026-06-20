import TableLoadingState from "@/components/route-boundaries/TableLoadingState.tsx";

export default function AdminUsersLoading() {
	return <TableLoadingState title="Loading admin users" columnCount={4} />;
}
