import type { ContestParticipantDetail } from "@/domain/contests/contestParticipantTypes.ts";
import {
	formatCurrency,
	formatSignedCurrency,
	getProfitClassName,
} from "@/lib/formatters.ts";
import ContestInvestmentOrdersTable from "./ContestInvestmentOrdersTable.tsx";
import ContestInvestmentsTable from "./ContestInvestmentsTable.tsx";

interface Props {
	participantDetail: ContestParticipantDetail;
}

export default function ContestParticipantStatus({ participantDetail }: Props) {
	const participant = participantDetail.participant;
	const totalProfit = participantDetail.investments.reduce(
		(sum, investment) => sum + investment.totalProfit,
		0,
	);
	const orders = [
		...participantDetail.activeOrders,
		...participantDetail.completedOrders,
	];

	return (
		<section className="card border border-base-300 bg-base-100 shadow-sm">
			<div className="card-body gap-6">
				<div className="space-y-1">
					<h2 className="text-xl font-semibold text-base-content">
						My contest status
					</h2>
					<p className="text-sm text-base-content/70">
						Your position, current portfolio, and orders in this contest.
					</p>
				</div>
				<div className="stats stats-vertical border border-base-300 bg-base-200/50 lg:stats-horizontal">
					<div className="stat">
						<div className="stat-title">Rank</div>
						<div className="stat-value text-3xl">{participant.rank ?? "-"}</div>
					</div>
					<div className="stat">
						<div className="stat-title">Remaining funds</div>
						<div className="stat-value text-3xl">
							{formatCurrency(participant.remainingFunds)}
						</div>
					</div>
					<div className="stat">
						<div className="stat-title">Invested</div>
						<div className="stat-value text-3xl">
							{formatCurrency(participant.totalInvestmentValue)}
						</div>
						<div
							className={`stat-desc font-medium ${getProfitClassName(
								totalProfit,
							)}`}
						>
							{formatSignedCurrency(totalProfit)}
						</div>
					</div>
					<div className="stat">
						<div className="stat-title">Total value</div>
						<div className="stat-value text-3xl">
							{formatCurrency(participant.totalValue)}
						</div>
					</div>
				</div>
				<ContestInvestmentsTable investments={participantDetail.investments} />
				<ContestInvestmentOrdersTable orders={orders} />
			</div>
		</section>
	);
}
