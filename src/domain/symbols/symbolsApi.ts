import { CLIENT_BACKEND_BASE_PATH } from "../../config/properties";
import type { Period } from "./symbolTypes";

export const GET_PRICE_TRENDING_SYMBOLS = "getTrendingSymbols";
export const GET_STOCK_SYMBOL_FINANCIALS = "getStockSymbolFinancials";
export const GET_STOCK_SYMBOL_PRICE = "getStockSymbolPrice";
export const GET_HISTORIC_PRICES = "getHistoricPrices";

const BACKEND_PATH_STOCK = `${CLIENT_BACKEND_BASE_PATH}/stock`;

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

export const getTrendingSymbolsPriceConfig = () => {
	return {
		method: "get",
		url: `${BACKEND_PATH_STOCK}/current-price-trending-symbols`,
	};
};
