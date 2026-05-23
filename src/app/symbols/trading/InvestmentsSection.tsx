"use client";

import { useEffect, useState } from "react";
import type {
	SymbolTradingContestViewModel,
	SymbolTradingOrderViewModel,
} from "@/symbols/domain.ts";
import { ContestInvestmentCard } from "@/symbols/trading/ContestInvestmentCard.tsx";

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
	const [expandedContestIds, setExpandedContestIds] = useState<number[]>(() =>
		contests[0] ? [contests[0].contestId] : [],
	);

	useEffect(() => {
		const contestIds = new Set(contests.map((contest) => contest.contestId));

		setExpandedContestIds((currentIds) => {
			const validIds = currentIds.filter((contestId) =>
				contestIds.has(contestId),
			);

			return validIds.length === currentIds.length ? currentIds : validIds;
		});
	}, [contests]);

	function toggleContest(contestId: number) {
		setExpandedContestIds((currentIds) =>
			currentIds.includes(contestId)
				? currentIds.filter((currentId) => currentId !== contestId)
				: [...currentIds, contestId],
		);
	}

	return (
		<section className="space-y-3">
			<div>
				<h3 className="font-semibold text-base-content">Investments</h3>
				<p className="text-sm text-base-content/65">
					Current position and symbol orders by contest.
				</p>
			</div>

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
						const isExpanded = expandedContestIds.includes(contest.contestId);

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
