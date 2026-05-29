import { notFound } from "next/navigation";

import AdminContestsView from "@/admin/contests/list/AdminContestsView.tsx";
import { getAdminContests } from "@/admin/contests/list/adminContestsData.ts";
import { parseParams } from "@/components/table/paginationParams.ts";

export default async function AdminContestsPage({
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

	const contestsResponse = await getAdminContests(
		parsedParams.pageNumber,
		parsedParams.pageSize,
	);

	return (
		<div>
			<AdminContestsView
				contests={contestsResponse.contests}
				pageSize={parsedParams.pageSize}
				currentPage={parsedParams.pageNumber}
				totalEntriesCount={contestsResponse.totalEntriesCount}
			/>
		</div>
	);
}
