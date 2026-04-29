import ContestLeaderboardTable from "@/contest/ContestLeaderboardTable.tsx";
import type {
	ContestLeaderboardPage,
	ContestParticipantDetail,
} from "@/domain/contests/contestParticipantTypes.ts";
import {
	contestStatusRecord,
	getStatusByColor,
	type Contest,
} from "@/domain/contests/contestTypes.ts";
import { formatDateTimeValue, formatMappedLabel } from "@/lib/formatters.ts";

interface Props {
	contest: Contest;
	leaderboard: ContestLeaderboardPage;
	participantDetail: ContestParticipantDetail | null;
	pageSize: number;
	currentPage: number;
}

const numberFormatter = new Intl.NumberFormat(undefined, {
	maximumFractionDigits: 2,
});

function getStatusBadgeClassName(contest: Contest): string {
	switch (getStatusByColor(contest)) {
		case "green":
			return "badge badge-success badge-outline";
		case "yellow":
			return "badge badge-warning badge-outline";
		case "grey":
			return "badge badge-neutral badge-outline";
		case "red":
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

function formatNumericValue(value: number): string {
	return numberFormatter.format(value);
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
								{formatNumericValue(participantCount)}
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
				<section className="card border border-base-300 bg-base-100 shadow-sm">
					<div className="card-body gap-4">
						<div className="space-y-1">
							<h2 className="text-xl font-semibold text-base-content">
								My status
							</h2>
							<p className="text-sm text-base-content/70">
								Your position in this contest right now.
							</p>
						</div>
						<div className="stats stats-vertical border border-base-300 bg-base-200/50 lg:stats-horizontal">
							<div className="stat">
								<div className="stat-title">Rank</div>
								<div className="stat-value text-3xl">
									{participantDetail.participant.rank ?? "-"}
								</div>
							</div>
							<div className="stat">
								<div className="stat-title">Total value</div>
								<div className="stat-value text-3xl">
									{formatNumericValue(participantDetail.participant.totalValue)}
								</div>
							</div>
							<div className="stat">
								<div className="stat-title">Remaining funds</div>
								<div className="stat-value text-3xl">
									{formatNumericValue(
										participantDetail.participant.remainingFunds,
									)}
								</div>
							</div>
						</div>
					</div>
				</section>
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
		</div>
	);
}
