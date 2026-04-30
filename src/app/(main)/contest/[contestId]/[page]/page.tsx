import { getContestDetailPageData } from "@/contestdetail/contestDetailData.ts";
import ContestDetailView from "../../../../contestdetail/ContestDetailView.tsx";
import { parseParams } from "@/components/table/PageableTable.tsx";

export default async function ContestDetailPage({
	params,
	searchParams,
}: {
	params: Promise<{ contestId: string; page: string }>;
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
	const { contestId, page } = await params;
	const resolvedSearchParams = await searchParams;
	const parsedContestId = Number.parseInt(contestId, 10);
	const parsedParams = parseParams(page, resolvedSearchParams);

	if (Number.isNaN(parsedContestId) || !parsedParams) {
		return <p>404: Page not found</p>;
	}

	const pageData = await getContestDetailPageData(
		parsedContestId,
		parsedParams.pageNumber,
		parsedParams.pageSize,
	);

	if (!pageData) {
		return <p>404: Page not found</p>;
	}

	return (
		<ContestDetailView
			contest={pageData.contest}
			leaderboard={pageData.leaderboard}
			participantDetail={pageData.participantDetail}
			pageSize={parsedParams.pageSize}
			currentPage={parsedParams.pageNumber}
		/>
	);
}
