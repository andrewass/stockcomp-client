import type { CustomRequestConfig } from "../../config/apiWrapper";
import type { CreateContestRequest, UpdateContestRequest } from "./contestDto";

export const GET_CONTEST_BY_NUMBER = "getContestByNumber";
export const EXISTS_ACTIVE_CONTESTS = "existsActiveContests";

const CONTEST_PATH = "/api/proxy/contests";

export const getExistsActiveContestsConfig = () => {
	return {
		method: "get",
		url: `${CONTEST_PATH}/exists-active`,
	};
};

export const getCreateContestConfig = (
	contestData: CreateContestRequest,
): CustomRequestConfig => {
	return {
		method: "post",
		url: `${CONTEST_PATH}/create`,
		body: contestData,
	};
};

export const getDeleteContestConfig = (
	contestId: number,
): CustomRequestConfig => {
	return {
		method: "delete",
		url: `${CONTEST_PATH}/${contestId}`,
	};
};

export const getUpdateContestConfig = (request: UpdateContestRequest) => {
	return {
		method: "post",
		url: `${CONTEST_PATH}/update`,
		body: request,
	};
};

export const getContestConfig = (contestId: number) => {
	return {
		method: "get",
		url: `${CONTEST_PATH}/${contestId}`,
	};
};
