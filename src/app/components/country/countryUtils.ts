import * as countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";

countries.registerLocale(enLocale);

export interface CountryOption {
	code: string;
	name: string;
}

const COUNTRY_OPTIONS: CountryOption[] = Object.entries(
	countries.getNames("en", { select: "official" }),
)
	.map(([code, name]) => ({ code, name }))
	.sort((first, second) => first.name.localeCompare(second.name));

export function getCountryOptions(): CountryOption[] {
	return COUNTRY_OPTIONS;
}

export function normalizeCountryCode(value: string): string {
	const trimmedValue = value.trim();
	if (!trimmedValue) {
		return "";
	}

	const upperValue = trimmedValue.toUpperCase();
	if (countries.isValid(upperValue)) {
		return countries.toAlpha2(upperValue) ?? upperValue;
	}

	return countries.getAlpha2Code(trimmedValue, "en") ?? "";
}

export function getCountryName(countryCode: string): string {
	if (!countryCode) {
		return "";
	}

	return countries.getName(countryCode, "en", { select: "official" }) ?? "";
}
