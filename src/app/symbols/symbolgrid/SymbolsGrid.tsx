"use client";

import Link from "next/link";
import type { SymbolCardViewModel } from "@/domain/symbol/symbolTypes.ts";
import { useQuery } from "@tanstack/react-query";

const SYMBOL_CARD_SKELETON_KEYS = [
	"symbol-card-skeleton-1",
	"symbol-card-skeleton-2",
	"symbol-card-skeleton-3",
	"symbol-card-skeleton-4",
	"symbol-card-skeleton-5",
	"symbol-card-skeleton-6",
	"symbol-card-skeleton-7",
	"symbol-card-skeleton-8",
	"symbol-card-skeleton-9",
];

function formatPrice(value: number, currency: string): string {
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency,
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	}).format(value);
}

function formatChange(value: number, currency: string): string {
	const sign = value > 0 ? "+" : value < 0 ? "-" : "";
	return `${sign}${formatPrice(Math.abs(value), currency)}`;
}

function getChangeStyles(change: number): string {
	if (change > 0) {
		return "border-success/30 bg-success/10 text-success";
	}
	if (change < 0) {
		return "border-error/30 bg-error/10 text-error";
	}
	return "border-base-300 bg-base-200 text-base-content/70";
}

async function fetchTrendingSymbols(): Promise<SymbolCardViewModel[]> {
	const response = await fetch("/symbols/api/symbols");
	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}

	return (await response.json()) as SymbolCardViewModel[];
}

function SymbolCardSkeleton() {
	return (
		<div
			className="rounded-box border border-base-300 bg-base-100 p-5 shadow-sm"
			aria-hidden="true"
		>
			<div className="flex h-full flex-col gap-5">
				<div className="flex items-start justify-between gap-3">
					<div className="flex-1 space-y-2">
						<div className="skeleton h-3 w-20" />
						<div className="skeleton h-6 w-3/4" />
					</div>
					<div className="skeleton h-5 w-12 rounded-full" />
				</div>
				<div className="space-y-3">
					<div className="skeleton h-9 w-36" />
					<div className="skeleton h-8 w-40 rounded-full" />
				</div>
			</div>
		</div>
	);
}

export function SymbolsGrid() {
	const trendingSymbols = useQuery({
		queryKey: ["symbols", "trending-prices"],
		queryFn: fetchTrendingSymbols,
		refetchInterval: 5_000,
		staleTime: 5_000,
	});
	const symbols = trendingSymbols.data ?? [];
	const shouldShowSkeleton = symbols.length === 0 && trendingSymbols.isFetching;

	return (
		<section aria-busy={shouldShowSkeleton}>
			<div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
				{shouldShowSkeleton ? (
					<>
						<span className="sr-only">Loading symbols</span>
						{SYMBOL_CARD_SKELETON_KEYS.map((key) => (
							<SymbolCardSkeleton key={key} />
						))}
					</>
				) : null}
				{symbols.map((symbol) => (
					<Link
						key={symbol.symbol}
						href={`/symbols/${symbol.symbol}`}
						className="group block rounded-box border border-base-300 bg-base-100 p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg"
					>
						<div className="flex h-full flex-col gap-5">
							<div className="flex items-start justify-between gap-3">
								<div className="space-y-1">
									<p className="text-xs font-semibold uppercase tracking-[0.24em] text-base-content/55">
										{symbol.symbol}
									</p>
									<h3 className="text-lg font-semibold leading-6 group-hover:text-primary">
										{symbol.companyName}
									</h3>
								</div>
								<span className="badge badge-ghost badge-sm">
									{symbol.currency}
								</span>
							</div>
							<div className="space-y-2">
								<p className="text-3xl font-semibold tracking-tight">
									{formatPrice(symbol.currentPrice, symbol.currency)}
								</p>
								<div
									className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium ${getChangeStyles(
										symbol.percentageChange,
									)}`}
								>
									<span>
										{formatChange(symbol.priceChange, symbol.currency)}
									</span>
									<span aria-hidden="true">/</span>
									<span>
										{symbol.percentageChange > 0 ? "+" : ""}
										{symbol.percentageChange.toFixed(2)}%
									</span>
								</div>
							</div>
						</div>
					</Link>
				))}
			</div>
		</section>
	);
}
