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

const LIVE_PRICE_REQUEST_OPTIONS = {
	cache: "no-store",
} satisfies Pick<RequestInit, "cache">;

const FUNDAMENTALS_REQUEST_OPTIONS = {
	next: { revalidate: 60 * 60 },
} satisfies { next: NextFetchRequestConfig };

const HISTORY_REQUEST_OPTIONS = {
	next: { revalidate: 60 * 60 },
} satisfies { next: NextFetchRequestConfig };

const TRENDING_SYMBOLS = [
	"AAPL",
	"MSFT",
	"AMZN",
	"META",
	"TSLA",
	"GOOGL",
	"AMD",
	"NVDA",
	"NFLX",
];

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

export async function getTrendingSymbolsPrice(): Promise<
	SymbolPriceResponse[]
> {
	return await requestJson<SymbolPriceResponse[]>({
		baseUrl: getFastFinanceBaseUrl(),
		method: "POST",
		provider: PROVIDER,
		url: "/price/symbols",
		...LIVE_PRICE_REQUEST_OPTIONS,
		headers: getFastFinanceHeaders(),
		body: { symbols: TRENDING_SYMBOLS } satisfies SymbolsPriceRequest,
	});
}

export function getStockSymbolPrice(symbol: string): Promise<StockPrice> {
	return requestJson<StockPrice>({
		baseUrl: getFastFinanceBaseUrl(),
		method: "GET",
		provider: PROVIDER,
		url: `/price/current-price/${encodeURIComponent(symbol)}`,
		...LIVE_PRICE_REQUEST_OPTIONS,
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
		url: `/statistics/${encodeURIComponent(symbol)}`,
		...FUNDAMENTALS_REQUEST_OPTIONS,
		headers: getFastFinanceHeaders(),
	});
}

type HistoricalPricesResponse = {
	prices: HistoricalPrice[];
};

export function getHistoricPrices(
	symbol: string,
	period: Period,
): Promise<HistoricalPrice[]> {
	return requestJson<HistoricalPricesResponse>({
		baseUrl: getFastFinanceBaseUrl(),
		method: "GET",
		provider: PROVIDER,
		url: "/price/historical-prices",
		params: { symbol, period },
		...HISTORY_REQUEST_OPTIONS,
		headers: getFastFinanceHeaders(),
	}).then((response) => response.prices);
}
