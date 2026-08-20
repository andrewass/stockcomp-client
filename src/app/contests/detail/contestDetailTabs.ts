export const CONTEST_DETAIL_TAB = {
	LEADERBOARD: "leaderboard",
	HOLDINGS: "holdings",
	ORDERS: "orders",
} as const;

export type ContestDetailTab =
	(typeof CONTEST_DETAIL_TAB)[keyof typeof CONTEST_DETAIL_TAB];

export function parseContestDetailTab(
	value: string | string[] | undefined,
): ContestDetailTab {
	const candidate = Array.isArray(value) ? value[0] : value;

	switch (candidate) {
		case CONTEST_DETAIL_TAB.HOLDINGS:
		case CONTEST_DETAIL_TAB.ORDERS:
		case CONTEST_DETAIL_TAB.LEADERBOARD:
			return candidate;
		default:
			return CONTEST_DETAIL_TAB.LEADERBOARD;
	}
}
