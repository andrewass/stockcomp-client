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
