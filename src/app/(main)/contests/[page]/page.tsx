import { parseParams } from "@/components/table/PageableTable.tsx";
import ContestView from "@/contests/ContestView.tsx";
import { getContests } from "@/contests/contestsData.ts";

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
		return <p>404: Page not found</p>;
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
