import { notFound } from "next/navigation";

import { parseParams } from "@/components/table/paginationParams.ts";
import ContestDetailView from "@/contests/detail/ContestDetailView.tsx";
import { getContestDetailPageData } from "@/contests/detail/contestDetailData.ts";
import { parseContestDetailTab } from "@/contests/detail/contestDetailTabs.ts";

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
	const activeTab = parseContestDetailTab(resolvedSearchParams.view);

	if (Number.isNaN(parsedContestId) || !parsedParams) {
		notFound();
	}

	const pageData = await getContestDetailPageData(
		parsedContestId,
		parsedParams.pageNumber,
		parsedParams.pageSize,
	);

	if (!pageData) {
		notFound();
	}

	return (
		<ContestDetailView
			contest={pageData.contest}
			leaderboard={pageData.leaderboard}
			participantDetail={pageData.participantDetail}
			pageSize={parsedParams.pageSize}
			currentPage={parsedParams.pageNumber}
			activeTab={activeTab}
		/>
	);
}
