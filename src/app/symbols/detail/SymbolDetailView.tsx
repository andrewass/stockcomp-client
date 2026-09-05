import {
	formatCurrency,
	formatNumber,
	formatSignedCurrency,
	formatSignedPercent,
} from "@/lib/formatters.ts";
import { DEFAULT_PRICE_HISTORY_PERIOD } from "@/symbols/detail/price-history/priceHistoryPeriods.ts";
import { SymbolPriceHistoryPanel } from "@/symbols/detail/price-history/SymbolPriceHistoryPanel.tsx";
import SymbolTradingWorkspace from "@/symbols/detail/trading/SymbolTradingWorkspace.tsx";
import type {
	SymbolDetailViewModel,
	SymbolTradingViewModel,
} from "@/symbols/domain.ts";

interface Props {
	symbolDetail: SymbolDetailViewModel;
	initialTradingData: SymbolTradingViewModel;
}

interface Metric {
	label: string;
	value: string;
}

function getChangeClassName(change: number): string {
	if (change > 0) {
		return "badge badge-success badge-outline";
	}

	if (change < 0) {
		return "badge badge-error badge-outline";
	}

	return "badge badge-neutral badge-outline";
}

export default function SymbolDetailView({
	symbolDetail,
	initialTradingData,
}: Props) {
	const metrics: Metric[] = [
		{
			label: "Market cap",
			value: formatCurrency(
				symbolDetail.financials.marketCap,
				symbolDetail.currency,
				{
					notation: "compact",
					maximumFractionDigits: 2,
				},
			),
		},
		{
			label: "P/E",
			value: formatNumber(symbolDetail.financials.priceToEarnings, {
				maximumFractionDigits: 2,
			}),
		},
		{
			label: "P/B",
			value: formatNumber(symbolDetail.financials.priceToBook, {
				maximumFractionDigits: 2,
			}),
		},
		{
			label: "EPS",
			value: formatCurrency(
				symbolDetail.financials.earningsPerShare,
				symbolDetail.currency,
				{
					maximumFractionDigits: 2,
				},
			),
		},
		{
			label: "Dividend rate",
			value: formatCurrency(
				symbolDetail.financials.dividendRate,
				symbolDetail.currency,
				{
					maximumFractionDigits: 2,
				},
			),
		},
		{
			label: "Dividend yield",
			value:
				symbolDetail.financials.dividendYieldPercentage === null
					? "N/A"
					: `${formatNumber(symbolDetail.financials.dividendYieldPercentage, {
							maximumFractionDigits: 2,
						})}%`,
		},
	];

	return (
		<div className="w-full max-w-7xl space-y-6 px-4 pb-12 pt-2 sm:px-6 lg:px-8">
			<section className="overflow-hidden rounded-box border border-base-300 bg-base-100 shadow-sm">
				<div className="flex flex-col gap-6 p-6 sm:p-8 lg:flex-row lg:items-start lg:justify-between">
					<div className="min-w-0 space-y-3">
						<div className="flex flex-wrap items-center gap-2">
							<span
								className="badge badge-primary badge-outline"
								translate="no"
							>
								{symbolDetail.symbol}
							</span>
							<span className="badge badge-ghost" translate="no">
								{symbolDetail.currency}
							</span>
						</div>
						<h1 className="break-words text-3xl font-semibold tracking-tight text-balance text-base-content sm:text-4xl">
							{symbolDetail.companyName}
						</h1>
					</div>

					<div className="shrink-0">
						<div className="text-right">
							<p className="text-sm text-base-content/55">Current Price</p>
							<p className="mt-1 text-3xl font-semibold tabular-nums text-base-content">
								{formatCurrency(
									symbolDetail.currentPrice,
									symbolDetail.currency,
									{
										minimumFractionDigits: 2,
										maximumFractionDigits: 2,
									},
								)}
							</p>
							<div className="mt-2 flex flex-wrap items-center justify-end gap-2">
								<span className={getChangeClassName(symbolDetail.priceChange)}>
									{formatSignedPercent(symbolDetail.percentageChange, {
										minimumFractionDigits: 2,
										maximumFractionDigits: 2,
									})}
								</span>
								<span className="text-sm tabular-nums text-base-content/60">
									{formatSignedCurrency(
										symbolDetail.priceChange,
										symbolDetail.currency,
										{
											minimumFractionDigits: 2,
											maximumFractionDigits: 2,
										},
									)}
								</span>
							</div>
						</div>
					</div>
				</div>

				<dl className="grid gap-px border-t border-base-300 bg-base-300 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
					<div className="bg-base-200 px-5 py-4 sm:px-6">
						<dt className="text-xs font-medium uppercase tracking-[0.14em] text-base-content/50">
							USD Price
						</dt>
						<dd className="mt-1 font-semibold tabular-nums text-base-content">
							{formatCurrency(symbolDetail.usdPrice, "USD", {
								minimumFractionDigits: 2,
								maximumFractionDigits: 2,
							})}
						</dd>
					</div>
					{metrics.map((metric) => (
						<div key={metric.label} className="bg-base-200 px-5 py-4 sm:px-6">
							<dt className="text-xs font-medium uppercase tracking-[0.14em] text-base-content/50">
								{metric.label}
							</dt>
							<dd className="mt-1 font-semibold tabular-nums text-base-content">
								{metric.value}
							</dd>
						</div>
					))}
				</dl>
			</section>

			<SymbolTradingWorkspace
				symbol={symbolDetail.symbol}
				currentPrice={symbolDetail.currentPrice}
				currency={symbolDetail.currency}
				initialTradingData={initialTradingData}
				priceHistoryPanel={
					<SymbolPriceHistoryPanel
						currency={symbolDetail.currency}
						initialPriceHistory={symbolDetail.priceHistory}
						initialPeriod={DEFAULT_PRICE_HISTORY_PERIOD}
						symbol={symbolDetail.symbol}
					/>
				}
			/>
		</div>
	);
}
