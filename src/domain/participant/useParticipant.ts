import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useApiWrapper } from "../../config/useApiWrapper";
import {
	GET_SORTED_PARTICIPANTS,
	getSortedParticipantsConfig,
} from "./participantApi";
import type { Participant } from "./participantTypes";

interface SortedParticipantsResponse {
	participants: Participant[];
	totalEntriesCount: number;
}

export function useGetSortedParticipants(
	contestId: number,
	pageNumber: number,
	pageSize: number,
) {
	const { apiGet } = useApiWrapper();

	return useQuery<SortedParticipantsResponse>({
		queryKey: [GET_SORTED_PARTICIPANTS, pageNumber],
		queryFn: () =>
			apiGet(getSortedParticipantsConfig(contestId, pageNumber, pageSize)),
		placeholderData: keepPreviousData,
	});
}
