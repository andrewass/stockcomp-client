import "server-only";
import { getHistoricPrices } from "@/api/fastFinanceClient.ts";
import type { HistoricalPrice, Period } from "@/domain/symbol/symbolTypes.ts";
import type { SymbolPriceHistoryPoint } from "@/symbols/domain.ts";

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

export async function getSymbolPriceHistoryData(
	symbol: string,
	period: Period,
): Promise<SymbolPriceHistoryPoint[]> {
	const normalizedSymbol = normalizeSymbol(symbol);
	if (!normalizedSymbol) {
		return [];
	}

	const history = await getHistoricPrices(normalizedSymbol, period);

	return history
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
}
