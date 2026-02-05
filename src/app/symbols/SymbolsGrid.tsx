import Link from "next/dist/client/link";
import type { StockPrice } from "@/symbols/symbolTypes.ts";

type Props = {
	symbols: StockPrice[];
};

export function SymbolsGrid({ symbols }: Props) {
	return (
		<div className="grid grid-cols-2 gap-4">
			{symbols.map((symbol) => (
				<Link href={`/symbols/${symbol.symbol}`}>
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
