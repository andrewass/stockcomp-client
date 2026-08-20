import type { ContestParticipantDetail } from "@/domain/contests/contestParticipantTypes.ts";
import {
	formatCurrency,
	formatNumber,
	formatSignedCurrency,
	getProfitClassName,
} from "@/lib/formatters.ts";

interface Props {
	participantDetail: ContestParticipantDetail;
	participantCount: number;
}

export default function ContestParticipantStatus({
	participantDetail,
	participantCount,
}: Props) {
	const participant = participantDetail.participant;
	const totalProfit = participantDetail.investments.reduce(
		(sum, investment) => sum + investment.totalProfit,
		0,
	);
	const formattedRank =
		participant.rank == null
			? "—"
			: `#${formatNumber(participant.rank, { maximumFractionDigits: 0 })}`;

	return (
		<section className="space-y-4" aria-labelledby="participant-status-heading">
			<div className="space-y-1">
				<h2
					id="participant-status-heading"
					className="text-xl font-semibold text-base-content"
				>
					Your position
				</h2>
				<p className="text-sm text-base-content/65">
					A quick view of your standing and portfolio performance.
				</p>
			</div>
			<div className="grid overflow-hidden rounded-box border border-base-300 bg-base-300 sm:grid-cols-2 lg:grid-cols-4">
				<div className="bg-base-100 px-5 py-4">
					<p className="text-sm text-base-content/55">Rank</p>
					<p className="mt-1 text-2xl font-semibold tabular-nums text-base-content">
						{formattedRank}
					</p>
					<p className="mt-1 text-xs text-base-content/55">
						of {formatNumber(participantCount)} participants
					</p>
				</div>
				<div className="border-t border-base-300 bg-base-100 px-5 py-4 sm:border-l sm:border-t-0">
					<p className="text-sm text-base-content/55">Total value</p>
					<p className="mt-1 text-2xl font-semibold tabular-nums text-base-content">
						{formatCurrency(participant.totalValue)}
					</p>
					<p className="mt-1 text-xs tabular-nums text-base-content/55">
						{formatCurrency(participant.totalInvestmentValue)} invested
					</p>
				</div>
				<div className="border-t border-base-300 bg-base-100 px-5 py-4 lg:border-l lg:border-t-0">
					<p className="text-sm text-base-content/55">Profit / loss</p>
					<p
						className={`mt-1 text-2xl font-semibold tabular-nums ${getProfitClassName(
							totalProfit,
						)}`}
					>
						{formatSignedCurrency(totalProfit)}
					</p>
					<p className="mt-1 text-xs text-base-content/55">
						Across current holdings
					</p>
				</div>
				<div className="border-t border-base-300 bg-base-100 px-5 py-4 sm:border-l lg:border-t-0">
					<p className="text-sm text-base-content/55">Available funds</p>
					<p className="mt-1 text-2xl font-semibold tabular-nums text-base-content">
						{formatCurrency(participant.remainingFunds)}
					</p>
					<p className="mt-1 text-xs text-base-content/55">Ready to invest</p>
				</div>
			</div>
		</section>
	);
}
