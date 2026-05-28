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
import ContestLeaderboardTable from "./ContestLeaderboardTable.tsx";
import ContestParticipantStatus from "./ContestParticipantStatus.tsx";

interface Props {
	contest: Contest;
	leaderboard: ContestLeaderboardPage;
	participantDetail: ContestParticipantDetail | null;
	pageSize: number;
	currentPage: number;
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

function getContestTimelineSummary(contest: Contest): string {
	switch (contest.contestStatus) {
		case "AWAITING_START":
			return `This contest starts on ${formatDateTimeValue(contest.startTime)}.`;
		case "RUNNING":
			return `This contest is running until ${formatDateTimeValue(contest.endTime)}.`;
		case "COMPLETED":
			return `This contest finished on ${formatDateTimeValue(contest.endTime)}.`;
		case "STOPPED":
			return "This contest has been stopped.";
		default:
			return "Contest timeline unavailable.";
	}
}

export default function ContestDetailView({
	contest,
	leaderboard,
	participantDetail,
	pageSize,
	currentPage,
}: Props) {
	const participantCount =
		contest.participantCount ?? leaderboard.totalEntriesCount;

	return (
		<div className="w-full max-w-6xl space-y-6">
			<section className="card border border-base-300 bg-base-100 shadow-sm">
				<div className="card-body gap-6">
					<div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
						<div className="space-y-2">
							<p className="text-sm font-medium uppercase tracking-[0.2em] text-base-content/60">
								Contest overview
							</p>
							<h1 className="text-3xl font-semibold text-base-content">
								{contest.contestName}
							</h1>
							<p className="max-w-2xl text-sm text-base-content/70">
								{getContestTimelineSummary(contest)}
							</p>
						</div>
						<div className={getStatusBadgeClassName(contest)}>
							{formatMappedLabel(contest.contestStatus, contestStatusRecord)}
						</div>
					</div>

					<div className="stats stats-vertical border border-base-300 bg-base-200/50 lg:stats-horizontal">
						<div className="stat">
							<div className="stat-title">Participants</div>
							<div className="stat-value text-3xl">
								{formatNumber(participantCount, {
									maximumFractionDigits: 2,
								})}
							</div>
						</div>
						<div className="stat">
							<div className="stat-title">Start</div>
							<div className="stat-value text-lg">
								{formatDateTimeValue(contest.startTime)}
							</div>
						</div>
						<div className="stat">
							<div className="stat-title">End</div>
							<div className="stat-value text-lg">
								{formatDateTimeValue(contest.endTime)}
							</div>
						</div>
					</div>
				</div>
			</section>

			{participantDetail && (
				<ContestParticipantStatus participantDetail={participantDetail} />
			)}

			<section className="space-y-4">
				<div className="space-y-1">
					<h2 className="text-xl font-semibold text-base-content">
						Leaderboard
					</h2>
					<p className="text-sm text-base-content/70">
						Participants are sorted by current ranking in this contest.
					</p>
				</div>
				<ContestLeaderboardTable
					participants={leaderboard.participants}
					contestId={contest.contestId}
					pageSize={pageSize}
					currentPage={currentPage}
					totalEntriesCount={leaderboard.totalEntriesCount}
				/>
			</section>
			<div aria-hidden="true" className="h-24" />
		</div>
	);
}
