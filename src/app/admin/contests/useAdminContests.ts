import { useMutation } from "@tanstack/react-query";
import { GET_ALL_CONTESTS } from "@/contests/useContests.ts";
import {
	apiDelete,
	apiPost,
	type CustomRequestConfig,
} from "../../../config/apiWrapper.ts";
import { queryClient } from "../../../config/queryConfig.ts";
import type {
	CreateContestRequest,
	UpdateContestRequest,
} from "../../../domain/contests/contestDto.ts";

export function useDeleteContestMutation(contestId: number) {
	return useMutation({
		mutationFn: () => apiDelete(getDeleteContestConfig(contestId)),
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: [GET_ALL_CONTESTS] }),
	});
}

export function useCreateContestMutation() {
	return useMutation({
		mutationFn: (contestData: CreateContestRequest) =>
			apiPost(getCreateContestConfig(contestData)),
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: [GET_ALL_CONTESTS] }),
	});
}

export function useUpdateContestMutation() {
	return useMutation({
		mutationFn: (contestData: UpdateContestRequest) =>
			apiPost(getUpdateContestConfig(contestData)),
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: [GET_ALL_CONTESTS] }),
	});
}

export const getCreateContestConfig = (
	contestData: CreateContestRequest,
): CustomRequestConfig => {
	return {
		method: "post",
		url: `api/proxy/contests/create`,
		body: contestData,
	};
};

export const getUpdateContestConfig = (request: UpdateContestRequest) => {
	return {
		method: "post",
		url: `/api/proxy/contests/update`,
		body: request,
	};
};

const getDeleteContestConfig = (contestId: number): CustomRequestConfig => {
	return {
		method: "delete",
		url: `/api/proxy/contests/${contestId}`,
	};
};
