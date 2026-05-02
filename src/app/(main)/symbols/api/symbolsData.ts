import "server-only";
import {
	getHistoricPrices,
	getStockSymbolFinancials,
	getStockSymbolPrice,
	getTrendingSymbolsPrice,
} from "@/api/fastFinanceClient.ts";
import type { SymbolPriceResponse } from "@/api/fastFinanceClient.ts";
import type {
	HistoricalPrice,
	Period,
	SymbolCardViewModel,
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

function mapToCardViewModel(
	symbolPrice: SymbolPriceResponse,
): SymbolCardViewModel {
	const priceChange = symbolPrice.currentPrice - symbolPrice.previousClose;
	const percentageChange =
		symbolPrice.previousClose === 0
			? 0
			: (priceChange / symbolPrice.previousClose) * 100;

	return {
		symbol: symbolPrice.symbol,
		companyName: symbolPrice.companyName,
		currentPrice: symbolPrice.currentPrice,
		priceChange,
		percentageChange,
		currency: symbolPrice.currency,
	};
}

export async function getTrendingSymbolsPageData(): Promise<
	SymbolCardViewModel[]
> {
	const symbols = await getTrendingSymbolsPrice();
	return symbols.map(mapToCardViewModel);
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
