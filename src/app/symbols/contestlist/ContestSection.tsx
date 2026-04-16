import Link from "next/link";
import { contestStatusRecord } from "@/contest/contestTypes.ts";
import { formatDateTimeValue, formatMappedLabel } from "@/lib/formatters.ts";
import type { SymbolContestListItemViewModel } from "@/symbols/symbolTypes.ts";

interface Props {
	title: string;
	description: string;
	emptyMessage: string;
	contests: SymbolContestListItemViewModel[];
}

const contestStatusBadgeClasses: Record<string, string> = {
	AWAITING_START: "badge-warning",
	RUNNING: "badge-success",
	STOPPED: "badge-error",
	COMPLETED: "badge-ghost",
};

function getContestStatusBadgeClass(contestStatus: string): string {
	return contestStatusBadgeClasses[contestStatus] ?? "badge-ghost";
}

export default function ContestSection({
	title,
	description,
	emptyMessage,
	contests,
}: Props) {
	return (
		<section className="space-y-3">
			<div className="flex items-center justify-between gap-3">
				<div className="space-y-1">
					<h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-base-content/60">
						{title}
					</h2>
					<p className="text-sm text-base-content/65">{description}</p>
				</div>
				<span className="badge badge-outline badge-lg">{contests.length}</span>
			</div>
			{contests.length > 0 ? (
				<div className="space-y-3">
					{contests.map((contest) => (
						<Link
							key={contest.contestId}
							href={`/contest/${contest.contestId}`}
							className="group block rounded-box border border-base-300 bg-base-100/90 p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
						>
							<div className="space-y-3">
								<div className="flex items-start justify-between gap-3">
									<div className="space-y-1">
										<p className="text-sm text-base-content/55">
											Contest #{contest.contestId}
										</p>
										<p className="font-semibold leading-5 group-hover:text-primary">
											{contest.contestName}
										</p>
									</div>
									<span
										className={`badge ${getContestStatusBadgeClass(
											contest.contestStatus,
										)}`}
									>
										{formatMappedLabel(
											contest.contestStatus,
											contestStatusRecord,
										)}
									</span>
								</div>
								<div className="grid gap-2 text-sm text-base-content/65 sm:grid-cols-2">
									<div>
										<p className="text-xs uppercase tracking-[0.18em] text-base-content/45">
											Starts
										</p>
										<p>{formatDateTimeValue(contest.startTime, "dd/MM HH:mm")}</p>
									</div>
									<div>
										<p className="text-xs uppercase tracking-[0.18em] text-base-content/45">
											Ends
										</p>
										<p>{formatDateTimeValue(contest.endTime, "dd/MM HH:mm")}</p>
									</div>
								</div>
							</div>
						</Link>
					))}
				</div>
			) : (
				<div className="rounded-box border border-dashed border-base-300 bg-base-100/60 px-4 py-6 text-sm text-base-content/60">
					{emptyMessage}
				</div>
			)}
		</section>
	);
}
