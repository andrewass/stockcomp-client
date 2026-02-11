import { useQuery } from "@tanstack/react-query";
import Link from "next/dist/client/link";
import { getTrendingSymbolsPrice } from "@/symbols/actions.ts";
import type { StockPrice } from "@/symbols/symbolTypes.ts";

const FETCH_QUOTE_INTERVAL = 5000;
const GET_PRICE_TRENDING_SYMBOLS = "getTrendingSymbols";

export function SymbolsGrid() {
	const {
		isError,
		isPending,
		error,
		data: symbols,
	} = useQuery<StockPrice[]>({
		queryKey: [GET_PRICE_TRENDING_SYMBOLS],
		queryFn: getTrendingSymbolsPrice,
		refetchInterval: FETCH_QUOTE_INTERVAL,
	});

	if (isError) return <p>Error: {error?.message}</p>;
	if (isPending) return <p>Loading...</p>;

	return (
		<div className="grid grid-cols-2 gap-4">
			{symbols.map((symbol) => (
				<Link key={symbol.symbol} href={`/symbols/${symbol.symbol}`}>
					<div
						key={symbol.symbol}
						className="border border-base-300 p-4 flex flex-col"
					>
						<span>
							{symbol.companyName} ({symbol.symbol})
						</span>
						<span>
							{symbol.currency} {symbol.currentPrice}
						</span>
						<span>{symbol.percentageChange.toFixed(2)}%</span>
					</div>
				</Link>
			))}
		</div>
	);
}
