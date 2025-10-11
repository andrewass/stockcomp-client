import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { apiGet } from "../../config/apiWrapper";
import { GET_ALL_CONTESTS, getAllContestsConfig } from "./contestApi";
import type { Contest } from "./contestTypes";

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
