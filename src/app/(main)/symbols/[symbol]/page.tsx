import { notFound } from "next/navigation";
import { getSymbolTradingData } from "@/symbols/api/tradingData.ts";
import SymbolDetailView from "@/symbols/SymbolDetailView.tsx";
import SymbolTradingSidebar from "@/symbols/SymbolTradingSidebar.tsx";
import { getSymbolDetailData } from "@/symbols/symbolDetailData.ts";

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
