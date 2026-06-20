const DEFAULT_LEADERBOARD_RETURN_TO = "/leaderboard/0?pageSize=10";
const LEADERBOARD_PATH_PATTERN = /^\/leaderboard\/\d+$/;
const CONTEST_LEADERBOARD_PATH_PATTERN = /^\/contest\/\d+\/\d+$/;

export function buildUserDetailHref(
	username: string,
	returnTo: string,
): string {
	const searchParams = new URLSearchParams({ returnTo });
	return `/users/${encodeURIComponent(username)}?${searchParams.toString()}`;
}

export function getSafeLeaderboardReturnTo(
	returnTo: string | string[] | undefined,
): string {
	if (
		typeof returnTo !== "string" ||
		!returnTo.startsWith("/") ||
		returnTo.startsWith("//") ||
		returnTo.includes("\\")
	) {
		return DEFAULT_LEADERBOARD_RETURN_TO;
	}

	const url = new URL(returnTo, "https://stockcomp.local");
	const isLeaderboardPath =
		LEADERBOARD_PATH_PATTERN.test(url.pathname) ||
		CONTEST_LEADERBOARD_PATH_PATTERN.test(url.pathname);
	const hasOnlyPageSize =
		Array.from(url.searchParams.keys()).every((key) => key === "pageSize") &&
		url.searchParams.getAll("pageSize").length <= 1;
	const pageSize = url.searchParams.get("pageSize");
	const hasValidPageSize = pageSize === null || /^[1-9]\d*$/.test(pageSize);

	if (!isLeaderboardPath || !hasOnlyPageSize || !hasValidPageSize || url.hash) {
		return DEFAULT_LEADERBOARD_RETURN_TO;
	}

	return `${url.pathname}${url.search}`;
}
