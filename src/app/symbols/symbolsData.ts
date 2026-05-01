import "server-only";
import {
	getHistoricPrices,
	getStockSymbolFinancials,
	getStockSymbolPrice,
	getTrendingSymbolsPrice,
	TrendingSymbolsResponse,
} from "@/api/fastFinanceClient.ts";
import type {
	HistoricalPrice,
	Period,
	StockFinancials,
	StockPrice,
} from "@/domain/symbol/symbolTypes.ts";

function normalizeSymbol(symbol: string): string {
	const normalizedSymbol = symbol.trim().toUpperCase();
	if (!normalizedSymbol) {
		throw new Error("Symbol is required.");
	}

	return normalizedSymbol;
}

export function getTrendingSymbolsPageData(): Promise<TrendingSymbolsResponse> {
	return getTrendingSymbolsPrice();
}

export function getSymbolPriceData(symbol: string): Promise<StockPrice> {
	return getStockSymbolPrice(normalizeSymbol(symbol));
}

export function getSymbolFinancialsData(
	symbol: string,
): Promise<StockFinancials> {
	return getStockSymbolFinancials(normalizeSymbol(symbol));
}

export function getHistoricalPricesData(
	symbol: string,
	period: Period,
): Promise<HistoricalPrice[]> {
	return getHistoricPrices(normalizeSymbol(symbol), period);
}
