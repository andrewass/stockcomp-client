import DataTable, { TableFrame } from "@/components/table/DataTable.tsx";
import UrlTablePager from "@/components/table/UrlTablePager.tsx";
import type { User } from "@/domain/user/userTypes.ts";

interface Props {
	users: User[];
	pageSize: number;
	currentPage: number;
	totalEntriesCount: number;
}

const userTableHeaderItems = ["Username", "Email", "Role", "Status"];

export default function AdminUsersTable({
	users,
	pageSize,
	currentPage,
	totalEntriesCount,
}: Props) {
	return (
		<TableFrame>
			<DataTable
				items={users}
				headerItems={userTableHeaderItems}
				renderRow={(user) => (
					<tr key={user.email}>
						<td>{user.username}</td>
						<td>{user.email}</td>
						<td>{user.userRole}</td>
						<td>{user.userStatus}</td>
					</tr>
				)}
			/>
			<UrlTablePager
				currentPage={currentPage}
				pageSize={pageSize}
				totalEntriesCount={totalEntriesCount}
				basePath="/admin/users/"
			/>
		</TableFrame>
	);
}
