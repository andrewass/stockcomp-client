import { ModalWindow } from "@/components/modal/ModalWindow.tsx";
import {
	formatCurrency,
	formatMappedLabel,
	formatNumber,
} from "@/lib/formatters.ts";
import type {
	SymbolTradingContestViewModel,
	SymbolTradingOrderViewModel,
} from "@/symbols/domain.ts";

interface PendingOrderCancellation {
	contest: SymbolTradingContestViewModel;
	order: SymbolTradingOrderViewModel;
}

interface Props {
	pendingCancellation: PendingOrderCancellation | null;
	isCancellingOrder: boolean;
	cancelOrderIsError: boolean;
	onClose: () => void;
	onConfirm: () => void;
}

export function CancelOrderModal({
	pendingCancellation,
	isCancellingOrder,
	cancelOrderIsError,
	onClose,
	onConfirm,
}: Props) {
	return (
		<ModalWindow
			isOpen={pendingCancellation !== null}
			onClose={onClose}
			title="Cancel order?"
			hideCloseButton={isCancellingOrder}
			footer={
				<>
					<button
						type="button"
						className="btn btn-ghost"
						disabled={isCancellingOrder}
						onClick={onClose}
					>
						Keep order
					</button>
					<button
						type="button"
						className="btn btn-error"
						disabled={isCancellingOrder}
						onClick={onConfirm}
					>
						{isCancellingOrder && (
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
								{formatMappedLabel(pendingCancellation.order.transactionType, {
									BUY: "Buy",
									SELL: "Sell",
								})}
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
	);
}
