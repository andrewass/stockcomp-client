"use client";

import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import type { CreateInvestmentOrderRequest } from "@/domain/investmentorder/investmentOrderTypes.ts";
import type { SymbolTradingViewModel } from "@/symbols/domain.ts";
import { InvestmentsSection } from "@/symbols/trading/InvestmentsSection.tsx";
import { TradingOrderForm } from "@/symbols/trading/TradingOrderForm.tsx";
import {
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

export default function SymbolTradingSidebar({
	symbol,
	currentPrice,
	currency,
	initialTradingData,
}: Props) {
	const queryClient = useQueryClient();
	const tradingQuery = useQuery({
		queryKey: getTradingQueryKey(symbol),
		queryFn: () => fetchTradingData(symbol),
		initialData: initialTradingData,
		refetchInterval: (query) =>
			hasActiveOrders(query.state.data) ? 5_000 : false,
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
				/>
			</section>
		</div>
	);
}
