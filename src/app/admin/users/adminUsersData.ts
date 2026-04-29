import "server-only";
import { resourceGet } from "@/api/resourceServerClient.ts";
import type { UserPage } from "@/types/userTypes.ts";

export async function getAdminUsers(
	pageNumber: number,
	pageSize: number,
): Promise<UserPage> {
	return resourceGet<UserPage>({
		url: "/users/sorted",
		params: { pageNumber, pageSize },
	});
}
