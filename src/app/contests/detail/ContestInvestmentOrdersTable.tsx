import Link from "next/link";
import type { ContestParticipantInvestmentOrder } from "@/domain/contests/contestParticipantTypes.ts";
import { ORDER_STATUS } from "@/domain/investmentorder/investmentOrderTypes.ts";
import {
	formatCurrency,
	formatDateTimeValue,
	formatMappedLabel,
	formatNumber,
} from "@/lib/formatters.ts";

interface Props {
	orders: ContestParticipantInvestmentOrder[];
}

function getOrderStatusBadgeClassName(status: string): string {
	switch (status) {
		case ORDER_STATUS.ACTIVE:
			return "badge badge-info badge-outline";
		case ORDER_STATUS.COMPLETED:
			return "badge badge-success badge-outline";
		case ORDER_STATUS.FAILED:
		case ORDER_STATUS.TERMINATED:
			return "badge badge-error badge-outline";
		default:
			return "badge badge-neutral badge-outline";
	}
}

function getOrderKey(order: ContestParticipantInvestmentOrder): string {
	if (order.orderId !== null) {
		return `order-${order.orderId}`;
	}

	return [
		"order",
		order.symbol,
		order.transactionType,
		order.totalAmount,
		order.remainingAmount,
		order.acceptedPrice,
		order.currency,
		order.orderStatus,
		order.expirationTime,
	].join("-");
}

export default function ContestInvestmentOrdersTable({ orders }: Props) {
	return (
		<section className="space-y-3">
			<div className="space-y-1">
				<h3 className="text-lg font-semibold text-base-content">
					My investment orders
				</h3>
				<p className="text-sm text-base-content/70">
					Active and completed orders in this contest.
				</p>
			</div>
			{orders.length === 0 ? (
				<div className="rounded-box border border-dashed border-base-300 bg-base-200/40 px-4 py-5 text-sm text-base-content/60">
					No investment orders in this contest yet.
				</div>
			) : (
				<div className="overflow-x-auto rounded-box border border-base-300">
					<table className="table table-zebra">
						<thead>
							<tr>
								<th>Order</th>
								<th>Symbol</th>
								<th>Type</th>
								<th>Status</th>
								<th className="text-right">Remaining</th>
								<th className="text-right">Limit</th>
								<th className="text-right">Expires</th>
							</tr>
						</thead>
						<tbody>
							{orders.map((order) => (
								<tr key={getOrderKey(order)}>
									<td>{order.orderId === null ? "-" : `#${order.orderId}`}</td>
									<td>
										<Link
											href={`/symbols/${order.symbol}`}
											className="font-medium hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
										>
											{order.symbol}
										</Link>
									</td>
									<td>
										{formatMappedLabel(order.transactionType, {
											BUY: "Buy",
											SELL: "Sell",
										})}
									</td>
									<td>
										<span
											className={getOrderStatusBadgeClassName(
												order.orderStatus,
											)}
										>
											{formatMappedLabel(order.orderStatus, {
												ACTIVE: "Active",
												COMPLETED: "Completed",
												FAILED: "Failed",
												TERMINATED: "Terminated",
											})}
										</span>
									</td>
									<td className="text-right tabular-nums">
										{formatNumber(order.remainingAmount, {
											maximumFractionDigits: 0,
										})}{" "}
										/{" "}
										{formatNumber(order.totalAmount, {
											maximumFractionDigits: 0,
										})}
									</td>
									<td className="text-right tabular-nums">
										{formatCurrency(order.acceptedPrice, order.currency)}
									</td>
									<td className="text-right tabular-nums">
										{order.expirationTime
											? formatDateTimeValue(order.expirationTime, "dd/MM HH:mm")
											: "-"}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</section>
	);
}
