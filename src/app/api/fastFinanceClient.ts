import "server-only";
import { requestJson } from "@/api/httpClient.ts";
import type {
	HistoricalPrice,
	Period,
	StockFinancials,
	StockPrice,
} from "@/domain/symbol/symbolTypes.ts";

export type TrendingSymbolsResponse = {
	symbols: SymbolPriceResponse[];
};

type SymbolsPriceRequest = {
	symbols: string[];
};

export type SymbolPriceResponse = {
	symbol: string;
	companyName: string;
	currentPrice: number;
	previousClose: number;
	currency: string;
};

const PROVIDER = "fastfinance";

const TRENDING_SYMBOLS = ["AAPL", "MSFT"];

function getFastFinanceBaseUrl(): string {
	const baseUrl = process.env.FASTFINANCE_BASE_URL;
	if (!baseUrl) {
		throw new Error("FASTFINANCE_BASE_URL is not configured");
	}

	return baseUrl;
}

function getFastFinanceHeaders(): HeadersInit | undefined {
	const apiKey = process.env.FASTFINANCE_API_KEY;
	if (!apiKey) {
		return undefined;
	}

	return {
		Authorization: `Bearer ${apiKey}`,
	};
}

export async function getTrendingSymbolsPrice(): Promise<TrendingSymbolsResponse> {
	return await requestJson<TrendingSymbolsResponse>({
		baseUrl: getFastFinanceBaseUrl(),
		method: "POST",
		provider: PROVIDER,
		url: "/price/symbols",
		headers: getFastFinanceHeaders(),
		body: { symbols: TRENDING_SYMBOLS } satisfies SymbolsPriceRequest,
	});
}

export function getStockSymbolPrice(symbol: string): Promise<StockPrice> {
	return requestJson<StockPrice>({
		baseUrl: getFastFinanceBaseUrl(),
		method: "GET",
		provider: PROVIDER,
		url: "/current-price-symbol",
		params: { symbol },
		headers: getFastFinanceHeaders(),
	});
}

export function getStockSymbolFinancials(
	symbol: string,
): Promise<StockFinancials> {
	return requestJson<StockFinancials>({
		baseUrl: getFastFinanceBaseUrl(),
		method: "GET",
		provider: PROVIDER,
		url: "/financial-details-symbol",
		params: { symbol },
		headers: getFastFinanceHeaders(),
	});
}

export function getHistoricPrices(
	symbol: string,
	period: Period,
): Promise<HistoricalPrice[]> {
	return requestJson<HistoricalPrice[]>({
		baseUrl: getFastFinanceBaseUrl(),
		method: "GET",
		provider: PROVIDER,
		url: "/historical-price",
		params: { symbol, period },
		headers: getFastFinanceHeaders(),
	});
}
