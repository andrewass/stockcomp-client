import { notFound } from "next/navigation";

import { parseParams } from "@/components/table/paginationParams.ts";
import ContestView from "@/contests/overview/ContestView.tsx";
import { getContests } from "@/contests/overview/contestsData.ts";

export default async function ContestsPage({
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

	const contestsResponse = await getContests(
		parsedParams.pageNumber,
		parsedParams.pageSize,
	);

	return (
		<div>
			<ContestView
				contests={contestsResponse.contests}
				pageSize={parsedParams.pageSize}
				currentPage={parsedParams.pageNumber}
				totalEntriesCount={contestsResponse.totalEntriesCount}
			/>
		</div>
	);
}
