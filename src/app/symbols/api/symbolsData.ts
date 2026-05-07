import "server-only";
import type { SymbolPriceResponse } from "@/api/fastFinanceClient.ts";
import { getTrendingSymbolsPrice } from "@/api/fastFinanceClient.ts";
import type { SymbolCardViewModel } from "@/symbols/domain.ts";

function mapToCardViewModel(
	symbolPrice: SymbolPriceResponse,
): SymbolCardViewModel {
	const priceChange = symbolPrice.currentPrice - symbolPrice.previousClose;
	const percentageChange =
		symbolPrice.previousClose === 0
			? 0
			: (priceChange / symbolPrice.previousClose) * 100;

	return {
		symbol: symbolPrice.symbol,
		companyName: symbolPrice.companyName,
		currentPrice: symbolPrice.currentPrice,
		priceChange,
		percentageChange,
		currency: symbolPrice.currency,
	};
}

export async function getTrendingSymbolsData(): Promise<SymbolCardViewModel[]> {
	const symbols = await getTrendingSymbolsPrice();
	return symbols.map(mapToCardViewModel);
}
