import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import type React from "react";
import {
	formatCurrency,
	formatNumber,
	formatSignedCurrency,
	formatSignedPercent,
} from "@/lib/formatters.ts";
import { DEFAULT_PRICE_HISTORY_PERIOD } from "@/symbols/detail/price-history/priceHistoryPeriods.ts";
import { SymbolPriceHistoryPanel } from "@/symbols/detail/price-history/SymbolPriceHistoryPanel.tsx";
import type { SymbolDetailViewModel } from "@/symbols/domain.ts";

interface Props {
	symbolDetail: SymbolDetailViewModel;
	tradingPanel?: React.ReactNode;
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
	tradingPanel,
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
			<Link href="/symbols" className="btn btn-ghost btn-sm w-fit gap-2">
				<ArrowLeftIcon className="size-4" />
				Symbols
			</Link>

			<div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(21rem,0.38fr)]">
				<div className="space-y-6">
					<section className="overflow-hidden rounded-box border border-base-300 bg-base-100 shadow-sm">
						<div className="grid gap-0 lg:grid-cols-[minmax(0,1.45fr)_minmax(20rem,0.75fr)]">
							<div className="space-y-8 p-6 sm:p-8">
								<div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
									<div className="space-y-3">
										<div className="flex flex-wrap items-center gap-2">
											<span className="badge badge-primary badge-outline">
												{symbolDetail.symbol}
											</span>
											<span className="badge badge-ghost">
												{symbolDetail.currency}
											</span>
										</div>
										<div className="space-y-2">
											<h1 className="text-3xl font-semibold tracking-tight text-base-content sm:text-4xl">
												{symbolDetail.companyName}
											</h1>
										</div>
									</div>
									<div className={getChangeClassName(symbolDetail.priceChange)}>
										{formatSignedPercent(symbolDetail.percentageChange, {
											minimumFractionDigits: 2,
											maximumFractionDigits: 2,
										})}
									</div>
								</div>

								<div className="stats stats-vertical w-full border border-base-300 bg-base-200/50 lg:stats-horizontal">
									<div className="stat">
										<div className="stat-title">Current price</div>
										<div className="stat-value text-3xl">
											{formatCurrency(
												symbolDetail.currentPrice,
												symbolDetail.currency,
												{
													minimumFractionDigits: 2,
													maximumFractionDigits: 2,
												},
											)}
										</div>
									</div>
									<div className="stat">
										<div className="stat-title">Daily change</div>
										<div className="stat-value text-2xl">
											{formatSignedCurrency(
												symbolDetail.priceChange,
												symbolDetail.currency,
												{
													minimumFractionDigits: 2,
													maximumFractionDigits: 2,
												},
											)}
										</div>
									</div>
									<div className="stat">
										<div className="stat-title">USD price</div>
										<div className="stat-value text-2xl">
											{formatCurrency(symbolDetail.usdPrice, "USD", {
												minimumFractionDigits: 2,
												maximumFractionDigits: 2,
											})}
										</div>
									</div>
								</div>
							</div>

							<div className="border-t border-base-300 bg-base-200/60 p-6 lg:border-l lg:border-t-0 sm:p-8">
								<div className="grid grid-cols-2 gap-3">
									{metrics.map((metric) => (
										<div
											key={metric.label}
											className="rounded-box border border-base-300 bg-base-100 p-4"
										>
											<p className="text-xs font-medium uppercase tracking-[0.18em] text-base-content/55">
												{metric.label}
											</p>
											<p className="mt-2 text-xl font-semibold text-base-content">
												{metric.value}
											</p>
										</div>
									))}
								</div>
							</div>
						</div>
					</section>

					<SymbolPriceHistoryPanel
						currency={symbolDetail.currency}
						initialPriceHistory={symbolDetail.priceHistory}
						initialPeriod={DEFAULT_PRICE_HISTORY_PERIOD}
						symbol={symbolDetail.symbol}
					/>
				</div>
				{tradingPanel && (
					<aside className="xl:sticky xl:top-24 xl:self-start">
						{tradingPanel}
					</aside>
				)}
			</div>
		</div>
	);
}
