import type {
	ContestLeaderboardPage,
	ContestParticipantDetail,
} from "@/domain/contests/contestParticipantTypes.ts";
import {
	type Contest,
	contestStatusRecord,
	getStatusByColor,
} from "@/domain/contests/contestTypes.ts";
import {
	formatDateTimeValue,
	formatMappedLabel,
	formatNumber,
} from "@/lib/formatters.ts";
import ContestDetailTabs from "./ContestDetailTabs.tsx";
import ContestParticipantStatus from "./ContestParticipantStatus.tsx";
import type { ContestDetailTab } from "./contestDetailTabs.ts";

interface Props {
	contest: Contest;
	leaderboard: ContestLeaderboardPage;
	participantDetail: ContestParticipantDetail | null;
	pageSize: number;
	currentPage: number;
	activeTab: ContestDetailTab;
}

function getStatusBadgeClassName(contest: Contest): string {
	switch (getStatusByColor(contest)) {
		case "green":
			return "badge badge-success badge-outline";
		case "yellow":
			return "badge badge-warning badge-outline";
		case "grey":
			return "badge badge-neutral badge-outline";
		default:
			return "badge badge-error badge-outline";
	}
}

export default function ContestDetailView({
	contest,
	leaderboard,
	participantDetail,
	pageSize,
	currentPage,
	activeTab,
}: Props) {
	const participantCount =
		contest.participantCount ?? leaderboard.totalEntriesCount;

	return (
		<div className="w-full max-w-6xl space-y-7">
			<section className="card border border-base-300 bg-base-100 shadow-sm">
				<div className="card-body gap-5">
					<div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
						<div className="min-w-0 space-y-1.5">
							<p className="text-sm font-medium uppercase tracking-[0.2em] text-base-content/60">
								Contest
							</p>
							<h1 className="break-words text-3xl font-semibold text-balance text-base-content">
								{contest.contestName}
							</h1>
						</div>
						<div className={getStatusBadgeClassName(contest)}>
							{formatMappedLabel(contest.contestStatus, contestStatusRecord)}
						</div>
					</div>

					<dl className="flex flex-wrap gap-x-6 gap-y-3 border-t border-base-300 pt-4 text-sm">
						<div className="flex items-baseline gap-2">
							<dt className="text-base-content/55">Starts</dt>
							<dd className="font-medium tabular-nums text-base-content">
								{formatDateTimeValue(contest.startTime)}
							</dd>
						</div>
						<div className="flex items-baseline gap-2">
							<dt className="text-base-content/55">Ends</dt>
							<dd className="font-medium tabular-nums text-base-content">
								{formatDateTimeValue(contest.endTime)}
							</dd>
						</div>
						<div className="flex items-baseline gap-2">
							<dt className="text-base-content/55">Participants</dt>
							<dd className="font-medium tabular-nums text-base-content">
								{formatNumber(participantCount, {
									maximumFractionDigits: 2,
								})}
							</dd>
						</div>
					</dl>
				</div>
			</section>

			{participantDetail && (
				<ContestParticipantStatus
					participantDetail={participantDetail}
					participantCount={participantCount}
				/>
			)}

			<ContestDetailTabs
				activeTab={activeTab}
				contestId={contest.contestId}
				leaderboard={leaderboard}
				participantDetail={participantDetail}
				pageSize={pageSize}
				currentPage={currentPage}
			/>
			<div aria-hidden="true" className="h-24" />
		</div>
	);
}
