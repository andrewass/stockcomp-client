import { ORDER_STATUS } from "@/domain/investmentorder/investmentOrderTypes.ts";
import { formatDateTimeValue, formatMappedLabel } from "@/lib/formatters.ts";
import type { SymbolTradingOrderViewModel } from "@/symbols/domain.ts";
import {
	formatCurrency,
	formatNumber,
} from "@/symbols/trading/tradingSidebarUtils.ts";

interface Props {
	order: SymbolTradingOrderViewModel;
}

function getOrderStatusBadgeClassName(status: string): string {
	switch (status) {
		case ORDER_STATUS.COMPLETED:
			return "badge badge-success badge-outline";
		case ORDER_STATUS.FAILED:
		case ORDER_STATUS.TERMINATED:
			return "badge badge-error badge-outline";
		case ORDER_STATUS.ACTIVE:
			return "badge badge-info badge-outline";
		default:
			return "badge badge-neutral badge-outline";
	}
}

export function OrderListItem({ order }: Props) {
	return (
		<div className="rounded-box bg-base-200/60 px-3 py-2 text-sm">
			<div className="flex items-start justify-between gap-3">
				<div className="min-w-0">
					<p className="font-medium">
						Order{" "}
						{order.investmentOrderId === null
							? "-"
							: `#${order.investmentOrderId}`}
					</p>
					<p className="text-xs text-base-content/50">
						{formatMappedLabel(order.transactionType, {
							BUY: "Buy",
							SELL: "Sell",
						})}
					</p>
				</div>
				<span className={getOrderStatusBadgeClassName(order.orderStatus)}>
					{formatMappedLabel(order.orderStatus, {
						ACTIVE: "Active",
						COMPLETED: "Completed",
						FAILED: "Failed",
						TERMINATED: "Terminated",
					})}
				</span>
			</div>
			<div className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1 text-xs text-base-content/55">
				<span>Remaining</span>
				<span className="text-right tabular-nums">
					{formatNumber(order.remainingAmount, {
						maximumFractionDigits: 0,
					})}{" "}
					/{" "}
					{formatNumber(order.totalAmount, {
						maximumFractionDigits: 0,
					})}
				</span>
				<span>Limit</span>
				<span className="text-right tabular-nums">
					{formatCurrency(order.acceptedPrice, order.currency, {
						minimumFractionDigits: 2,
						maximumFractionDigits: 2,
					})}
				</span>
				{order.expirationTime && (
					<>
						<span>Expires</span>
						<span className="text-right tabular-nums">
							{formatDateTimeValue(order.expirationTime, "dd/MM HH:mm")}
						</span>
					</>
				)}
			</div>
		</div>
	);
}
