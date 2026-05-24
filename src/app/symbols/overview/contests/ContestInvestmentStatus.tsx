import {
	formatCurrency,
	formatSignedCurrency,
	getProfitClassName,
} from "@/lib/formatters.ts";
import type { SymbolContestInvestmentStatusViewModel } from "@/symbols/domain.ts";

interface Props {
	status: SymbolContestInvestmentStatusViewModel;
}

export default function ContestInvestmentStatus({ status }: Props) {
	const profitClassName = getProfitClassName(status.totalProfit);

	return (
		<div className="grid gap-2 border-t border-base-300 pt-3 text-sm sm:grid-cols-2">
			<div className="rounded-box bg-base-200/70 px-3 py-2">
				<p className="text-xs uppercase tracking-[0.18em] text-base-content/45">
					Available
				</p>
				<p className="font-semibold tabular-nums">
					{formatCurrency(status.remainingFunds, "USD", {
						minimumFractionDigits: 2,
						maximumFractionDigits: 2,
					})}
				</p>
			</div>
			<div className="rounded-box bg-base-200/70 px-3 py-2">
				<p className="text-xs uppercase tracking-[0.18em] text-base-content/45">
					Invested
				</p>
				<p className="font-semibold tabular-nums">
					{formatCurrency(status.totalInvestmentValue, "USD", {
						minimumFractionDigits: 2,
						maximumFractionDigits: 2,
					})}
				</p>
				<p className={`text-xs font-medium tabular-nums ${profitClassName}`}>
					{formatSignedCurrency(status.totalProfit, "USD", {
						minimumFractionDigits: 2,
						maximumFractionDigits: 2,
					})}
				</p>
			</div>
			<div className="rounded-box bg-base-200/70 px-3 py-2">
				<p className="text-xs uppercase tracking-[0.18em] text-base-content/45">
					Total
				</p>
				<p className="font-semibold tabular-nums">
					{formatCurrency(status.totalValue, "USD", {
						minimumFractionDigits: 2,
						maximumFractionDigits: 2,
					})}
				</p>
			</div>
			<div className="rounded-box bg-base-200/70 px-3 py-2">
				<p className="text-xs uppercase tracking-[0.18em] text-base-content/45">
					Rank
				</p>
				<p className="font-semibold tabular-nums">{status.rank ?? "-"}</p>
			</div>
		</div>
	);
}
