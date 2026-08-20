import Link from "next/link";
import type {
	ContestLeaderboardPage,
	ContestParticipantDetail,
	ContestParticipantInvestmentOrder,
} from "@/domain/contests/contestParticipantTypes.ts";
import ContestInvestmentOrdersTable from "./ContestInvestmentOrdersTable.tsx";
import ContestInvestmentsTable from "./ContestInvestmentsTable.tsx";
import ContestLeaderboardTable from "./ContestLeaderboardTable.tsx";
import {
	CONTEST_DETAIL_TAB,
	type ContestDetailTab,
} from "./contestDetailTabs.ts";

interface Props {
	activeTab: ContestDetailTab;
	contestId: number;
	leaderboard: ContestLeaderboardPage;
	participantDetail: ContestParticipantDetail | null;
	pageSize: number;
	currentPage: number;
}

interface TabItem {
	id: ContestDetailTab;
	label: string;
}

function buildTabHref(
	contestId: number,
	tab: ContestDetailTab,
	pageSize: number,
): string {
	const searchParams = new URLSearchParams({
		view: tab,
		pageSize: pageSize.toString(),
	});

	return `/contest/${contestId}/0?${searchParams.toString()}`;
}

function getOrders(
	participantDetail: ContestParticipantDetail,
): ContestParticipantInvestmentOrder[] {
	return [
		...participantDetail.activeOrders,
		...participantDetail.completedOrders,
	];
}

export default function ContestDetailTabs({
	activeTab,
	contestId,
	leaderboard,
	participantDetail,
	pageSize,
	currentPage,
}: Props) {
	const orders = participantDetail ? getOrders(participantDetail) : [];
	const availableTabs: TabItem[] = [
		{
			id: CONTEST_DETAIL_TAB.LEADERBOARD,
			label: "Leaderboard",
		},
		...(participantDetail
			? [
					{
						id: CONTEST_DETAIL_TAB.HOLDINGS,
						label: "Holdings",
					},
					{
						id: CONTEST_DETAIL_TAB.ORDERS,
						label: "Orders",
					},
				]
			: []),
	];
	const resolvedActiveTab = participantDetail
		? activeTab
		: CONTEST_DETAIL_TAB.LEADERBOARD;
	const activeTabLabel =
		availableTabs.find((tab) => tab.id === resolvedActiveTab)?.label ??
		"Leaderboard";

	return (
		<section className="space-y-4">
			<div className="overflow-x-auto">
				<div
					role="tablist"
					className="tabs tabs-border w-max min-w-full flex-nowrap"
					aria-label="Contest views"
				>
					{availableTabs.map((tab) => {
						const isActive = tab.id === resolvedActiveTab;

						return (
							<Link
								key={tab.id}
								id={`contest-tab-${tab.id}`}
								href={buildTabHref(contestId, tab.id, pageSize)}
								scroll={false}
								role="tab"
								aria-controls="contest-tab-panel"
								aria-selected={isActive}
								aria-current={isActive ? "page" : undefined}
								className={`tab h-12 gap-2 px-4 font-medium ${
									isActive ? "tab-active" : "text-base-content/65"
								}`}
							>
								{tab.label}
							</Link>
						);
					})}
				</div>
			</div>

			<div
				id="contest-tab-panel"
				role="tabpanel"
				aria-labelledby={`contest-tab-${resolvedActiveTab}`}
			>
				<h2 className="sr-only">{activeTabLabel}</h2>
				{resolvedActiveTab === CONTEST_DETAIL_TAB.HOLDINGS &&
				participantDetail ? (
					<ContestInvestmentsTable
						investments={participantDetail.investments}
						contestId={contestId}
						pageSize={pageSize}
						currentPage={currentPage}
					/>
				) : null}
				{resolvedActiveTab === CONTEST_DETAIL_TAB.ORDERS &&
				participantDetail ? (
					<ContestInvestmentOrdersTable
						orders={orders}
						contestId={contestId}
						pageSize={pageSize}
						currentPage={currentPage}
					/>
				) : null}
				{resolvedActiveTab === CONTEST_DETAIL_TAB.LEADERBOARD ? (
					<ContestLeaderboardTable
						participants={leaderboard.participants}
						contestId={contestId}
						pageSize={pageSize}
						currentPage={currentPage}
						totalEntriesCount={leaderboard.totalEntriesCount}
					/>
				) : null}
			</div>
		</section>
	);
}
