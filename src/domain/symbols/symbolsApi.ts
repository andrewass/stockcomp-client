import type { Period } from "./symbolTypes";

export const GET_PRICE_TRENDING_SYMBOLS = "getTrendingSymbols";
export const GET_STOCK_SYMBOL_FINANCIALS = "getStockSymbolFinancials";
export const GET_STOCK_SYMBOL_PRICE = "getStockSymbolPrice";

const BACKEND_PATH_STOCK = ``;

export const getStockSymbolPriceConfig = (symbol: string) => {
	return {
		method: "get",
		url: `${BACKEND_PATH_STOCK}/current-price-symbol`,
		params: { symbol },
	};
};

export const getStockSymbolFinancialsConfig = (symbol: string) => {
	return {
		method: "get",
		url: `${BACKEND_PATH_STOCK}/financial-details-symbol`,
		params: { symbol },
	};
};

export const getHistoricPricesConfig = (symbol: string, period: Period) => {
	return {
		method: "get",
		url: `${BACKEND_PATH_STOCK}/historical-price`,
		params: { symbol, period },
	};
};
