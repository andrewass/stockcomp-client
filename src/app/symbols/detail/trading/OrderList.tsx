"use client";

import { useState } from "react";
import PageableTable from "@/components/table/PageableTable.tsx";
import TablePager from "@/components/table/TablePager.tsx";
import {
	type InvestmentOrderStatus,
	ORDER_STATUS,
} from "@/domain/investmentorder/investmentOrderTypes.ts";
import { OrderListItem } from "@/symbols/detail/trading/OrderListItem.tsx";
import type { SymbolTradingOrderViewModel } from "@/symbols/domain.ts";

const ORDERS_PER_PAGE = 5;

type OrderFilter = InvestmentOrderStatus | "ALL";

interface OrderFilterOption {
	label: string;
	value: OrderFilter;
}

const ORDER_FILTER_OPTIONS: readonly OrderFilterOption[] = [
	{ label: "All", value: "ALL" },
	{ label: "Active", value: ORDER_STATUS.ACTIVE },
	{ label: "Completed", value: ORDER_STATUS.COMPLETED },
	{ label: "Failed", value: ORDER_STATUS.FAILED },
	{ label: "Terminated", value: ORDER_STATUS.TERMINATED },
];
const ORDER_HEADERS = ["Order", "Remaining", "Limit", "Expires", "Status", ""];

type OrderTableEntry = SymbolTradingOrderViewModel & { id: string };

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

function compareOrdersByIdDescending(
	firstOrder: SymbolTradingOrderViewModel,
	secondOrder: SymbolTradingOrderViewModel,
): number {
	if (firstOrder.investmentOrderId === null) {
		return secondOrder.investmentOrderId === null ? 0 : 1;
	}

	if (secondOrder.investmentOrderId === null) {
		return -1;
	}

	return secondOrder.investmentOrderId - firstOrder.investmentOrderId;
}

export function OrderList({ orders, isCancellingOrder, onCancelOrder }: Props) {
	const [statusFilter, setStatusFilter] = useState<OrderFilter>("ALL");
	const [orderPage, setOrderPage] = useState(0);
	const filteredOrders = (
		statusFilter === "ALL"
			? [...orders]
			: orders.filter((order) => order.orderStatus === statusFilter)
	).sort(compareOrdersByIdDescending);
	const pageCount = Math.max(
		1,
		Math.ceil(filteredOrders.length / ORDERS_PER_PAGE),
	);
	const currentPage = Math.min(orderPage, pageCount - 1);
	const firstVisibleOrderIndex = currentPage * ORDERS_PER_PAGE;
	const visibleOrders = filteredOrders
		.slice(firstVisibleOrderIndex, firstVisibleOrderIndex + ORDERS_PER_PAGE)
		.map((order) => ({ ...order, id: getOrderKey(order) }));

	function getFilterCount(filter: OrderFilter): number {
		return filter === "ALL"
			? orders.length
			: orders.filter((order) => order.orderStatus === filter).length;
	}

	function handleStatusFilterChange(nextFilter: OrderFilter) {
		setStatusFilter(nextFilter);
		setOrderPage(0);
	}

	return (
		<div className="space-y-3">
			{orders.length > 0 ? (
				<div className="flex justify-end">
					<label className="flex w-full items-center gap-2 text-sm sm:w-auto">
						<span className="shrink-0 text-base-content/60">Status</span>
						<select
							className="select select-bordered select-sm w-full sm:w-44"
							value={statusFilter}
							onChange={(event) =>
								handleStatusFilterChange(event.target.value as OrderFilter)
							}
						>
							{ORDER_FILTER_OPTIONS.map((option) => (
								<option key={option.value} value={option.value}>
									{option.label} ({getFilterCount(option.value)})
								</option>
							))}
						</select>
					</label>
				</div>
			) : null}
			{orders.length === 0 ? (
				<p className="text-sm text-base-content/55">
					No orders for this symbol.
				</p>
			) : filteredOrders.length === 0 ? (
				<div className="rounded-box border border-dashed border-base-300 bg-base-100 px-4 py-5 text-sm text-base-content/55">
					No {statusFilter.toLowerCase()} orders for this symbol.
				</div>
			) : (
				<PageableTable<OrderTableEntry>
					compact
					items={visibleOrders}
					headerItems={ORDER_HEADERS}
					pagination={
						pageCount > 1 ? (
							<TablePager
								currentPage={currentPage}
								totalPages={pageCount}
								onPageChange={setOrderPage}
							/>
						) : null
					}
					renderRow={(order) => (
						<OrderListItem
							key={order.id}
							order={order}
							isCancellingOrder={isCancellingOrder}
							onCancelOrder={onCancelOrder}
						/>
					)}
				/>
			)}
		</div>
	);
}
