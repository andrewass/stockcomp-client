"use client";

import { useId, useState } from "react";
import { ORDER_STATUS } from "@/domain/investmentorder/investmentOrderTypes.ts";
import { ContestInvestmentCard } from "@/symbols/detail/trading/ContestInvestmentCard.tsx";
import { ContestInvestmentTabs } from "@/symbols/detail/trading/ContestInvestmentTabs.tsx";
import type {
	SymbolTradingContestViewModel,
	SymbolTradingOrderViewModel,
} from "@/symbols/domain.ts";

interface Props {
	contests: SymbolTradingContestViewModel[];
	currency: string;
	isError: boolean;
	isCancellingOrder: boolean;
	onCancelOrder: (
		contest: SymbolTradingContestViewModel,
		order: SymbolTradingOrderViewModel,
	) => void;
}

export function InvestmentsSection({
	contests,
	currency,
	isError,
	isCancellingOrder,
	onCancelOrder,
}: Props) {
	const idPrefix = useId();
	const defaultContest =
		contests.find((contest) =>
			contest.orders.some((order) => order.orderStatus === ORDER_STATUS.ACTIVE),
		) ?? contests[0];
	const [selectedContestId, setSelectedContestId] = useState<number | null>(
		() => defaultContest?.contestId ?? null,
	);
	const selectedContest =
		contests.find((contest) => contest.contestId === selectedContestId) ??
		defaultContest;

	return (
		<section
			className="min-w-0 space-y-5 rounded-box border border-base-300 bg-base-100 p-5 shadow-sm sm:p-6"
			aria-label="Positions and orders"
		>
			{isError && (
				<div className="alert alert-error text-sm">
					Unable to refresh trading data.
				</div>
			)}

			{!selectedContest ? (
				<div className="rounded-box border border-dashed border-base-300 bg-base-200/50 px-4 py-6 text-sm text-base-content/60">
					You have not joined any contests yet.
				</div>
			) : (
				<div className="min-w-0 space-y-4">
					<ContestInvestmentTabs
						contests={contests}
						selectedContestId={selectedContest.contestId}
						idPrefix={idPrefix}
						onSelect={setSelectedContestId}
					/>
					<div
						id={`${idPrefix}-panel`}
						role="tabpanel"
						aria-labelledby={`${idPrefix}-tab-${selectedContest.contestId}`}
						// biome-ignore lint/a11y/noNoninteractiveTabindex: The tab panel needs keyboard focus so users can reach its content from the tab list.
						tabIndex={0}
						className="rounded-box focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
					>
						<ContestInvestmentCard
							key={selectedContest.contestId}
							contest={selectedContest}
							currency={currency}
							isCancellingOrder={isCancellingOrder}
							onCancelOrder={onCancelOrder}
						/>
					</div>
				</div>
			)}
		</section>
	);
}
