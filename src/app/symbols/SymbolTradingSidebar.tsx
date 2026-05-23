"use client";

import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { ModalWindow } from "@/components/modal/ModalWindow.tsx";
import type { CreateInvestmentOrderRequest } from "@/domain/investmentorder/investmentOrderTypes.ts";
import { formatMappedLabel } from "@/lib/formatters.ts";
import { queryTiming } from "@/query/queryTiming.ts";
import type {
	SymbolTradingContestViewModel,
	SymbolTradingOrderViewModel,
	SymbolTradingViewModel,
} from "@/symbols/domain.ts";
import { InvestmentsSection } from "@/symbols/trading/InvestmentsSection.tsx";
import { TradingOrderForm } from "@/symbols/trading/TradingOrderForm.tsx";
import {
	formatCurrency,
	formatNumber,
	getTradingQueryKey,
	hasActiveOrders,
} from "@/symbols/trading/tradingSidebarUtils.ts";

interface Props {
	symbol: string;
	currentPrice: number;
	currency: string;
	initialTradingData: SymbolTradingViewModel;
}

export interface SymbolTradingOrderRequest
	extends CreateInvestmentOrderRequest {
	contestId: number;
}

interface CancelInvestmentOrderRequest {
	contestId: number;
	orderId: number;
}

interface PendingOrderCancellation {
	contest: SymbolTradingContestViewModel;
	order: SymbolTradingOrderViewModel;
}

