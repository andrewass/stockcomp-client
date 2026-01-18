export const GET_CONTEST_BY_NUMBER = "getContestByNumber";
export const EXISTS_ACTIVE_CONTESTS = "existsActiveContests";

const CONTEST_PATH = "/api/proxy/contests";

export const getExistsActiveContestsConfig = () => {
	return {
		method: "get",
		url: `${CONTEST_PATH}/exists-active`,
	};
};

export const getContestConfig = (contestId: number) => {
	return {
		method: "get",
		url: `${CONTEST_PATH}/${contestId}`,
	};
};
