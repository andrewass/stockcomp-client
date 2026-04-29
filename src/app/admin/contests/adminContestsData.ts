import "server-only";
import { resourceGet } from "@/api/resourceServerClient.ts";
import type { ContestPage } from "@/domain/contests/contestTypes.ts";

export async function getAdminContests(
	pageNumber: number,
	pageSize: number,
): Promise<ContestPage> {
	return resourceGet<ContestPage>({
		url: "/contests/all",
		params: { pageNumber, pageSize },
	});
}
