import Link from "next/link";
import DataTable, { TableFrame } from "@/components/table/DataTable.tsx";
import UrlTablePager from "@/components/table/UrlTablePager.tsx";
import type { ContestParticipantInvestmentOrder } from "@/domain/contests/contestParticipantTypes.ts";
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

interface Props {
	orders: ContestParticipantInvestmentOrder[];
	contestId: number;
	pageSize: number;
	currentPage: number;
}

const orderHeaderItems = [
	"Order",
	"Symbol",
	"Type",
	"Status",
	"Remaining",
	"Limit",
	"Expires",
];

function getOrderStatusBadgeClassName(status: InvestmentOrderStatus): string {
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

export default function ContestInvestmentOrdersTable({
	orders,
	contestId,
	pageSize,
	currentPage,
}: Props) {
	const pageStart = currentPage * pageSize;
	const pageOrders = orders.slice(pageStart, pageStart + pageSize);

	return (
		<TableFrame>
			<DataTable
				items={pageOrders}
				headerItems={orderHeaderItems}
				renderRow={(order) => (
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
							<span className={getOrderStatusBadgeClassName(order.orderStatus)}>
								{formatMappedLabel(order.orderStatus, {
									ACTIVE: "Active",
									COMPLETED: "Completed",
									FAILED: "Failed",
									TERMINATED: "Terminated",
								})}
							</span>
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
							{formatCurrency(order.acceptedPrice, order.currency)}
						</td>
						<td className="tabular-nums">
							{order.expirationTime
								? formatDateTimeValue(order.expirationTime, "dd/MM HH:mm")
								: "-"}
						</td>
					</tr>
				)}
			/>
			<UrlTablePager
				currentPage={currentPage}
				pageSize={pageSize}
				totalEntriesCount={orders.length}
				basePath={`/contest/${contestId}?view=orders`}
			/>
		</TableFrame>
	);
}
