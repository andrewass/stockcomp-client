const fallbackNumberFormatter = new Intl.NumberFormat("en-US", {
	maximumFractionDigits: 2,
});

export function formatNumber(
	value: number,
	options?: Intl.NumberFormatOptions,
): string {
	return new Intl.NumberFormat("en-US", options).format(value);
}

export function formatCurrency(
	value: number,
	currency = "USD",
	options?: Intl.NumberFormatOptions,
): string {
	try {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency,
			...options,
		}).format(value);
	} catch {
		return fallbackNumberFormatter.format(value);
	}
}

export function formatSignedCurrency(value: number): string {
	const sign = value > 0 ? "+" : value < 0 ? "-" : "";
	return `${sign}${formatCurrency(Math.abs(value), "USD", {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	})}`;
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
