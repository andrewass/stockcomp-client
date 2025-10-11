import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { apiGet } from "../../config/apiWrapper";
import { GET_ALL_USERS, getAllUsersSortedConfig } from "./userApi";
import type { User } from "./userTypes";

interface UsersResponse {
	users: User[];
	totalEntriesCount: number;
}

export function useGetPageableUsers(pageNumber: number, pageSize: number) {
	return useQuery<UsersResponse>({
		queryKey: [GET_ALL_USERS, pageNumber],
		queryFn: () => apiGet(getAllUsersSortedConfig(pageNumber, pageSize)),
		placeholderData: keepPreviousData,
	});
}
