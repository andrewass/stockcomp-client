import { TrashIcon } from "@heroicons/react/24/outline";
import {
	type InvestmentOrderStatus,
	ORDER_STATUS,
} from "@/domain/investmentorder/investmentOrderTypes.ts";
import {
	formatCurrency,
	formatDateTimeValue,
	formatMappedLabel,
	formatNumber,
} from "@/lib/formatters.ts";
import type { SymbolTradingOrderViewModel } from "@/symbols/domain.ts";

interface Props {
	order: SymbolTradingOrderViewModel;
	isCancellingOrder: boolean;
	onCancelOrder: (order: SymbolTradingOrderViewModel) => void;
}

function getOrderStatusBadgeClassName(status: InvestmentOrderStatus): string {
	switch (status) {
		case ORDER_STATUS.COMPLETED:
			return "badge badge-neutral badge-outline";
		case ORDER_STATUS.FAILED:
		case ORDER_STATUS.TERMINATED:
			return "badge badge-error badge-outline";
		case ORDER_STATUS.ACTIVE:
			return "badge badge-success badge-outline";
		default:
			return "badge badge-neutral badge-outline";
	}
}

export function OrderListItem({
	order,
	isCancellingOrder,
	onCancelOrder,
}: Props) {
	const canCancel =
		order.orderStatus === ORDER_STATUS.ACTIVE &&
		order.investmentOrderId !== null;

	return (
		<tr>
			<td>
				<p className="font-medium tabular-nums">
					{order.investmentOrderId === null
						? "—"
						: `#${order.investmentOrderId}`}
				</p>
				<p className="text-xs text-base-content/50">
					{formatMappedLabel(order.transactionType, {
						BUY: "Buy",
						SELL: "Sell",
					})}
				</p>
			</td>
			<td className="tabular-nums">
				{formatNumber(order.remainingAmount, {
					maximumFractionDigits: 0,
				})}{" "}
				/{" "}
				{formatNumber(order.totalAmount, {
					maximumFractionDigits: 0,
				})}
			</td>
			<td className="tabular-nums">
				{formatCurrency(order.acceptedPrice, order.currency, {
					minimumFractionDigits: 2,
					maximumFractionDigits: 2,
				})}
			</td>
			<td className="tabular-nums">
				{order.expirationTime
					? formatDateTimeValue(order.expirationTime, "dd/MM HH:mm")
					: "—"}
			</td>
			<td>
				<span className={getOrderStatusBadgeClassName(order.orderStatus)}>
					{formatMappedLabel(order.orderStatus, {
						ACTIVE: "Active",
						COMPLETED: "Completed",
						FAILED: "Failed",
						TERMINATED: "Terminated",
					})}
				</span>
			</td>
			<td className="text-right">
				{canCancel ? (
					<button
						type="button"
						className="btn btn-ghost btn-xs btn-square text-base-content/55 hover:bg-error/10 hover:text-error"
						disabled={isCancellingOrder}
						onClick={() => onCancelOrder(order)}
						aria-label={`Cancel order ${order.investmentOrderId}`}
						title="Cancel order"
					>
						<TrashIcon className="size-4" aria-hidden="true" />
					</button>
				) : null}
			</td>
		</tr>
	);
}
