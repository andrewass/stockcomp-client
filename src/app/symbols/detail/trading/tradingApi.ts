import type { CreateInvestmentOrderRequest } from "@/domain/investmentorder/investmentOrderTypes.ts";
import type { SymbolTradingViewModel } from "@/symbols/domain.ts";

export interface SymbolTradingOrderRequest
	extends CreateInvestmentOrderRequest {
	contestId: number;
}

interface CancelInvestmentOrderRequest {
	contestId: number;
	orderId: number;
}

export async function fetchTradingData(
	symbol: string,
): Promise<SymbolTradingViewModel> {
	const response = await fetch(
		`/symbols/api/trading?symbol=${encodeURIComponent(symbol)}`,
	);
	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}

	return (await response.json()) as SymbolTradingViewModel;
}

export async function createInvestmentOrder(
	request: SymbolTradingOrderRequest,
): Promise<void> {
	const response = await fetch("/symbols/api/trading/orders", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(request),
	});

	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}
}

export async function cancelInvestmentOrder({
	contestId,
	orderId,
}: CancelInvestmentOrderRequest): Promise<void> {
	const searchParams = new URLSearchParams({
		contestId: contestId.toString(),
		orderId: orderId.toString(),
	});
	const response = await fetch(
		`/symbols/api/trading/orders?${searchParams.toString()}`,
		{
			method: "DELETE",
		},
	);

	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}
}
