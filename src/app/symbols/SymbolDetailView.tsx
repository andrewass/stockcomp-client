import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import type React from "react";
import type { SymbolDetailViewModel } from "@/symbols/domain.ts";
import { SymbolPriceHistoryChart } from "@/symbols/SymbolPriceHistoryChart.tsx";

interface Props {
	symbolDetail: SymbolDetailViewModel;
	tradingPanel?: React.ReactNode;
}

type Metric = {
	label: string;
	value: string;
};

function formatCurrency(
	value: number | null | undefined,
	currency: string,
	options?: Intl.NumberFormatOptions,
): string {
	if (value === null || value === undefined || !Number.isFinite(value)) {
		return "N/A";
	}

	try {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency,
			...options,
		}).format(value);
	} catch {
		return new Intl.NumberFormat("en-US", {
			maximumFractionDigits: 2,
			...options,
		}).format(value);
	}
}

function formatNumber(
	value: number | null | undefined,
	options?: Intl.NumberFormatOptions,
): string {
	if (value === null || value === undefined || !Number.isFinite(value)) {
		return "N/A";
	}

	return new Intl.NumberFormat("en-US", options).format(value);
}

function formatSignedCurrency(value: number, currency: string): string {
	const sign = value > 0 ? "+" : value < 0 ? "-" : "";
	return `${sign}${formatCurrency(Math.abs(value), currency, {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	})}`;
}

function formatSignedPercent(value: number): string {
	const sign = value > 0 ? "+" : "";
	return `${sign}${formatNumber(value, {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	})}%`;
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
										{formatSignedPercent(symbolDetail.percentageChange)}
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

					<section className="rounded-box border border-base-300 bg-base-100 p-6 shadow-sm sm:p-8">
						<div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
							<div>
								<p className="text-sm font-medium uppercase tracking-[0.2em] text-base-content/55">
									Price history
								</p>
								<h2 className="mt-2 text-2xl font-semibold text-base-content">
									One-year trend
								</h2>
							</div>
							<span className="badge badge-ghost">1Y</span>
						</div>
						<SymbolPriceHistoryChart
							currency={symbolDetail.currency}
							history={symbolDetail.history}
						/>
					</section>
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
