import AdminContestsView from "@/admin/contests/AdminContestsView.tsx";
import type { ContestPage } from "@/contest/contestTypes.ts";
import { parseParams } from "@/components/table/PageableTable.tsx";

async function getAdminContestsPlaceholder(): Promise<ContestPage> {
	return {
		contests: [],
		totalEntriesCount: 0,
	};
}

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
		return <p>404: Page not found</p>;
	}

	// TODO: Replace with apiGet<ContestPage>(...) when admin contests API is ready.
	const contestsResponse = await getAdminContestsPlaceholder();

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
