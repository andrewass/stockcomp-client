import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { Contest } from "@/contest/contestTypes.ts";
import { apiGet } from "../../config/apiWrapper";

export const GET_ALL_CONTESTS = "getAllContestsSorted";

interface ContestsResponse {
	contests: Contest[];
	totalEntriesCount: number;
}

export function useGetPageableContests(pageNumber: number, pageSize: number) {
	return useQuery<ContestsResponse>({
		queryKey: [GET_ALL_CONTESTS, pageNumber],
		queryFn: () => apiGet(getAllContestsConfig(pageNumber, pageSize)),
		placeholderData: keepPreviousData,
	});
}

const getAllContestsConfig = (pageNumber: number, pageSize: number) => {
	return {
		method: "get",
		url: `/api/proxy/contests/all`,
		params: { pageNumber, pageSize },
	};
};
