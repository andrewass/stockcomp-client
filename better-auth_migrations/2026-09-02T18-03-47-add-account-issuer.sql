-- Better Auth 1.7 scopes OAuth account identities by issuer.
-- Existing Google rows use Google's trusted issuer, as configured by the
-- Better Auth Google provider in v1.7.1.
ALTER TABLE "account" ADD COLUMN "issuer" text;

UPDATE "account"
SET "issuer" = 'https://accounts.google.com'
WHERE "providerId" = 'google' AND "issuer" IS NULL;
