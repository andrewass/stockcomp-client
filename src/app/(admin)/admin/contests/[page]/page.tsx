import AdminContestsTable from "@/admin/contests/AdminContestsTable.tsx";
import {
	CONTEST_STATUS,
	type Contest,
	type ContestPage,
} from "@/contest/contestTypes.ts";
import { parseParams } from "@/util/PageableTableUtils.ts";

async function getAdminContestsPlaceholder(
	pageNumber: number,
	pageSize: number,
): Promise<ContestPage> {
	const contests: Contest[] = [
		{
			contestId: 101,
			contestName: "Nordic Momentum Sprint",
			startTime: "2026-03-01T08:00:00.000Z",
			endTime: "2026-03-31T20:00:00.000Z",
			contestStatus: CONTEST_STATUS.RUNNING,
			participantCount: 42,
		},
		{
			contestId: 102,
			contestName: "Tech Earnings Challenge",
			startTime: "2026-02-10T08:00:00.000Z",
			endTime: "2026-03-10T20:00:00.000Z",
			contestStatus: CONTEST_STATUS.COMPLETED,
			participantCount: 58,
		},
		{
			contestId: 103,
			contestName: "Green Energy Cup",
			startTime: "2026-04-05T08:00:00.000Z",
			endTime: "2026-05-05T20:00:00.000Z",
			contestStatus: CONTEST_STATUS.AWAITING_START,
			participantCount: 31,
		},
		{
			contestId: 104,
			contestName: "Quarterly Macro Duel",
			startTime: "2026-01-05T08:00:00.000Z",
			endTime: "2026-01-30T20:00:00.000Z",
			contestStatus: CONTEST_STATUS.STOPPED,
			participantCount: 18,
		},
		{
			contestId: 105,
			contestName: "Blue Chip Marathon",
			startTime: "2026-03-12T08:00:00.000Z",
			endTime: "2026-04-12T20:00:00.000Z",
			contestStatus: CONTEST_STATUS.RUNNING,
			participantCount: 64,
		},
		{
			contestId: 106,
			contestName: "Commodities Pulse",
			startTime: "2026-02-18T08:00:00.000Z",
			endTime: "2026-03-20T20:00:00.000Z",
			contestStatus: CONTEST_STATUS.RUNNING,
			participantCount: 27,
		},
	];

	const startIndex = (pageNumber - 1) * pageSize;

	return {
		contests: contests.slice(startIndex, startIndex + pageSize),
		totalEntriesCount: contests.length,
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
	const contestsResponse = await getAdminContestsPlaceholder(
		parsedParams.pageNumber,
		parsedParams.pageSize,
	);

	return (
		<div>
			<AdminContestsTable
				contests={contestsResponse.contests}
				pageSize={parsedParams.pageSize}
				currentPage={parsedParams.pageNumber}
				totalEntriesCount={contestsResponse.totalEntriesCount}
			/>
		</div>
	);
}
