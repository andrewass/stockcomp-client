"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
	type KeyboardEvent,
	useEffect,
	useId,
	useMemo,
	useRef,
	useState,
} from "react";
import type { SymbolSearchResultViewModel } from "@/symbols/domain.ts";

const SEARCH_DEBOUNCE_MS = 180;
const SEARCH_STALE_TIME_MS = 5 * 60 * 1000;

async function fetchSymbolSearchResults(
	query: string,
): Promise<SymbolSearchResultViewModel[]> {
	const searchParams = new URLSearchParams({ query });
	const response = await fetch(
		`/symbols/api/search?${searchParams.toString()}`,
	);

	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}

	return (await response.json()) as SymbolSearchResultViewModel[];
}

export function SymbolSearch() {
	const router = useRouter();
	const inputId = useId();
	const listboxId = useId();
	const searchRootRef = useRef<HTMLDivElement>(null);
	const [query, setQuery] = useState("");
	const [debouncedQuery, setDebouncedQuery] = useState("");
	const [isOpen, setIsOpen] = useState(false);
	const [activeIndex, setActiveIndex] = useState(-1);
	const normalizedQuery = query.trim();
	const normalizedDebouncedQuery = debouncedQuery.trim();

	useEffect(() => {
		const timeoutId = window.setTimeout(() => {
			setDebouncedQuery(query);
		}, SEARCH_DEBOUNCE_MS);

		return () => window.clearTimeout(timeoutId);
	}, [query]);

	useEffect(() => {
		function handlePointerDown(event: PointerEvent) {
			if (
				searchRootRef.current &&
				!searchRootRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
				setActiveIndex(-1);
			}
		}

		document.addEventListener("pointerdown", handlePointerDown);
		return () => document.removeEventListener("pointerdown", handlePointerDown);
	}, []);

	const symbolSearch = useQuery({
		queryKey: ["symbols", "search", normalizedDebouncedQuery],
		queryFn: () => fetchSymbolSearchResults(normalizedDebouncedQuery),
		enabled: normalizedDebouncedQuery.length > 0,
		staleTime: SEARCH_STALE_TIME_MS,
	});

	const results = symbolSearch.data ?? [];
	const isWaitingForSearch =
		normalizedQuery.length > 0 &&
		normalizedQuery.toLowerCase() !== normalizedDebouncedQuery.toLowerCase();
	const visibleResults = isWaitingForSearch ? [] : results;
	const shouldShowResults = isOpen && normalizedQuery.length > 0;
	const shouldShowNoMatches =
		shouldShowResults &&
		normalizedDebouncedQuery.length > 0 &&
		!isWaitingForSearch &&
		!symbolSearch.isFetching &&
		!symbolSearch.isError &&
		visibleResults.length === 0;
	const shouldShowSearching =
		shouldShowResults && (isWaitingForSearch || symbolSearch.isFetching);
	const activeResult =
		activeIndex >= 0 ? visibleResults[activeIndex] : undefined;
	const activeOptionId = activeResult
		? `${listboxId}-option-${activeResult.symbol}`
		: undefined;
	const hintText = useMemo(() => {
		if (!normalizedQuery) {
			return "Search by ticker or company name.";
		}

		if (isWaitingForSearch || symbolSearch.isFetching) {
			return "Searching symbols.";
		}

		if (symbolSearch.isError) {
			return "Search is temporarily unavailable.";
		}

		if (visibleResults.length > 0) {
			return `${visibleResults.length} symbol suggestions available.`;
		}

		return "No matching symbols.";
	}, [
		isWaitingForSearch,
		normalizedQuery,
		symbolSearch.isError,
		symbolSearch.isFetching,
		visibleResults.length,
	]);

	function navigateToSymbol(symbol: string) {
		setIsOpen(false);
		setActiveIndex(-1);
		router.push(`/symbols/${encodeURIComponent(symbol)}`);
	}

	function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
		if (event.key === "Escape") {
			setIsOpen(false);
			setActiveIndex(-1);
			return;
		}

		if (!shouldShowResults) {
			return;
		}

		if (event.key === "ArrowDown") {
			event.preventDefault();
			if (visibleResults.length === 0) {
				return;
			}

			setActiveIndex((currentIndex) =>
				currentIndex >= visibleResults.length - 1 ? 0 : currentIndex + 1,
			);
			return;
		}

		if (event.key === "ArrowUp") {
			event.preventDefault();
			if (visibleResults.length === 0) {
				return;
			}

			setActiveIndex((currentIndex) =>
				currentIndex <= 0 ? visibleResults.length - 1 : currentIndex - 1,
			);
			return;
		}

		if (event.key === "Enter" && activeResult) {
			event.preventDefault();
			navigateToSymbol(activeResult.symbol);
		}
	}

	return (
		<section
			ref={searchRootRef}
			className="relative z-40"
			aria-label="Symbol search"
		>
			<label htmlFor={inputId} className="sr-only">
				Search symbols or companies
			</label>
			<div className="input input-bordered flex h-12 w-full items-center gap-3 focus-within:border-base-300 focus-within:outline-none focus-within:ring-1 focus-within:ring-base-content/10">
				<MagnifyingGlassIcon
					className="pointer-events-none size-5 shrink-0 text-base-content/45"
					aria-hidden="true"
				/>
				<input
					id={inputId}
					type="search"
					value={query}
					onChange={(event) => {
						setQuery(event.target.value);
						setIsOpen(true);
						setActiveIndex(-1);
					}}
					onFocus={() => setIsOpen(true)}
					onKeyDown={handleKeyDown}
					className="min-w-0 grow bg-transparent text-base outline-none"
					placeholder="Search by ticker or company name"
					autoComplete="off"
					role="combobox"
					aria-autocomplete="list"
					aria-controls={listboxId}
					aria-expanded={shouldShowResults}
					aria-activedescendant={activeOptionId}
				/>
			</div>
			<p className="sr-only" aria-live="polite">
				{hintText}
			</p>

			{shouldShowResults ? (
				<div
					id={listboxId}
					role="listbox"
					className="absolute left-0 top-full z-50 mt-2 w-full overflow-hidden rounded-box border border-base-content/20 bg-base-100 shadow-2xl ring-1 ring-base-content/10"
				>
					{visibleResults.length > 0 ? (
						<ul className="menu w-full divide-y divide-base-300/80 p-1">
							{visibleResults.map((result, index) => {
								const isActive = index === activeIndex;

								return (
									<li key={result.symbol}>
										<Link
											id={`${listboxId}-option-${result.symbol}`}
											role="option"
											aria-selected={isActive}
											href={`/symbols/${result.symbol}`}
											onMouseEnter={() => setActiveIndex(index)}
											onMouseDown={(event) => event.preventDefault()}
											onClick={() => {
												setIsOpen(false);
												setActiveIndex(-1);
											}}
											className={`flex items-center justify-between gap-3 rounded-md px-3 py-2.5 ${
												isActive ? "active" : ""
											}`}
										>
											<span className="min-w-0">
												<span className="block font-semibold">
													{result.symbol}
												</span>
												<span className="block truncate text-sm text-base-content/65">
													{result.companyName}
												</span>
											</span>
										</Link>
									</li>
								);
							})}
						</ul>
					) : null}

					{shouldShowNoMatches ? (
						<div className="px-4 py-3 text-sm text-base-content/65">
							No matches
						</div>
					) : null}

					{shouldShowSearching ? (
						<div className="px-4 py-3 text-sm text-base-content/65">
							Searching...
						</div>
					) : null}

					{!isWaitingForSearch && symbolSearch.isError ? (
						<div className="px-4 py-3 text-sm text-error">
							Search is temporarily unavailable.
						</div>
					) : null}
				</div>
			) : null}
		</section>
	);
}
