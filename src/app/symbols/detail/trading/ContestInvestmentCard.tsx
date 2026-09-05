import {
	CONTEST_STATUS,
	type ContestStatus,
	contestStatusRecord,
} from "@/domain/contests/contestTypes.ts";
import { ORDER_STATUS } from "@/domain/investmentorder/investmentOrderTypes.ts";
import {
	formatCurrency,
	formatDateTimeValue,
	formatMappedLabel,
	formatNumber,
	formatSignedCurrency,
	getProfitClassName,
} from "@/lib/formatters.ts";
import { OrderList } from "@/symbols/detail/trading/OrderList.tsx";
import type {
	SymbolTradingContestViewModel,
	SymbolTradingOrderViewModel,
} from "@/symbols/domain.ts";

interface Props {
	contest: SymbolTradingContestViewModel;
	currency: string;
	isCancellingOrder: boolean;
	onCancelOrder: (
		contest: SymbolTradingContestViewModel,
		order: SymbolTradingOrderViewModel,
	) => void;
}

function getContestStatusBadgeClassName(status: ContestStatus): string {
	switch (status) {
		case CONTEST_STATUS.RUNNING:
			return "badge badge-success badge-outline";
		case CONTEST_STATUS.AWAITING_START:
			return "badge badge-warning badge-outline";
		case CONTEST_STATUS.STOPPED:
			return "badge badge-error badge-outline";
		default:
			return "badge badge-neutral badge-outline";
	}
}

function getContestTimelineLabel(
	contest: SymbolTradingContestViewModel,
): string {
	if (contest.contestStatus === CONTEST_STATUS.AWAITING_START) {
		return `Starts ${formatDateTimeValue(contest.startTime, "dd/MM HH:mm")}`;
	}

	if (contest.contestStatus === CONTEST_STATUS.COMPLETED) {
		return `Ended ${formatDateTimeValue(contest.endTime, "dd/MM HH:mm")}`;
	}

	return `Ends ${formatDateTimeValue(contest.endTime, "dd/MM HH:mm")}`;
}

function getContestStatusLabel(status: ContestStatus): string {
	return formatMappedLabel(status, contestStatusRecord);
}

export function ContestInvestmentCard({
	contest,
	currency,
	isCancellingOrder,
	onCancelOrder,
}: Props) {
	const profitClassName = getProfitClassName(contest.investment.totalProfit);
	const statusLabel = getContestStatusLabel(contest.contestStatus);
	const activeOrderCount = contest.orders.filter(
		(order) => order.orderStatus === ORDER_STATUS.ACTIVE,
	).length;

	return (
		<article className="overflow-hidden rounded-box border border-base-300 bg-base-100">
			<div className="flex flex-col gap-4 p-4 sm:p-5">
				<div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
					<div className="min-w-0">
						<div className="flex flex-wrap items-center gap-2">
							<h3 className="break-words font-semibold text-base-content">
								{contest.contestName}
							</h3>
							<span
								className={getContestStatusBadgeClassName(
									contest.contestStatus,
								)}
							>
								{statusLabel}
							</span>
						</div>
						<p className="mt-1 text-xs text-base-content/55">
							{getContestTimelineLabel(contest)}
						</p>
					</div>
					<div className="flex shrink-0 items-center gap-2 text-sm text-base-content/65">
						<span>Orders ({contest.orders.length})</span>
						{activeOrderCount > 0 ? (
							<span className="badge badge-success badge-outline badge-sm">
								{activeOrderCount} active
							</span>
						) : null}
					</div>
				</div>

				<dl className="grid grid-cols-2 gap-px overflow-hidden rounded-box border border-base-300 bg-base-300 lg:grid-cols-4">
					<div className="bg-base-200 px-4 py-3">
						<dt className="text-xs uppercase tracking-[0.14em] text-base-content/45">
							Shares
						</dt>
						<dd className="mt-1 font-semibold tabular-nums">
							{formatNumber(contest.investment.amount, {
								maximumFractionDigits: 0,
							})}
						</dd>
					</div>
					<div className="bg-base-200 px-4 py-3">
						<dt className="text-xs uppercase tracking-[0.14em] text-base-content/45">
							Value
						</dt>
						<dd className="mt-1 font-semibold tabular-nums">
							{formatCurrency(contest.investment.totalValue, currency, {
								minimumFractionDigits: 2,
								maximumFractionDigits: 2,
							})}
						</dd>
					</div>
					<div className="bg-base-200 px-4 py-3">
						<dt className="text-xs uppercase tracking-[0.14em] text-base-content/45">
							P/L
						</dt>
						<dd
							className={`mt-1 font-semibold tabular-nums ${profitClassName}`}
						>
							{formatSignedCurrency(contest.investment.totalProfit, currency)}
						</dd>
					</div>
					<div className="bg-base-200 px-4 py-3">
						<dt className="text-xs uppercase tracking-[0.14em] text-base-content/45">
							Return
						</dt>
						<dd
							className={`mt-1 font-semibold tabular-nums ${profitClassName}`}
						>
							{formatNumber(contest.investment.totalProfitPercentage, {
								minimumFractionDigits: 2,
								maximumFractionDigits: 2,
							})}
							%
						</dd>
					</div>
				</dl>
			</div>

			<section
				aria-label="Orders"
				className="border-t border-base-300 bg-base-200/25 p-4 sm:p-5"
			>
				<OrderList
					orders={contest.orders}
					isCancellingOrder={isCancellingOrder}
					onCancelOrder={(order) => onCancelOrder(contest, order)}
				/>
			</section>
		</article>
	);
}
