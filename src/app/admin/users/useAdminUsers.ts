import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import { getUpdateContestConfig } from "@/admin/contests/useAdminContests.ts";
import type { UpdateContestRequest } from "@/contest/contestTypes.ts";
import { apiGet, apiPut } from "../../../config/apiWrapper.ts";
import { queryClient } from "../../../config/queryConfig.ts";

const GET_ALL_USERS = "getAllUsersSorted";

export function useGetPageableUsers(pageNumber: number, pageSize: number) {
	return useQuery<UsersResponse>({
		queryKey: [GET_ALL_USERS, pageNumber],
		queryFn: () => apiGet(getAllUsersSortedConfig(pageNumber, pageSize)),
		placeholderData: keepPreviousData,
	});
}

export function useDeleteUserMutation() {}

export function updateUserMutation() {
	return useMutation({
		mutationFn: (contestData: UpdateContestRequest) =>
			apiPut(getUpdateContestConfig(contestData)),
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: [GET_ALL_USERS] }),
	});
}

const getAllUsersSortedConfig = (pageNumber: number, pageSize: number) => {
	return {
		method: "get",
		url: `/api/proxy/user/sorted`,
		params: { pageNumber, pageSize },
	};
};
