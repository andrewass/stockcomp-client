import AdminUsersTable from "@/admin/users/AdminUsersTable.tsx";
import type { User } from "@/user/userTypes.ts";
import { parseParams } from "@/util/PageableTableUtils.ts";

type UserPage = {
	entries: User[];
	totalEntriesCount: number;
};

async function getAdminUsersPlaceholder(
	pageNumber: number,
	pageSize: number,
): Promise<UserPage> {
	const users: User[] = [
		{
			username: "andreas",
			email: "andreas@example.com",
			userRole: "ADMIN",
			userStatus: "ACTIVE",
		},
		{
			username: "emma",
			email: "emma@example.com",
			userRole: "USER",
			userStatus: "ACTIVE",
		},
		{
			username: "oliver",
			email: "oliver@example.com",
			userRole: "USER",
			userStatus: "PENDING",
		},
		{
			username: "noah",
			email: "noah@example.com",
			userRole: "USER",
			userStatus: "SUSPENDED",
		},
		{
			username: "sophia",
			email: "sophia@example.com",
			userRole: "MODERATOR",
			userStatus: "ACTIVE",
		},
		{
			username: "liam",
			email: "liam@example.com",
			userRole: "USER",
			userStatus: "ACTIVE",
		},
		{
			username: "ava",
			email: "ava@example.com",
			userRole: "USER",
			userStatus: "INACTIVE",
		},
		{
			username: "mason",
			email: "mason@example.com",
			userRole: "USER",
			userStatus: "ACTIVE",
		},
	];

	const startIndex = (pageNumber - 1) * pageSize;

	return {
		entries: users.slice(startIndex, startIndex + pageSize),
		totalEntriesCount: users.length,
	};
}

export default async function AdminUsersPage({
	params,
	searchParams,
}: {
	params: Promise<{ page: string }>;
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
	const { page } = await params;
	const resolvedSearchParams = await searchParams;
	const parsedParams = parseParams(page, resolvedSearchParams);

	if (!parsedParams) {
		return <p>404: Page not found</p>;
	}

	// TODO: Replace with apiGet<UserPage>(...) when admin users API is ready.
	const usersResponse = await getAdminUsersPlaceholder(
		parsedParams.pageNumber,
		parsedParams.pageSize,
	);

	return (
		<div>
			<AdminUsersTable
				users={usersResponse.entries}
				pageSize={parsedParams.pageSize}
				currentPage={parsedParams.pageNumber}
				totalEntriesCount={usersResponse.totalEntriesCount}
			/>
		</div>
	);
}
