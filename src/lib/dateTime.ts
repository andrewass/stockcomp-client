const LOCAL_DATE_TIME_PATTERN =
	/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(?::\d{2}(?:\.\d{1,3})?)?$/;
const ISO_INSTANT_PATTERN =
	/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(?::\d{2}(?:\.\d{1,3})?)?(?:Z|[+-]\d{2}:\d{2})$/;

/**
 * Converts a `datetime-local` value in the browser's time zone to the UTC
 * instant that it represents. `datetime-local` values have no offset, so this
 * conversion must happen before the value crosses the client/server boundary.
 */
export function localDateTimeToIsoInstant(value: string): string | null {
	if (!LOCAL_DATE_TIME_PATTERN.test(value)) {
		return null;
	}

	const date = new Date(value);
	return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

/**
 * Accepts an ISO 8601 timestamp only when it explicitly identifies an instant
 * with either `Z` or a numeric UTC offset, and normalizes it to UTC.
 */
export function parseIsoInstant(value: unknown): string | null {
	if (typeof value !== "string") {
		return null;
	}

	const isoInstant = value.trim();
	if (!ISO_INSTANT_PATTERN.test(isoInstant)) {
		return null;
	}

	const date = new Date(isoInstant);
	return Number.isNaN(date.getTime()) ? null : date.toISOString();
}
