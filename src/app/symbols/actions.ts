"use server";

import { apiGet } from "@/api/apiWrapper.ts";
import type { Contest } from "@/contest/contestTypes.ts";
import type { StockPrice } from "@/symbols/symbolTypes.ts";

type TrendingSymbolsResponse = {
	symbols: StockPrice[];
};

export async function getTrendingSymbolsPrice(): Promise<StockPrice[]> {
	const response = await apiGet<TrendingSymbolsResponse>({
		url: `/symbols/price/trending`,
	});
	return response.symbols;
}

export async function getUnregisteredContests(): Promise<Contest[]> {
	return await apiGet<Contest[]>({
		url: `/participants/unregistered`,
	});
}
