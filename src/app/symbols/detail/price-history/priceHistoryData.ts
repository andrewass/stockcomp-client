import "server-only";
import { getHistoricPrices } from "@/api/fastFinanceClient.ts";
import type { HistoricalPrice, Period } from "@/domain/symbol/symbolTypes.ts";
import type {
	SymbolPriceHistoryChangeViewModel,
	SymbolPriceHistoryPoint,
	SymbolPriceHistoryViewModel,
} from "@/symbols/domain.ts";

function normalizeSymbol(symbol: string): string {
	return symbol.trim().toUpperCase();
}

function mapHistoryPoint(
	historyPoint: HistoricalPrice,
): SymbolPriceHistoryPoint {
	return {
		price: historyPoint.price,
		priceDate: historyPoint.price_date,
	};
}

function getHistoryPointTimestamp(priceDate: string): number {
	const timestamp = Date.parse(priceDate);
	return Number.isNaN(timestamp) ? 0 : timestamp;
}

function getPriceHistoryChange(
	history: SymbolPriceHistoryPoint[],
): SymbolPriceHistoryChangeViewModel | null {
	if (history.length < 2) {
		return null;
	}

	const firstPrice = history[0]?.price;
	const lastPrice = history.at(-1)?.price;
	if (
		firstPrice === undefined ||
		lastPrice === undefined ||
		!Number.isFinite(firstPrice) ||
		!Number.isFinite(lastPrice)
	) {
		return null;
	}

	const amount = lastPrice - firstPrice;

	return {
		amount,
		percentage: firstPrice === 0 ? 0 : (amount / firstPrice) * 100,
	};
}

export async function getSymbolPriceHistoryData(
	symbol: string,
	period: Period,
): Promise<SymbolPriceHistoryViewModel> {
	const normalizedSymbol = normalizeSymbol(symbol);
	if (!normalizedSymbol) {
		return {
			history: [],
			change: null,
		};
	}

	const history = (await getHistoricPrices(normalizedSymbol, period))
		.filter(
			(historyPoint) =>
				Number.isFinite(historyPoint.price) &&
				!Number.isNaN(Date.parse(historyPoint.price_date)),
		)
		.map(mapHistoryPoint)
		.sort(
			(first, second) =>
				getHistoryPointTimestamp(first.priceDate) -
				getHistoryPointTimestamp(second.priceDate),
		);

	return {
		history,
		change: getPriceHistoryChange(history),
	};
}
