import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { TradingOrderForm } from "@/symbols/detail/trading/TradingOrderForm.tsx";
import type { SymbolTradingOrderRequest } from "@/symbols/detail/trading/tradingTypes.ts";
import type { SymbolTradingContestViewModel } from "@/symbols/domain.ts";

interface Props {
	symbol: string;
	currentPrice: number;
	currency: string;
	contests: SymbolTradingContestViewModel[];
	isFetching: boolean;
	orderIsError: boolean;
	orderIsPending: boolean;
	onCreateOrder: (
		request: SymbolTradingOrderRequest,
		onSuccess: () => void,
	) => void;
	onOrderStatusReset: () => void;
}

export function TradeSection({
	symbol,
	currentPrice,
	currency,
	contests,
	isFetching,
	orderIsError,
	orderIsPending,
	onCreateOrder,
	onOrderStatusReset,
}: Props) {
	return (
		<section
			className="space-y-4 rounded-box border border-primary/25 bg-base-100 p-5 shadow-sm"
			aria-labelledby="symbol-order-ticket-heading"
		>
			<div className="flex items-start justify-between gap-3">
				<div>
					<p className="text-xs font-medium uppercase tracking-[0.16em] text-primary">
						Order Ticket
					</p>
					<h2
						id="symbol-order-ticket-heading"
						className="mt-1 text-xl font-semibold text-base-content"
					>
						Place an Order
					</h2>
					<p className="text-sm text-base-content/65">
						Buy or sell {symbol} in a running contest.
					</p>
				</div>
				{isFetching && (
					<ArrowPathIcon
						className="mt-1 size-5 animate-spin text-base-content/45 motion-reduce:animate-none"
						aria-label="Refreshing trading data"
					/>
				)}
			</div>

			<TradingOrderForm
				symbol={symbol}
				currentPrice={currentPrice}
				currency={currency}
				contests={contests}
				orderIsError={orderIsError}
				orderIsPending={orderIsPending}
				onCreateOrder={onCreateOrder}
				onOrderStatusReset={onOrderStatusReset}
			/>
		</section>
	);
}
