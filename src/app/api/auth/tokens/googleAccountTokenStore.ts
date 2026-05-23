import "server-only";
import Database from "better-sqlite3";

interface GoogleAccountRow {
	refreshToken: string | null;
}

interface SaveGoogleAccountTokensInput {
	userId: string;
	accessToken: string;
	accessTokenExpiresAt: Date;
	idToken: string;
	refreshToken?: string;
}

const GOOGLE_PROVIDER_ID = "google";
const db = new Database("./sqlite.db");

// Better Auth stores OAuth provider tokens in the account table.
// Keep direct schema access isolated to this adapter.
const selectGoogleAccountStmt = db.prepare(`
	SELECT refreshToken
	FROM account
	WHERE userId = ? AND providerId = ?
	LIMIT 1
`);

const updateGoogleAccountTokensStmt = db.prepare(`
	UPDATE account
	SET
		accessToken = ?,
		refreshToken = COALESCE(?, refreshToken),
		idToken = ?,
		accessTokenExpiresAt = ?,
		updatedAt = ?
	WHERE userId = ? AND providerId = ?
`);

export function getGoogleRefreshTokenForUser(userId: string): string | null {
	const account = selectGoogleAccountStmt.get(userId, GOOGLE_PROVIDER_ID) as
		| GoogleAccountRow
		| undefined;

	return account?.refreshToken ?? null;
}

export function saveGoogleAccountTokens(
	input: SaveGoogleAccountTokensInput,
): void {
	updateGoogleAccountTokensStmt.run(
		input.accessToken,
		input.refreshToken ?? null,
		input.idToken,
		input.accessTokenExpiresAt.toISOString(),
		new Date().toISOString(),
		input.userId,
		GOOGLE_PROVIDER_ID,
	);
}
