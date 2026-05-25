"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import { queryTiming } from "@/query/queryTiming.ts";
import {
	getTradingQueryKey,
	hasActiveOrders,
} from "@/symbols/detail/trading/tradingSidebarUtils.ts";
import type { SymbolTradingOrderRequest } from "@/symbols/detail/trading/tradingTypes.ts";
import type {
	SymbolTradingContestViewModel,
	SymbolTradingOrderViewModel,
	SymbolTradingViewModel,
} from "@/symbols/domain.ts";

interface Options {
	symbol: string;
	initialTradingData: SymbolTradingViewModel;
}

interface PendingOrderCancellation {
	contest: SymbolTradingContestViewModel;
	order: SymbolTradingOrderViewModel;
}

interface CancelInvestmentOrderRequest {
	contestId: number;
	orderId: number;
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

export function useSymbolTradingSidebar({
	symbol,
	initialTradingData,
}: Options) {
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

	return {
		contests: tradingQuery.data.contests,
		tradingIsError: tradingQuery.isError,
		tradingIsFetching: tradingQuery.isFetching,
		orderIsError,
		orderIsPending,
		cancelOrderIsError,
		cancelOrderIsPending,
		pendingCancellation,
		handleCreateOrder,
		handleOrderStatusReset,
		handleRequestCancelOrder,
		handleCloseCancelOrderModal,
		handleConfirmCancelOrder,
	};
}
