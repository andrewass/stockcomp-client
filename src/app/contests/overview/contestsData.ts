import "server-only";
import { resourceGet } from "@/api/resourceServerClient.ts";
import type { ContestPage } from "@/domain/contests/contestTypes.ts";

export async function getContests(
	pageNumber: number,
	pageSize: number,
): Promise<ContestPage> {
	return await resourceGet<ContestPage>({
		url: "/contests/all",
		params: { pageNumber, pageSize },
	});
}
