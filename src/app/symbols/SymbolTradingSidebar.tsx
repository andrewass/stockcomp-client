"use client";

import type { SymbolTradingViewModel } from "@/symbols/domain.ts";
import { CancelOrderModal } from "@/symbols/trading/CancelOrderModal.tsx";
import { InvestmentsSection } from "@/symbols/trading/InvestmentsSection.tsx";
import { TradeSection } from "@/symbols/trading/TradeSection.tsx";
import { useSymbolTradingSidebar } from "@/symbols/trading/useSymbolTradingSidebar.ts";

interface Props {
	symbol: string;
	currentPrice: number;
	currency: string;
	initialTradingData: SymbolTradingViewModel;
}

export default function SymbolTradingSidebar({
	symbol,
	currentPrice,
	currency,
	initialTradingData,
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
		<div className="space-y-5">
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

			<section className="rounded-box border border-base-300 bg-base-100 p-4 shadow-sm">
				<InvestmentsSection
					contests={contests}
					currency={currency}
					isError={tradingIsError}
					isCancellingOrder={cancelOrderIsPending}
					onCancelOrder={handleRequestCancelOrder}
				/>
			</section>

			<CancelOrderModal
				pendingCancellation={pendingCancellation}
				isCancellingOrder={cancelOrderIsPending}
				cancelOrderIsError={cancelOrderIsError}
				onClose={handleCloseCancelOrderModal}
				onConfirm={handleConfirmCancelOrder}
			/>
		</div>
	);
}
