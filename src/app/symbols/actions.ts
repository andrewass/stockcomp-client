"use server";

import type { StockPrice } from "@/symbol/symbolTypes.ts";
import { apiGet } from "../../config/apiWrapper.ts";

type TrendingSymbolsResponse = {
	symbols: StockPrice[];
};

export async function getTrendingSymbolsPrice(): Promise<StockPrice[]> {
	const response = await apiGet<TrendingSymbolsResponse>({
		method: "get",
		url: `/symbols/price/trending`,
	});
	return response.symbols;
}
