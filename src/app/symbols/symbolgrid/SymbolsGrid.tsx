import Link from "next/link";
import type { SymbolCardViewModel } from "@/symbols/symbolTypes.ts";

interface Props {
	symbols: SymbolCardViewModel[];
}

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

export function SymbolsGrid({ symbols }: Props) {
	return (
		<section className="space-y-4">
			<div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
				<div className="space-y-1">
					<h2 className="text-2xl font-semibold tracking-tight">
						Popular symbols
					</h2>
					<p className="text-sm leading-6 text-base-content/70">
						A broad watchlist layout for fast scanning. Dummy values for now,
						but shaped like the real view models we will replace later.
					</p>
				</div>
				<span className="badge badge-outline badge-lg w-fit">
					24h price change
				</span>
			</div>
			<div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
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
									<span>{formatChange(symbol.priceChange, symbol.currency)}</span>
									<span aria-hidden="true">/</span>
									<span>
										{symbol.percentageChange > 0 ? "+" : ""}
										{symbol.percentageChange.toFixed(2)}%
									</span>
								</div>
							</div>
							<div className="mt-auto flex items-center justify-between text-sm text-base-content/55">
								<span>Last 24 hours</span>
								<span className="link link-hover font-medium">Open details</span>
							</div>
						</div>
					</Link>
				))}
			</div>
		</section>
	);
}
