-- SQLite requires a table rebuild to make an existing column NOT NULL.
-- This migration also corrects the interim provider-id namespace used before
-- the Better Auth v1.7.1 Google provider issuer was verified.
PRAGMA foreign_keys = OFF;

BEGIN TRANSACTION;

UPDATE "account"
SET "issuer" = 'https://accounts.google.com'
WHERE "providerId" = 'google' AND "issuer" = 'local:oauth:google';

CREATE TABLE "account_new" (
	"id" text not null primary key,
	"accountId" text not null,
	"providerId" text not null,
	"userId" text not null references "user" ("id") on delete cascade,
	"accessToken" text,
	"refreshToken" text,
	"idToken" text,
	"accessTokenExpiresAt" date,
	"refreshTokenExpiresAt" date,
	"scope" text,
	"password" text,
	"createdAt" date not null,
	"updatedAt" date not null,
	"issuer" text not null
);

INSERT INTO "account_new" (
	"id", "accountId", "providerId", "userId", "accessToken", "refreshToken",
	"idToken", "accessTokenExpiresAt", "refreshTokenExpiresAt", "scope", "password",
	"createdAt", "updatedAt", "issuer"
)
SELECT
	"id", "accountId", "providerId", "userId", "accessToken", "refreshToken",
	"idToken", "accessTokenExpiresAt", "refreshTokenExpiresAt", "scope", "password",
	"createdAt", "updatedAt", "issuer"
FROM "account";

DROP TABLE "account";
ALTER TABLE "account_new" RENAME TO "account";

CREATE INDEX "account_userId_idx" ON "account" ("userId");
CREATE UNIQUE INDEX "account_issuer_accountId_uidx" ON "account" ("issuer", "accountId");

COMMIT;

PRAGMA foreign_keys = ON;
