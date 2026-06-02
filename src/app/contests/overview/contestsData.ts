import "server-only";
import { resourceGet } from "@/api/resourceServerClient.ts";
import {
	type ContestPageDto,
	mapContestPageDto,
} from "@/contests/contestDataMappers.ts";
import type { ContestPage } from "@/domain/contests/contestTypes.ts";

export async function getContests(
	pageNumber: number,
	pageSize: number,
): Promise<ContestPage> {
	const page = await resourceGet<ContestPageDto>({
		url: "/contests/all",
		params: { pageNumber, pageSize },
	});

	return mapContestPageDto(page);
}
