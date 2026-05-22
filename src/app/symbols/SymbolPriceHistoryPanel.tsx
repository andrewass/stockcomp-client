"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import type { Period } from "@/domain/symbol/symbolTypes.ts";
import type { SymbolPriceHistoryPoint } from "@/symbols/domain.ts";
import {
	getPriceHistoryPeriodLabel,
	PRICE_HISTORY_PERIOD_OPTIONS,
} from "@/symbols/priceHistoryPeriods.ts";
import { SymbolPriceHistoryChart } from "@/symbols/SymbolPriceHistoryChart.tsx";

interface Props {
	currency: string;
	initialHistory: SymbolPriceHistoryPoint[];
	initialPeriod: Period;
	symbol: string;
}

type PriceHistoryResponse = {
	history: SymbolPriceHistoryPoint[];
};

async function fetchPriceHistory(
	symbol: string,
	period: Period,
): Promise<SymbolPriceHistoryPoint[]> {
	const searchParams = new URLSearchParams({ symbol, period });
	const response = await fetch(
		`/symbols/api/price-history?${searchParams.toString()}`,
		{ cache: "no-store" },
	);

	if (!response.ok) {
		throw new Error("Unable to load price history.");
	}

	const payload = (await response.json()) as PriceHistoryResponse;
	return payload.history;
}

export function SymbolPriceHistoryPanel({
	currency,
	initialHistory,
	initialPeriod,
	symbol,
}: Props) {
	const [selectedPeriod, setSelectedPeriod] = useState<Period>(initialPeriod);
	const periodLabel = getPriceHistoryPeriodLabel(selectedPeriod);
	const historyQuery = useQuery({
		queryKey: ["symbol-price-history", symbol, selectedPeriod],
		queryFn: () => fetchPriceHistory(symbol, selectedPeriod),
		initialData:
			selectedPeriod === initialPeriod ? () => initialHistory : undefined,
		placeholderData: (previousData) => previousData,
	});
	const history = historyQuery.data ?? [];

	return (
		<section className="rounded-box border border-base-300 bg-base-100 p-6 shadow-sm sm:p-8">
			<div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
				<div>
					<p className="text-sm font-medium uppercase tracking-[0.2em] text-base-content/55">
						Price history
					</p>
					<h2 className="mt-2 text-2xl font-semibold text-base-content">
						{periodLabel} trend
					</h2>
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
					history={history}
					periodLabel={periodLabel}
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
