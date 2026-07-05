import "server-only";
import type {
	AccountSettings,
	UpdateAccountSettingsRequest,
} from "@/account/accountTypes.ts";
import { resourceGet, resourcePut } from "@/api/resourceServerClient.ts";

interface AccountSettingsDto {
	userId: number;
	username: string;
	fullName: string | null;
	country: string | null;
	email: string;
}

function mapAccountSettingsDto(dto: AccountSettingsDto): AccountSettings {
	return {
		username: dto.username,
		fullName: dto.fullName,
		country: dto.country,
		email: dto.email,
	};
}

export async function getAccountSettings(): Promise<AccountSettings> {
	const dto = await resourceGet<AccountSettingsDto>({
		url: "/account",
	});

	return mapAccountSettingsDto(dto);
}

export async function updateAccountSettings(
	request: UpdateAccountSettingsRequest,
): Promise<AccountSettings> {
	const dto = await resourcePut<AccountSettingsDto>({
		url: "/account",
		body: {
			username: request.username,
			fullName: request.fullName,
			country: request.country,
		},
	});

	return mapAccountSettingsDto(dto);
}
