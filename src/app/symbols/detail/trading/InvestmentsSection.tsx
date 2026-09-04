"use client";

import { useEffect, useState } from "react";
import { ORDER_STATUS } from "@/domain/investmentorder/investmentOrderTypes.ts";
import { ContestInvestmentCard } from "@/symbols/detail/trading/ContestInvestmentCard.tsx";
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
	const [expandedContestId, setExpandedContestId] = useState<number | null>(
		() =>
			contests.find((contest) =>
				contest.orders.some(
					(order) => order.orderStatus === ORDER_STATUS.ACTIVE,
				),
			)?.contestId ?? null,
	);

	useEffect(() => {
		setExpandedContestId((currentId) => {
			if (
				currentId !== null &&
				contests.some((contest) => contest.contestId === currentId)
			) {
				return currentId;
			}

			return (
				contests.find((contest) =>
					contest.orders.some(
						(order) => order.orderStatus === ORDER_STATUS.ACTIVE,
					),
				)?.contestId ?? null
			);
		});
	}, [contests]);

	function toggleContest(contestId: number) {
		setExpandedContestId((currentId) =>
			currentId === contestId ? null : contestId,
		);
	}

	return (
		<section
			className="space-y-5 rounded-box border border-base-300 bg-base-100 p-5 shadow-sm sm:p-6"
			aria-label="Positions and orders"
		>
			{isError && (
				<div className="alert alert-error text-sm">
					Unable to refresh trading data.
				</div>
			)}

			{contests.length === 0 ? (
				<div className="rounded-box border border-dashed border-base-300 bg-base-200/50 px-4 py-6 text-sm text-base-content/60">
					You have not joined any contests yet.
				</div>
			) : (
				<div className="space-y-3">
					{contests.map((contest) => {
						const isExpanded = expandedContestId === contest.contestId;

						return (
							<ContestInvestmentCard
								key={contest.contestId}
								contest={contest}
								currency={currency}
								isExpanded={isExpanded}
								isCancellingOrder={isCancellingOrder}
								onCancelOrder={onCancelOrder}
								onToggle={() => toggleContest(contest.contestId)}
							/>
						);
					})}
				</div>
			)}
		</section>
	);
}
