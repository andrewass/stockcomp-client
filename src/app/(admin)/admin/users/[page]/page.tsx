import AdminUsersView from "@/admin/users/AdminUsersView.tsx";
import { getAdminUsers } from "@/admin/users/adminUsersData.ts";
import { parseParams } from "@/components/table/PageableTable.tsx";

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

	const usersResponse = await getAdminUsers(
		parsedParams.pageNumber,
		parsedParams.pageSize,
	);

	return (
		<div>
			<AdminUsersView
				users={usersResponse.entries}
				pageSize={parsedParams.pageSize}
				currentPage={parsedParams.pageNumber}
				totalEntriesCount={usersResponse.totalEntriesCount}
			/>
		</div>
	);
}
