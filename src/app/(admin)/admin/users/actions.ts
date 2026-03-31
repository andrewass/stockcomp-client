import { apiGet } from "@/api/apiWrapper.ts";
import type { UserPage } from "@/types/userTypes.ts";

export function getAdminUsers(
	pageNumber: number,
	pageSize: number,
): Promise<UserPage> {
	return apiGet<UserPage>({
		url: `/users/sorted?pageNumber=${pageNumber}&pageSize=${pageSize}`,
	});
}
