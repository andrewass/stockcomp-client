import "server-only";
import {
	getStockSymbolFinancials,
	getStockSymbolPrice,
} from "@/api/fastFinanceClient.ts";
import { isApiHttpStatusError } from "@/api/httpClient.ts";
import type { Period } from "@/domain/symbol/symbolTypes.ts";
import type { SymbolDetailViewModel } from "@/symbols/domain.ts";
import { getSymbolPriceHistoryData } from "@/symbols/priceHistoryData.ts";
import { DEFAULT_PRICE_HISTORY_PERIOD } from "@/symbols/priceHistoryPeriods.ts";

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

export async function getSymbolDetailData(
	symbol: string,
	historyPeriod: Period = DEFAULT_PRICE_HISTORY_PERIOD,
): Promise<SymbolDetailViewModel | null> {
	const normalizedSymbol = normalizeSymbol(symbol);
	if (!normalizedSymbol) {
		return null;
	}

	try {
		const [price, financials, history] = await Promise.all([
			getStockSymbolPrice(normalizedSymbol),
			getStockSymbolFinancials(normalizedSymbol),
			getSymbolPriceHistoryData(normalizedSymbol, historyPeriod),
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
			history,
		};
	} catch (error) {
		if (isApiHttpStatusError(error, 404)) {
			return null;
		}

		throw error;
	}
}
