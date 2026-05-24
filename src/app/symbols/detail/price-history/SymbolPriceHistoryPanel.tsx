"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import type { Period } from "@/domain/symbol/symbolTypes.ts";
import { formatSignedCurrency, formatSignedPercent } from "@/lib/formatters.ts";
import {
	getPriceHistoryPeriodLabel,
	getPriceHistoryPeriodTitle,
	PRICE_HISTORY_PERIOD_OPTIONS,
} from "@/symbols/detail/price-history/priceHistoryPeriods.ts";
import { SymbolPriceHistoryChart } from "@/symbols/detail/price-history/SymbolPriceHistoryChart.tsx";
import type { SymbolPriceHistoryViewModel } from "@/symbols/domain.ts";

interface Props {
	currency: string;
	initialPriceHistory: SymbolPriceHistoryViewModel;
	initialPeriod: Period;
	symbol: string;
}

async function fetchPriceHistory(
	symbol: string,
	period: Period,
): Promise<SymbolPriceHistoryViewModel> {
	const searchParams = new URLSearchParams({ symbol, period });
	const response = await fetch(
		`/symbols/api/price-history?${searchParams.toString()}`,
		{ cache: "no-store" },
	);

	if (!response.ok) {
		throw new Error("Unable to load price history.");
	}

	return (await response.json()) as SymbolPriceHistoryViewModel;
}

function getChangeClassName(change: number): string {
	if (change > 0) {
		return "badge badge-success badge-outline relative top-0.5";
	}

	if (change < 0) {
		return "badge badge-error badge-outline relative top-0.5";
	}

	return "badge badge-neutral badge-outline relative top-0.5";
}

export function SymbolPriceHistoryPanel({
	currency,
	initialPriceHistory,
	initialPeriod,
	symbol,
}: Props) {
	const [selectedPeriod, setSelectedPeriod] = useState<Period>(initialPeriod);
	const periodLabel = getPriceHistoryPeriodLabel(selectedPeriod);
	const periodTitle = getPriceHistoryPeriodTitle(selectedPeriod);
	const historyQuery = useQuery({
		queryKey: ["symbol-price-history", symbol, selectedPeriod],
		queryFn: () => fetchPriceHistory(symbol, selectedPeriod),
		initialData:
			selectedPeriod === initialPeriod ? () => initialPriceHistory : undefined,
		placeholderData: (previousData) => previousData,
	});
	const priceHistory = historyQuery.data ?? { history: [], change: null };

	return (
		<section className="rounded-box border border-base-300 bg-base-100 p-6 shadow-sm sm:p-8">
			<div className="mb-6 space-y-4">
				<p className="text-sm font-medium uppercase tracking-[0.2em] text-base-content/55">
					Price history
				</p>
				<div className="flex flex-wrap items-center gap-3">
					<h2 className="text-2xl font-semibold leading-none text-base-content">
						{periodTitle}
					</h2>
					{priceHistory.change === null ? (
						<span className="badge badge-neutral badge-outline relative top-0.5">
							N/A
						</span>
					) : (
						<span className={getChangeClassName(priceHistory.change.amount)}>
							{formatSignedCurrency(priceHistory.change.amount, currency, {
								maximumFractionDigits: 2,
								minimumFractionDigits: 2,
							})}{" "}
							(
							{formatSignedPercent(priceHistory.change.percentage, {
								maximumFractionDigits: 2,
								minimumFractionDigits: 2,
							})}
							)
						</span>
					)}
				</div>
				<fieldset
					aria-label="Select price history period"
					className="max-w-full overflow-x-auto pb-1"
				>
					<div className="join">
						{PRICE_HISTORY_PERIOD_OPTIONS.map((option) => {
							const isSelected = option.value === selectedPeriod;

							return (
								<button
									aria-pressed={isSelected}
									className={`btn btn-sm join-item ${isSelected ? "btn-primary" : "btn-ghost"}`}
									key={option.value}
									onClick={() => setSelectedPeriod(option.value)}
									type="button"
								>
									{option.label}
								</button>
							);
						})}
					</div>
				</fieldset>
			</div>

			{historyQuery.isError && (
				<div className="alert alert-error mb-4">
					<span>Unable to load price history for {periodLabel}.</span>
				</div>
			)}

			<div className="relative">
				<SymbolPriceHistoryChart
					currency={currency}
					history={priceHistory.history}
					periodLabel={periodTitle}
				/>
				{historyQuery.isFetching && (
					<div className="absolute right-3 top-3 rounded-full border border-base-300 bg-base-100/90 px-3 py-1 text-xs font-medium text-base-content shadow-sm">
						<span className="loading loading-spinner loading-xs mr-2 align-[-0.125em]" />
						Updating
					</div>
				)}
			</div>
		</section>
	);
}
