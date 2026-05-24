import { ChevronDownIcon } from "@heroicons/react/24/outline";
import {
	CONTEST_STATUS,
	contestStatusRecord,
} from "@/domain/contests/contestTypes.ts";
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
	isExpanded: boolean;
	isCancellingOrder: boolean;
	onCancelOrder: (
		contest: SymbolTradingContestViewModel,
		order: SymbolTradingOrderViewModel,
	) => void;
	onToggle: () => void;
}

function getContestStatusBadgeClassName(status: string): string {
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

function getContestStatusLabel(status: string): string {
	return formatMappedLabel(status, contestStatusRecord);
}

export function ContestInvestmentCard({
	contest,
	currency,
	isExpanded,
	isCancellingOrder,
	onCancelOrder,
	onToggle,
}: Props) {
	const profitClassName = getProfitClassName(contest.investment.totalProfit);
	const statusLabel = getContestStatusLabel(contest.contestStatus);
	const panelId = `symbol-trading-contest-panel-${contest.contestId}`;
	const triggerId = `symbol-trading-contest-trigger-${contest.contestId}`;

	return (
		<article className="overflow-hidden rounded-box border border-base-300 bg-base-100">
			<button
				id={triggerId}
				type="button"
				className="flex w-full items-start justify-between gap-3 p-4 text-left"
				aria-expanded={isExpanded}
				aria-controls={panelId}
				onClick={onToggle}
			>
				<div className="min-w-0">
					<div className="flex items-center gap-2">
						<h4 className="truncate font-semibold">{contest.contestName}</h4>
						<ChevronDownIcon
							className={`size-4 shrink-0 text-base-content/45 transition-transform ${
								isExpanded ? "rotate-180" : ""
							}`}
							aria-hidden="true"
						/>
					</div>
					<p className="mt-1 text-xs text-base-content/55">
						{getContestTimelineLabel(contest)}
					</p>
				</div>
				<span
					className={`${getContestStatusBadgeClassName(
						contest.contestStatus,
					)} shrink-0`}
				>
					{statusLabel}
				</span>
			</button>

			{isExpanded && (
				<section
					id={panelId}
					aria-labelledby={triggerId}
					className="border-t border-base-300 p-4"
				>
					<div className="grid grid-cols-2 gap-2 text-sm">
						<div className="rounded-box bg-base-200/60 px-3 py-2">
							<p className="text-xs uppercase tracking-[0.14em] text-base-content/45">
								Shares
							</p>
							<p className="font-semibold tabular-nums">
								{formatNumber(contest.investment.amount, {
									maximumFractionDigits: 0,
								})}
							</p>
						</div>
						<div className="rounded-box bg-base-200/60 px-3 py-2">
							<p className="text-xs uppercase tracking-[0.14em] text-base-content/45">
								Value
							</p>
							<p className="font-semibold tabular-nums">
								{formatCurrency(contest.investment.totalValue, currency, {
									minimumFractionDigits: 2,
									maximumFractionDigits: 2,
								})}
							</p>
						</div>
						<div className="rounded-box bg-base-200/60 px-3 py-2">
							<p className="text-xs uppercase tracking-[0.14em] text-base-content/45">
								P/L
							</p>
							<p className={`font-semibold tabular-nums ${profitClassName}`}>
								{formatSignedCurrency(contest.investment.totalProfit, currency)}
							</p>
						</div>
						<div className="rounded-box bg-base-200/60 px-3 py-2">
							<p className="text-xs uppercase tracking-[0.14em] text-base-content/45">
								Return
							</p>
							<p className={`font-semibold tabular-nums ${profitClassName}`}>
								{formatNumber(contest.investment.totalProfitPercentage, {
									minimumFractionDigits: 2,
									maximumFractionDigits: 2,
								})}
								%
							</p>
						</div>
					</div>

					<OrderList
						orders={contest.orders}
						isCancellingOrder={isCancellingOrder}
						onCancelOrder={(order) => onCancelOrder(contest, order)}
					/>
				</section>
			)}
		</article>
	);
}
