"use client";

import { type KeyboardEvent, useRef } from "react";
import { ORDER_STATUS } from "@/domain/investmentorder/investmentOrderTypes.ts";
import type { SymbolTradingContestViewModel } from "@/symbols/domain.ts";

interface Props {
	contests: SymbolTradingContestViewModel[];
	selectedContestId: number;
	idPrefix: string;
	onSelect: (contestId: number) => void;
}

export function ContestInvestmentTabs({
	contests,
	selectedContestId,
	idPrefix,
	onSelect,
}: Props) {
	const tabRefs = useRef(new Map<number, HTMLButtonElement>());

	function handleKeyDown(
		event: KeyboardEvent<HTMLButtonElement>,
		index: number,
	) {
		let nextIndex: number;
		switch (event.key) {
			case "ArrowRight":
				nextIndex = (index + 1) % contests.length;
				break;
			case "ArrowLeft":
				nextIndex = (index - 1 + contests.length) % contests.length;
				break;
			case "Home":
				nextIndex = 0;
				break;
			case "End":
				nextIndex = contests.length - 1;
				break;
			default:
				return;
		}

		event.preventDefault();
		const nextContest = contests[nextIndex];
		onSelect(nextContest.contestId);
		const nextTab = tabRefs.current.get(nextContest.contestId);
		nextTab?.focus({ preventScroll: true });
		nextTab?.scrollIntoView({ block: "nearest", inline: "nearest" });
	}

	return (
		<div className="min-w-0 max-w-full overflow-x-auto">
			<div
				role="tablist"
				className="tabs tabs-border w-max min-w-full flex-nowrap"
				aria-label="Contest positions and orders"
			>
				{contests.map((contest, index) => {
					const isActive = contest.contestId === selectedContestId;
					const activeOrderCount = contest.orders.filter(
						(order) => order.orderStatus === ORDER_STATUS.ACTIVE,
					).length;

					return (
						<button
							key={contest.contestId}
							ref={(element) => {
								if (element) {
									tabRefs.current.set(contest.contestId, element);
								} else {
									tabRefs.current.delete(contest.contestId);
								}
							}}
							id={`${idPrefix}-tab-${contest.contestId}`}
							type="button"
							role="tab"
							aria-controls={`${idPrefix}-panel`}
							aria-selected={isActive}
							tabIndex={isActive ? 0 : -1}
							className={`tab h-12 shrink-0 gap-2 px-4 font-medium focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary ${
								isActive ? "tab-active" : "text-base-content/65"
							}`}
							onClick={() => onSelect(contest.contestId)}
							onKeyDown={(event) => handleKeyDown(event, index)}
						>
							<span className="max-w-64 truncate" title={contest.contestName}>
								{contest.contestName}
							</span>
							{activeOrderCount > 0 ? (
								<span className="badge badge-success badge-outline badge-sm whitespace-nowrap">
									{activeOrderCount} active
								</span>
							) : null}
						</button>
					);
				})}
			</div>
		</div>
	);
}
