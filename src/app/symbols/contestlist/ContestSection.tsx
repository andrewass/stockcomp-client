import Link from "next/link";
import { contestStatusRecord } from "@/domain/contests/contestTypes.ts";
import { formatDateTimeValue, formatMappedLabel } from "@/lib/formatters.ts";
import type { SymbolContestListItemViewModel } from "@/symbols/domain.ts";

interface Props {
	title: string;
	emptyMessage: string;
	contests: SymbolContestListItemViewModel[];
	showSignUpAction?: boolean;
}

const contestStatusDotClasses: Record<string, string> = {
	AWAITING_START: "bg-warning",
	RUNNING: "bg-success",
	STOPPED: "bg-error",
	COMPLETED: "bg-base-content/35",
};

function getContestStatusDotClass(contestStatus: string): string {
	return contestStatusDotClasses[contestStatus] ?? "bg-base-content/35";
}

export default function ContestSection({
	title,
	emptyMessage,
	contests,
	showSignUpAction = false,
}: Props) {
	return (
		<section className="space-y-3">
			<h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-base-content/60">
				{title}
			</h2>
			{contests.length > 0 ? (
				<div className="space-y-4">
					{contests.map((contest) => {
						const statusLabel = formatMappedLabel(
							contest.contestStatus,
							contestStatusRecord,
						);
						const contestHref = `/contest/${contest.contestId}`;

						return (
							<article
								key={contest.contestId}
								className="group rounded-box border border-base-300 bg-base-100/90 p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
							>
								<div className="space-y-3">
									<div className="flex items-start justify-between gap-3">
										<div className="min-w-0">
											<div className="flex items-center gap-2">
												<Link
													href={contestHref}
													className="min-w-0 font-semibold leading-5 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
												>
													{contest.contestName}
												</Link>
												<span
													className="tooltip tooltip-top shrink-0"
													data-tip={statusLabel}
													aria-label={`Status: ${statusLabel}`}
													tabIndex={0}
												>
													<span
														className={`block size-2.5 rounded-full ring-2 ring-base-100 ${getContestStatusDotClass(
															contest.contestStatus,
														)}`}
													/>
												</span>
											</div>
										</div>
										{showSignUpAction && (
											<Link
												href={contestHref}
												className="btn btn-primary btn-xs shrink-0 rounded-full px-3"
											>
												Sign up
											</Link>
										)}
									</div>
									<div className="grid gap-2 text-sm text-base-content/65 sm:grid-cols-2">
										<div>
											<p className="text-xs uppercase tracking-[0.18em] text-base-content/45">
												Starts
											</p>
											<p>
												{formatDateTimeValue(contest.startTime, "dd/MM HH:mm")}
											</p>
										</div>
										<div>
											<p className="text-xs uppercase tracking-[0.18em] text-base-content/45">
												Ends
											</p>
											<p>
												{formatDateTimeValue(contest.endTime, "dd/MM HH:mm")}
											</p>
										</div>
									</div>
								</div>
							</article>
						);
					})}
				</div>
			) : (
				<div className="rounded-box border border-dashed border-base-300 bg-base-100/60 px-4 py-6 text-sm text-base-content/60">
					{emptyMessage}
				</div>
			)}
		</section>
	);
}
