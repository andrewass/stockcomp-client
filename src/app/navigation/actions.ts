"use server";

import { apiGet } from "@/api/apiWrapper.ts";

export async function getHasAdminRole(): Promise<boolean> {
	return await apiGet({ url: "/users/admin" });
}
