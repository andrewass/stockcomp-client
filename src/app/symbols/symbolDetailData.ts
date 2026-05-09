import "server-only";
import {
	getHistoricPrices,
	getStockSymbolFinancials,
	getStockSymbolPrice,
} from "@/api/fastFinanceClient.ts";
import { isApiHttpStatusError } from "@/api/httpClient.ts";
import type { HistoricalPrice } from "@/domain/symbol/symbolTypes.ts";
import { Period } from "@/domain/symbol/symbolTypes.ts";
import type { SymbolDetailViewModel } from "@/symbols/domain.ts";

function normalizeSymbol(symbol: string): string {
	return symbol.trim().toUpperCase();
}

function toNullableFiniteNumber(
	value: number | null | undefined,
): number | null {
	if (value === null || value === undefined || !Number.isFinite(value)) {
		return null;
	}

	return value;
}

function mapHistoryPoint(historyPoint: HistoricalPrice) {
	return {
		price: historyPoint.price,
		priceDate: historyPoint.price_date,
	};
}

function getHistoryPointTimestamp(priceDate: string): number {
	const timestamp = Date.parse(priceDate);
	return Number.isNaN(timestamp) ? 0 : timestamp;
}

export async function getSymbolDetailData(
	symbol: string,
): Promise<SymbolDetailViewModel | null> {
	const normalizedSymbol = normalizeSymbol(symbol);
	if (!normalizedSymbol) {
		return null;
	}

	try {
		const [price, financials, history] = await Promise.all([
			getStockSymbolPrice(normalizedSymbol),
			getStockSymbolFinancials(normalizedSymbol),
			getHistoricPrices(normalizedSymbol, Period.YEAR1),
		]);

		return {
			symbol: price.symbol || normalizedSymbol,
			companyName: price.companyName || financials.companyName,
			currentPrice: price.currentPrice,
			priceChange: price.currentPrice - price.previousClose,
			percentageChange:
				price.previousClose === 0
					? 0
					: ((price.currentPrice - price.previousClose) / price.previousClose) *
						100,
			currency: price.currency || financials.currency,
			usdPrice: price.currency === "USD" ? price.currentPrice : null,
			financials: {
				marketCap: financials.marketCap,
				priceToBook: financials.priceToBook,
				priceToEarnings: financials.priceToEarnings,
				earningsPerShare: financials.earningsPerShare,
				dividendRate: toNullableFiniteNumber(financials.dividendRate),
				dividendYieldPercentage: toNullableFiniteNumber(
					financials.dividendYieldPercentage,
				),
			},
			history: history
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
				),
		};
	} catch (error) {
		if (isApiHttpStatusError(error, 404)) {
			return null;
		}

		throw error;
	}
}
