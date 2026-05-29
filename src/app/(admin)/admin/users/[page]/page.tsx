import { notFound } from "next/navigation";

import AdminUsersView from "@/admin/users/AdminUsersView.tsx";
import { getAdminUsers } from "@/admin/users/adminUsersData.ts";
import { parseParams } from "@/components/table/paginationParams.ts";

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
		notFound();
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
