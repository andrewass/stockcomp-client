import { Period } from "@/domain/symbol/symbolTypes.ts";

export const DEFAULT_PRICE_HISTORY_PERIOD = Period.YEAR1;

export const PRICE_HISTORY_PERIOD_OPTIONS = [
	{ label: "1W", value: Period.DAY5 },
	{ label: "1M", value: Period.MONTH1 },
	{ label: "YTD", value: Period.THIS_YEAR },
	{ label: "1Y", value: Period.YEAR1 },
	{ label: "10Y", value: Period.YEAR10 },
	{ label: "MAX", value: Period.MAX },
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
