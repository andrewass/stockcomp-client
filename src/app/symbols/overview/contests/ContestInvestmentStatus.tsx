import type { SymbolContestInvestmentStatusViewModel } from "@/symbols/domain.ts";

interface Props {
	status: SymbolContestInvestmentStatusViewModel;
}

function formatCurrency(value: number): string {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	}).format(value);
}

function formatSignedCurrency(value: number): string {
	const sign = value > 0 ? "+" : value < 0 ? "-" : "";
	return `${sign}${formatCurrency(Math.abs(value))}`;
}

function getProfitClassName(value: number): string {
	if (value > 0) {
		return "text-success";
	}

	if (value < 0) {
		return "text-error";
	}

	return "text-base-content";
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
					{formatCurrency(status.remainingFunds)}
				</p>
			</div>
			<div className="rounded-box bg-base-200/70 px-3 py-2">
				<p className="text-xs uppercase tracking-[0.18em] text-base-content/45">
					Invested
				</p>
				<p className="font-semibold tabular-nums">
					{formatCurrency(status.totalInvestmentValue)}
				</p>
				<p className={`text-xs font-medium tabular-nums ${profitClassName}`}>
					{formatSignedCurrency(status.totalProfit)}
				</p>
			</div>
			<div className="rounded-box bg-base-200/70 px-3 py-2">
				<p className="text-xs uppercase tracking-[0.18em] text-base-content/45">
					Total
				</p>
				<p className="font-semibold tabular-nums">
					{formatCurrency(status.totalValue)}
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
