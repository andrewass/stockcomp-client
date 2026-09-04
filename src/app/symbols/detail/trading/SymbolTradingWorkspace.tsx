"use client";

import type React from "react";
import { CancelOrderModal } from "@/symbols/detail/trading/CancelOrderModal.tsx";
import { InvestmentsSection } from "@/symbols/detail/trading/InvestmentsSection.tsx";
import { TradeSection } from "@/symbols/detail/trading/TradeSection.tsx";
import { useSymbolTradingSidebar } from "@/symbols/detail/trading/useSymbolTradingSidebar.ts";
import type { SymbolTradingViewModel } from "@/symbols/domain.ts";

interface Props {
	symbol: string;
	currentPrice: number;
	currency: string;
	initialTradingData: SymbolTradingViewModel;
	priceHistoryPanel: React.ReactNode;
}

export default function SymbolTradingWorkspace({
	symbol,
	currentPrice,
	currency,
	initialTradingData,
	priceHistoryPanel,
}: Props) {
	const {
		contests,
		tradingIsError,
		tradingIsFetching,
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
	} = useSymbolTradingSidebar({ symbol, initialTradingData });

	return (
		<>
			<div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_22rem]">
				<div className="min-w-0">{priceHistoryPanel}</div>
				<aside className="xl:sticky xl:top-24 xl:self-start">
					<TradeSection
						symbol={symbol}
						currentPrice={currentPrice}
						currency={currency}
						contests={contests}
						isFetching={tradingIsFetching}
						orderIsError={orderIsError}
						orderIsPending={orderIsPending}
						onCreateOrder={handleCreateOrder}
						onOrderStatusReset={handleOrderStatusReset}
					/>
				</aside>
			</div>

			<InvestmentsSection
				contests={contests}
				currency={currency}
				isError={tradingIsError}
				isCancellingOrder={cancelOrderIsPending}
				onCancelOrder={handleRequestCancelOrder}
			/>

			<CancelOrderModal
				pendingCancellation={pendingCancellation}
				isCancellingOrder={cancelOrderIsPending}
				cancelOrderIsError={cancelOrderIsError}
				onClose={handleCloseCancelOrderModal}
				onConfirm={handleConfirmCancelOrder}
			/>
		</>
	);
}
