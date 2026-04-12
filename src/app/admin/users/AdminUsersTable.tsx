import PageableTable from "@/components/table/PageableTable.tsx";
import type { User } from "@/types/userTypes.ts";

interface Props {
	users: User[];
	pageSize: number;
	currentPage: number;
	totalEntriesCount: number;
}

const userTableHeaderItems = ["Username", "Email", "Role", "Status"];

type UserTableEntry = User & {
	id: string;
};

export default function AdminUsersTable({
	users,
	pageSize,
	currentPage,
	totalEntriesCount,
}: Props) {
	return (
		<div>
			<PageableTable<UserTableEntry>
				items={users.map((user) => ({
					...user,
					id: user.email,
				}))}
				pageSize={pageSize}
				currentPage={currentPage}
				totalEntriesCount={totalEntriesCount}
				basePath="/admin/users/"
				headerItems={userTableHeaderItems}
				renderRow={(user) => (
					<tr key={user.id}>
						<td>{user.username}</td>
						<td>{user.email}</td>
						<td>{user.userRole}</td>
						<td>{user.userStatus}</td>
					</tr>
				)}
			/>
		</div>
	);
}
