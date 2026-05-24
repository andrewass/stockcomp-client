import { OrderListItem } from "@/symbols/detail/trading/OrderListItem.tsx";
import type { SymbolTradingOrderViewModel } from "@/symbols/domain.ts";

interface Props {
	orders: SymbolTradingOrderViewModel[];
	isCancellingOrder: boolean;
	onCancelOrder: (order: SymbolTradingOrderViewModel) => void;
}

function getOrderKey(order: SymbolTradingOrderViewModel): string {
	if (order.investmentOrderId !== null) {
		return `order-${order.investmentOrderId}`;
	}

	return [
		"order",
		order.transactionType,
		order.totalAmount,
		order.remainingAmount,
		order.acceptedPrice,
		order.currency,
		order.orderStatus,
		order.expirationTime,
	].join("-");
}

export function OrderList({ orders, isCancellingOrder, onCancelOrder }: Props) {
	return (
		<div className="mt-4 space-y-2">
			<div className="flex items-center justify-between gap-3">
				<p className="text-xs font-semibold uppercase tracking-[0.16em] text-base-content/45">
					Orders
				</p>
				{orders.length > 2 && (
					<span className="text-xs text-base-content/50">
						Scroll to view all
					</span>
				)}
			</div>
			{orders.length === 0 ? (
				<p className="text-sm text-base-content/55">
					No orders for this symbol.
				</p>
			) : (
				<div
					className={`space-y-2 ${
						orders.length > 2
							? "max-h-56 overflow-y-auto overscroll-contain pr-1 [scrollbar-gutter:stable]"
							: ""
					}`}
				>
					{orders.map((order) => (
						<OrderListItem
							key={getOrderKey(order)}
							order={order}
							isCancellingOrder={isCancellingOrder}
							onCancelOrder={onCancelOrder}
						/>
					))}
				</div>
			)}
		</div>
	);
}