async function fetchTradingData(
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

async function createInvestmentOrder(
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

async function cancelInvestmentOrder({
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

export default function SymbolTradingSidebar({
	symbol,
	currentPrice,
	currency,
	initialTradingData,
}: Props) {
	const queryClient = useQueryClient();
	const [pendingCancellation, setPendingCancellation] =
		useState<PendingOrderCancellation | null>(null);
	const tradingQuery = useQuery({
		queryKey: getTradingQueryKey(symbol),
		queryFn: () => fetchTradingData(symbol),
		initialData: initialTradingData,
		refetchInterval: (query) =>
			hasActiveOrders(query.state.data) ? queryTiming.refetchIntervalMs : false,
	});

	const contests = tradingQuery.data.contests;

	const {
		isError: orderIsError,
		isPending: orderIsPending,
		mutate: createOrder,
		reset: resetOrderStatus,
	} = useMutation({
		mutationFn: createInvestmentOrder,
	});
	const {
		isError: cancelOrderIsError,
		isPending: cancelOrderIsPending,
		mutate: cancelOrder,
		reset: resetCancelOrderStatus,
	} = useMutation({
		mutationFn: cancelInvestmentOrder,
	});

	const handleCreateOrder = useCallback(
		(request: SymbolTradingOrderRequest, onSuccess: () => void) => {
			createOrder(request, {
				onSuccess: async () => {
					onSuccess();
					await queryClient.invalidateQueries({
						queryKey: getTradingQueryKey(symbol),
					});
				},
			});
		},
		[createOrder, queryClient, symbol],
	);

	const handleOrderStatusReset = useCallback(() => {
		resetOrderStatus();
	}, [resetOrderStatus]);

	const handleRequestCancelOrder = useCallback(
		(
			contest: SymbolTradingContestViewModel,
			order: SymbolTradingOrderViewModel,
		) => {
			resetCancelOrderStatus();
			setPendingCancellation({ contest, order });
		},
		[resetCancelOrderStatus],
	);

	const handleCloseCancelOrderModal = useCallback(() => {
		if (cancelOrderIsPending) {
			return;
		}

		resetCancelOrderStatus();
		setPendingCancellation(null);
	}, [cancelOrderIsPending, resetCancelOrderStatus]);

	const handleConfirmCancelOrder = useCallback(() => {
		if (!pendingCancellation) {
			return;
		}

		const orderId = pendingCancellation.order.investmentOrderId;
		if (orderId === null) {
			return;
		}

		cancelOrder(
			{
				contestId: pendingCancellation.contest.contestId,
				orderId,
			},
			{
				onSuccess: async () => {
					setPendingCancellation(null);
					await queryClient.invalidateQueries({
						queryKey: getTradingQueryKey(symbol),
					});
				},
			},
		);
	}, [cancelOrder, pendingCancellation, queryClient, symbol]);

	return (
		<div className="space-y-5">
			<section className="space-y-4 rounded-box border border-base-300 bg-base-100 p-4 shadow-sm">
				<div className="flex items-start justify-between gap-3">
					<div>
						<h2 className="text-lg font-semibold text-base-content">Trade</h2>
						<p className="text-sm text-base-content/65">
							Create orders for {symbol}.
						</p>
					</div>
					{tradingQuery.isFetching && (
						<ArrowPathIcon className="mt-1 size-5 animate-spin text-base-content/45" />
					)}
				</div>

				<TradingOrderForm
					symbol={symbol}
					currentPrice={currentPrice}
					currency={currency}
					contests={contests}
					orderIsError={orderIsError}
					orderIsPending={orderIsPending}
					onCreateOrder={handleCreateOrder}
					onOrderStatusReset={handleOrderStatusReset}
				/>
			</section>

			<section className="rounded-box border border-base-300 bg-base-100 p-4 shadow-sm">
				<InvestmentsSection
					contests={contests}
					currency={currency}
					isError={tradingQuery.isError}
					isCancellingOrder={cancelOrderIsPending}
					onCancelOrder={handleRequestCancelOrder}
				/>
			</section>

			<ModalWindow
				isOpen={pendingCancellation !== null}
				onClose={handleCloseCancelOrderModal}
				title="Cancel order?"
				hideCloseButton={cancelOrderIsPending}
				footer={
					<>
						<button
							type="button"
							className="btn btn-ghost"
							disabled={cancelOrderIsPending}
							onClick={handleCloseCancelOrderModal}
						>
							Keep order
						</button>
						<button
							type="button"
							className="btn btn-error"
							disabled={cancelOrderIsPending}
							onClick={handleConfirmCancelOrder}
						>
							{cancelOrderIsPending && (
								<span className="loading loading-spinner loading-sm" />
							)}
							Cancel order
						</button>
					</>
				}
			>
				{pendingCancellation && (
					<div className="space-y-4">
						<p className="text-sm text-base-content/70">
							This removes the active order from{" "}
							<span className="font-medium text-base-content">
								{pendingCancellation.contest.contestName}
							</span>
							.
						</p>
						<div className="rounded-box border border-base-300 bg-base-200/60 p-3 text-sm">
							<div className="flex items-center justify-between gap-3">
								<span className="text-base-content/55">Order</span>
								<span className="font-medium tabular-nums">
									#{pendingCancellation.order.investmentOrderId}
								</span>
							</div>
							<div className="mt-2 flex items-center justify-between gap-3">
								<span className="text-base-content/55">Type</span>
								<span>
									{formatMappedLabel(
										pendingCancellation.order.transactionType,
										{
											BUY: "Buy",
											SELL: "Sell",
										},
									)}
								</span>
							</div>
							<div className="mt-2 flex items-center justify-between gap-3">
								<span className="text-base-content/55">Remaining</span>
								<span className="tabular-nums">
									{formatNumber(pendingCancellation.order.remainingAmount, {
										maximumFractionDigits: 0,
									})}
								</span>
							</div>
							<div className="mt-2 flex items-center justify-between gap-3">
								<span className="text-base-content/55">Limit</span>
								<span className="tabular-nums">
									{formatCurrency(
										pendingCancellation.order.acceptedPrice,
										pendingCancellation.order.currency,
										{
											minimumFractionDigits: 2,
											maximumFractionDigits: 2,
										},
									)}
								</span>
							</div>
						</div>
						{cancelOrderIsError && (
							<div className="alert alert-error text-sm">
								Unable to cancel investment order.
							</div>
						)}
					</div>
				)}
			</ModalWindow>
		</div>
	);
}
