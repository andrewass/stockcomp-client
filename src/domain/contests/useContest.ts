import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useApiWrapper } from "../../config/useApiWrapper";
import { GET_ALL_CONTESTS, getAllContestsConfig } from "./contestApi";
import type { Contest } from "./contestTypes";

interface ContestsResponse {
	contests: Contest[];
	totalEntriesCount: number;
}

export function useGetPageableContests(pageNumber: number, pageSize: number) {
	const { apiGet } = useApiWrapper();

	return useQuery<ContestsResponse>({
		queryKey: [GET_ALL_CONTESTS, pageNumber],
		queryFn: () => apiGet(getAllContestsConfig(pageNumber, pageSize)),
		placeholderData: keepPreviousData,
	});
}
