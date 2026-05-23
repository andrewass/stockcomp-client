import { Period } from "@/domain/symbol/symbolTypes.ts";

export const DEFAULT_PRICE_HISTORY_PERIOD = Period.YEAR1;

export const PRICE_HISTORY_PERIOD_OPTIONS = [
	{ label: "1W", title: "1 Week", value: Period.DAY5 },
	{ label: "1M", title: "1 Month", value: Period.MONTH1 },
	{ label: "YTD", title: "Year to date", value: Period.THIS_YEAR },
	{ label: "1Y", title: "1 Year", value: Period.YEAR1 },
	{ label: "10Y", title: "10 Years", value: Period.YEAR10 },
	{ label: "MAX", title: "Since beginning", value: Period.MAX },
] as const;

const PRICE_HISTORY_PERIOD_VALUES = new Set<Period>(
	PRICE_HISTORY_PERIOD_OPTIONS.map((option) => option.value),
);

export function parsePriceHistoryPeriod(period: string | undefined): Period {
	if (!period) {
		return DEFAULT_PRICE_HISTORY_PERIOD;
	}

	return PRICE_HISTORY_PERIOD_VALUES.has(period as Period)
		? (period as Period)
		: DEFAULT_PRICE_HISTORY_PERIOD;
}

export function getPriceHistoryPeriodLabel(period: Period): string {
	return (
		PRICE_HISTORY_PERIOD_OPTIONS.find((option) => option.value === period)
			?.label ?? "1Y"
	);
}

export function getPriceHistoryPeriodTitle(period: Period): string {
	return (
		PRICE_HISTORY_PERIOD_OPTIONS.find((option) => option.value === period)
			?.title ?? "1 Year"
	);
}
