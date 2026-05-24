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

interface SelectGoogleAccountStatement {
	get(userId: string, providerId: string): unknown;
}

interface UpdateGoogleAccountTokensStatement {
	run(
		accessToken: string,
		refreshToken: string | null,
		idToken: string,
		accessTokenExpiresAt: string,
		updatedAt: string,
		userId: string,
		providerId: string,
	): unknown;
}

const GOOGLE_PROVIDER_ID = "google";
const MISSING_ACCOUNT_TABLE_ERROR = "no such table: account";

type SqliteDatabase = ReturnType<typeof Database>;

let db: SqliteDatabase | null = null;
let selectGoogleAccountStmt: SelectGoogleAccountStatement | null = null;
let updateGoogleAccountTokensStmt: UpdateGoogleAccountTokensStatement | null =
	null;

function getDb(): SqliteDatabase {
	db ??= new Database("./sqlite.db");
	return db;
}

// Better Auth stores OAuth provider tokens in the account table.
// Keep direct schema access isolated to this adapter.
function getSelectGoogleAccountStmt(): SelectGoogleAccountStatement {
	selectGoogleAccountStmt ??= getDb().prepare(`
		SELECT refreshToken
		FROM account
		WHERE userId = ? AND providerId = ?
		LIMIT 1
	`) as SelectGoogleAccountStatement;

	return selectGoogleAccountStmt;
}

function getUpdateGoogleAccountTokensStmt(): UpdateGoogleAccountTokensStatement {
	updateGoogleAccountTokensStmt ??= getDb().prepare(`
		UPDATE account
		SET
			accessToken = ?,
			refreshToken = COALESCE(?, refreshToken),
			idToken = ?,
			accessTokenExpiresAt = ?,
			updatedAt = ?
		WHERE userId = ? AND providerId = ?
	`) as UpdateGoogleAccountTokensStatement;

	return updateGoogleAccountTokensStmt;
}

function isMissingAccountTableError(error: unknown): boolean {
	return (
		error instanceof Error &&
		error.message.includes(MISSING_ACCOUNT_TABLE_ERROR)
	);
}

export function getGoogleRefreshTokenForUser(userId: string): string | null {
	try {
		const account = getSelectGoogleAccountStmt().get(
			userId,
			GOOGLE_PROVIDER_ID,
		) as GoogleAccountRow | undefined;

		return account?.refreshToken ?? null;
	} catch (error) {
		if (isMissingAccountTableError(error)) {
			return null;
		}

		throw error;
	}
}

export function saveGoogleAccountTokens(
	input: SaveGoogleAccountTokensInput,
): void {
	try {
		getUpdateGoogleAccountTokensStmt().run(
			input.accessToken,
			input.refreshToken ?? null,
			input.idToken,
			input.accessTokenExpiresAt.toISOString(),
			new Date().toISOString(),
			input.userId,
			GOOGLE_PROVIDER_ID,
		);
	} catch (error) {
		if (isMissingAccountTableError(error)) {
			throw new Error(
				"Better Auth account table is missing; run the Better Auth database migration before saving Google account tokens.",
				{ cause: error },
			);
		}

		throw error;
	}
}
