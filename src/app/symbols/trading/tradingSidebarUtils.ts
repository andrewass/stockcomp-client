import { ORDER_STATUS } from "@/domain/investmentorder/investmentOrderTypes.ts";
import type { SymbolTradingViewModel } from "@/symbols/domain.ts";

const terminalOrderStatuses = new Set<string>([
	ORDER_STATUS.COMPLETED,
	ORDER_STATUS.FAILED,
	ORDER_STATUS.TERMINATED,
]);

export function getTradingQueryKey(symbol: string) {
	return ["symbols", "trading", symbol] as const;
}

export function hasActiveOrders(
	data: SymbolTradingViewModel | undefined,
): boolean {
	return (
		data?.contests.some((contest) =>
			contest.orders.some(
				(order) => !terminalOrderStatuses.has(order.orderStatus),
			),
		) ?? false
	);
}

export function formatCurrency(
	value: number,
	currency: string,
	options?: Intl.NumberFormatOptions,
): string {
	try {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency,
			...options,
		}).format(value);
	} catch {
		return new Intl.NumberFormat("en-US", {
			maximumFractionDigits: 2,
			...options,
		}).format(value);
	}
}

export function formatNumber(
	value: number,
	options?: Intl.NumberFormatOptions,
): string {
	return new Intl.NumberFormat("en-US", options).format(value);
}
