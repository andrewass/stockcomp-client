"use client";

import * as countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import { useMemo, useRef, useState } from "react";
import ReactCountryFlag from "react-country-flag";

countries.registerLocale(enLocale);

interface CountryOption {
	code: string;
	name: string;
}

interface Props {
	error?: string;
	helpText?: string;
	id: string;
	label: string;
	onChange: (countryCode: string) => void;
	value: string;
}

const COUNTRY_OPTIONS: CountryOption[] = Object.entries(
	countries.getNames("en", { select: "official" }),
)
	.map(([code, name]) => ({ code, name }))
	.sort((first, second) => first.name.localeCompare(second.name));

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

function getCountryLabel(countryCode: string): string {
	if (!countryCode) {
		return "";
	}

	return countries.getName(countryCode, "en", { select: "official" }) ?? "";
}

export default function CountryCombobox({
	error,
	helpText,
	id,
	label,
	onChange,
	value,
}: Props) {
	const normalizedValue = normalizeCountryCode(value);
	const selectedLabel = getCountryLabel(normalizedValue);
	const [isOpen, setIsOpen] = useState(false);
	const [searchTerm, setSearchTerm] = useState(selectedLabel);
	const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const filteredOptions = useMemo(() => {
		const normalizedSearchTerm = searchTerm.trim().toLowerCase();
		if (!normalizedSearchTerm) {
			return COUNTRY_OPTIONS.slice(0, 30);
		}

		return COUNTRY_OPTIONS.filter(
			(option) =>
				option.name.toLowerCase().includes(normalizedSearchTerm) ||
				option.code.toLowerCase().includes(normalizedSearchTerm),
		).slice(0, 30);
	}, [searchTerm]);

	function clearCloseTimeout() {
		if (!closeTimeoutRef.current) {
			return;
		}

		clearTimeout(closeTimeoutRef.current);
		closeTimeoutRef.current = null;
	}

	function handleSelect(option: CountryOption) {
		clearCloseTimeout();
		onChange(option.code);
		setSearchTerm(option.name);
		setIsOpen(false);
	}

	function handleInputBlur() {
		closeTimeoutRef.current = setTimeout(() => {
			setIsOpen(false);
			setSearchTerm(selectedLabel);
		}, 120);
	}

	return (
		<div className="relative flex flex-col gap-2 md:col-span-2">
			<label className="label p-0" htmlFor={id}>
				{label}
			</label>
			<div
				className={`input input-bordered flex h-12 w-full items-center px-3 ${normalizedValue ? "gap-3" : ""} ${error ? "input-error" : ""}`}
			>
				{normalizedValue ? (
					<ReactCountryFlag
						aria-label={selectedLabel}
						countryCode={normalizedValue}
						svg={true}
						style={{
							borderRadius: "2px",
							height: "1.1rem",
							width: "1.45rem",
						}}
					/>
				) : null}
				<input
					aria-autocomplete="list"
					aria-expanded={isOpen}
					aria-controls={`${id}-options`}
					autoComplete="off"
					className="min-w-0 flex-1 bg-transparent outline-none"
					id={id}
					onBlur={handleInputBlur}
					onChange={(event) => {
						setSearchTerm(event.target.value);
						setIsOpen(true);
						if (!event.target.value.trim()) {
							onChange("");
						}
					}}
					onFocus={() => {
						clearCloseTimeout();
						setIsOpen(true);
					}}
					placeholder="Search country"
					role="combobox"
					type="text"
					value={isOpen ? searchTerm : selectedLabel}
				/>
			</div>

			{isOpen ? (
				<ul
					className="menu absolute top-20 z-40 max-h-72 w-full overflow-y-auto rounded-lg border border-base-300 bg-base-100 p-2 shadow-xl"
					id={`${id}-options`}
				>
					{filteredOptions.length > 0 ? (
						filteredOptions.map((option) => (
							<li key={option.code}>
								<button
									className="flex items-center gap-3"
									onMouseDown={(event) => event.preventDefault()}
									onClick={() => handleSelect(option)}
									type="button"
								>
									<ReactCountryFlag
										aria-label={option.name}
										countryCode={option.code}
										svg={true}
										style={{
											borderRadius: "2px",
											height: "1rem",
											width: "1.35rem",
										}}
									/>
									<span className="truncate">{option.name}</span>
								</button>
							</li>
						))
					) : (
						<li className="px-3 py-2 text-sm text-base-content/60">
							No countries found.
						</li>
					)}
				</ul>
			) : null}

			{error ? (
				<p className="text-sm text-error">{error}</p>
			) : helpText ? (
				<p className="text-sm text-base-content/60">{helpText}</p>
			) : null}
		</div>
	);
}
