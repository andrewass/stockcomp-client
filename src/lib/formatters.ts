import { format, isValid, parseISO } from "date-fns";

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
