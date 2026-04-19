import Database from "better-sqlite3";

interface ResourceTokenRow {
	accessToken: string;
	expiresAt: string;
}

interface SaveResourceTokenInput {
	userId: string;
	audience: string;
	accessToken: string;
	expiresAt: Date;
}

const db = new Database("./sqlite.db");

db.exec(`
	CREATE TABLE IF NOT EXISTS resource_token (
		userId TEXT NOT NULL,
		audience TEXT NOT NULL,
		accessToken TEXT NOT NULL,
		expiresAt TEXT NOT NULL,
		createdAt TEXT NOT NULL DEFAULT (datetime('now')),
		updatedAt TEXT NOT NULL DEFAULT (datetime('now')),
		PRIMARY KEY (userId, audience)
	)
`);

const selectResourceTokenStmt = db.prepare(
	"SELECT accessToken, expiresAt FROM resource_token WHERE userId = ? AND audience = ?",
);

const upsertResourceTokenStmt = db.prepare(`
	INSERT INTO resource_token (userId, audience, accessToken, expiresAt, createdAt, updatedAt)
	VALUES (?, ?, ?, ?, datetime('now'), datetime('now'))
	ON CONFLICT(userId, audience) DO UPDATE SET
		accessToken = excluded.accessToken,
		expiresAt = excluded.expiresAt,
		updatedAt = datetime('now')
`);

const deleteResourceTokenStmt = db.prepare(
	"DELETE FROM resource_token WHERE userId = ? AND audience = ?",
);

export function getValidResourceToken(
	userId: string,
	audience: string,
	bufferMs = 30_000,
): string | null {
	const row = selectResourceTokenStmt.get(userId, audience) as
		| ResourceTokenRow
		| undefined;
	if (!row) return null;

	const expiresAt = new Date(row.expiresAt);
	if (Number.isNaN(expiresAt.getTime())) {
		return null;
	}

	if (expiresAt.getTime() - bufferMs <= Date.now()) {
		return null;
	}

	return row.accessToken;
}

export function saveResourceToken(input: SaveResourceTokenInput): void {
	upsertResourceTokenStmt.run(
		input.userId,
		input.audience,
		input.accessToken,
		input.expiresAt.toISOString(),
	);
}

export function deleteResourceToken(userId: string, audience: string): void {
	deleteResourceTokenStmt.run(userId, audience);
}
