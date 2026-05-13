import type { User } from "@/types/userTypes.ts";
import AdminUsersTable from "./AdminUsersTable.tsx";

interface Props {
	users: User[];
	pageSize: number;
	currentPage: number;
	totalEntriesCount: number;
}

export default function AdminUsersView({
	users,
	pageSize,
	currentPage,
	totalEntriesCount,
}: Props) {
	return (
		<div className="space-y-4">
			<div
				className="flex min-h-12 items-center justify-end"
				aria-hidden="true"
			/>
			<AdminUsersTable
				users={users}
				pageSize={pageSize}
				currentPage={currentPage}
				totalEntriesCount={totalEntriesCount}
			/>
		</div>
	);
}
