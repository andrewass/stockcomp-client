import { notFound } from "next/navigation";
import SymbolDetailView from "@/symbols/detail/SymbolDetailView.tsx";
import { getSymbolDetailData } from "@/symbols/detail/symbolDetailData.ts";
import SymbolTradingSidebar from "@/symbols/detail/trading/SymbolTradingSidebar.tsx";
import { getSymbolTradingData } from "@/symbols/detail/trading/tradingData.ts";

interface Props {
	params: Promise<{ symbol: string }>;
}

export default async function SymbolDetailsPage({ params }: Props) {
	const { symbol } = await params;
	const normalizedSymbol = symbol.trim().toUpperCase();

	if (!normalizedSymbol) {
		notFound();
	}

	const [symbolDetail, tradingData] = await Promise.all([
		getSymbolDetailData(normalizedSymbol),
		getSymbolTradingData(normalizedSymbol),
	]);

	if (symbolDetail === null) {
		notFound();
	}

	return (
		<SymbolDetailView
			symbolDetail={symbolDetail}
			tradingPanel={
				<SymbolTradingSidebar
					symbol={symbolDetail.symbol}
					currentPrice={symbolDetail.currentPrice}
					currency={symbolDetail.currency}
					initialTradingData={tradingData}
				/>
			}
		/>
	);
}
