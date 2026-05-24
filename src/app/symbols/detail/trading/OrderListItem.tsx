import { TrashIcon } from "@heroicons/react/24/outline";
import { ORDER_STATUS } from "@/domain/investmentorder/investmentOrderTypes.ts";
import { formatDateTimeValue, formatMappedLabel } from "@/lib/formatters.ts";
import {
	formatCurrency,
	formatNumber,
} from "@/symbols/detail/trading/tradingSidebarUtils.ts";
import type { SymbolTradingOrderViewModel } from "@/symbols/domain.ts";

interface Props {
	order: SymbolTradingOrderViewModel;
	isCancellingOrder: boolean;
	onCancelOrder: (order: SymbolTradingOrderViewModel) => void;
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

export function OrderListItem({
	order,
	isCancellingOrder,
	onCancelOrder,
}: Props) {
	const canCancel =
		order.orderStatus === ORDER_STATUS.ACTIVE &&
		order.investmentOrderId !== null;

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
				<div className="flex shrink-0 items-center gap-1.5">
					<span className={getOrderStatusBadgeClassName(order.orderStatus)}>
						{formatMappedLabel(order.orderStatus, {
							ACTIVE: "Active",
							COMPLETED: "Completed",
							FAILED: "Failed",
							TERMINATED: "Terminated",
						})}
					</span>
					{canCancel && (
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
					)}
				</div>
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
