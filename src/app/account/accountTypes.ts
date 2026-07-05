export interface AccountSettings {
	username: string;
	fullName: string | null;
	country: string | null;
	email: string;
}

export interface UpdateAccountSettingsRequest {
	username: string;
	fullName: string | null;
	country: string | null;
}

export interface UpdateAccountSettingsResult {
	ok: boolean;
	account?: AccountSettings;
	fieldErrors?: Record<string, string>;
	message?: string;
}
