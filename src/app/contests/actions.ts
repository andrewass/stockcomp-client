"use server";

import { apiGet } from "@/api/apiWrapper.ts";
import type { ContestPage } from "@/contest/contestTypes.ts";

export async function getContests(
	pageNumber: number,
	pageSize: number,
): Promise<ContestPage> {
	return await apiGet<ContestPage>({
		url: `/contests/all?pageNumber=${pageNumber}&pageSize=${pageSize}`,
	});
}
