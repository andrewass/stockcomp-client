"use client";

import { useQuery } from "@tanstack/react-query";
import type { StockPrice } from "@/symbol/symbolTypes.ts";
import { getTrendingSymbolsPrice } from "@/symbols/actions.ts";
import { SymbolsGrid } from "@/symbols/SymbolsGrid.tsx";

const FETCH_QUOTE_INTERVAL = 5000;
const GET_PRICE_TRENDING_SYMBOLS = "getTrendingSymbols";

export default function SymbolsPage() {
	const { isError, isPending, error, data } = useQuery<StockPrice[]>({
		queryKey: [GET_PRICE_TRENDING_SYMBOLS],
		queryFn: getTrendingSymbolsPrice,
		refetchInterval: FETCH_QUOTE_INTERVAL,
	});

	if (isError) return <p>Error: {error?.message}</p>;
	if (isPending) return <p>Loading...</p>;
	if (!data) return <p>No data</p>;

	return <SymbolsGrid symbols={data} />;
}
