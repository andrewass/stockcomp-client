import { format, isValid, parseISO } from "date-fns";

const DEFAULT_LOCALE = "en-US";
const DEFAULT_FALLBACK_VALUE = "N/A";

export function formatNumber(
	value: number | null | undefined,
	options?: Intl.NumberFormatOptions,
	fallback = DEFAULT_FALLBACK_VALUE,
): string {
	if (value === null || value === undefined || !Number.isFinite(value)) {
		return fallback;
	}

	return new Intl.NumberFormat(DEFAULT_LOCALE, options).format(value);
}

export function formatCurrency(
	value: number | null | undefined,
	currency = "USD",
	options?: Intl.NumberFormatOptions,
	fallback = DEFAULT_FALLBACK_VALUE,
): string {
	if (value === null || value === undefined || !Number.isFinite(value)) {
		return fallback;
	}

	try {
		return new Intl.NumberFormat(DEFAULT_LOCALE, {
			style: "currency",
			currency,
			...options,
		}).format(value);
	} catch {
		return formatNumber(
			value,
			{ maximumFractionDigits: 2, ...options },
			fallback,
		);
	}
}

export function formatSignedCurrency(
	value: number | null | undefined,
	currency = "USD",
	options?: Intl.NumberFormatOptions,
	fallback = DEFAULT_FALLBACK_VALUE,
): string {
	if (value === null || value === undefined || !Number.isFinite(value)) {
		return fallback;
	}

	const sign = value > 0 ? "+" : value < 0 ? "-" : "";
	return `${sign}${formatCurrency(Math.abs(value), currency, options, fallback)}`;
}

export function formatSignedPercent(
	value: number | null | undefined,
	options?: Intl.NumberFormatOptions,
	fallback = DEFAULT_FALLBACK_VALUE,
): string {
	if (value === null || value === undefined || !Number.isFinite(value)) {
		return fallback;
	}

	const sign = value > 0 ? "+" : "";
	return `${sign}${formatNumber(value, options, fallback)}%`;
}

export function getProfitClassName(value: number): string {
	if (value > 0) {
		return "text-success";
	}

	if (value < 0) {
		return "text-error";
	}

	return "text-base-content";
}

export function formatEnumLabel(value: string): string {
	if (!value) {
		return value;
	}

	return value
		.toLowerCase()
		.split(/[_\s-]+/)
		.filter((part) => part.length > 0)
		.map((part) => part.charAt(0).toUpperCase() + part.slice(1))
		.join(" ");
}

export function formatMappedLabel(
	value: string,
	labelMap: Record<string, string>,
): string {
	return labelMap[value] ?? formatEnumLabel(value);
}

export function formatDateTimeValue(
	dateTime: string,
	pattern = "dd/MM/yyyy HH:mm",
): string {
	const parsedIso = parseISO(dateTime);
	if (isValid(parsedIso)) {
		return format(parsedIso, pattern);
	}

	const fallbackDate = new Date(dateTime);
	if (isValid(fallbackDate)) {
		return format(fallbackDate, pattern);
	}

	return dateTime;
}
