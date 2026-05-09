"use client";

import type { SymbolPriceHistoryPoint } from "@/symbols/domain.ts";
import {
	Area,
	AreaChart,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";
import { useMemo } from "react";

interface Props {
	currency: string;
	history: SymbolPriceHistoryPoint[];
}

type ChartDatum = {
	price: number;
	timestamp: number;
};

function toTimestamp(priceDate: number): number | null {
	if (!Number.isFinite(priceDate) || priceDate <= 0) {
		return null;
	}

	return priceDate < 10_000_000_000 ? priceDate * 1000 : priceDate;
}

function toChartTimestamp(priceDate: string): number | null {
	const numericDate = Number(priceDate);
	if (Number.isFinite(numericDate)) {
		return toTimestamp(numericDate);
	}

	const parsedDate = Date.parse(priceDate);
	return Number.isNaN(parsedDate) ? null : parsedDate;
}

function isChartDatum(value: ChartDatum | null): value is ChartDatum {
	return value !== null;
}

function formatDateLabel(timestamp: number): string {
	const date = new Date(timestamp);
	if (Number.isNaN(date.getTime())) {
		return "Unknown date";
	}

	return new Intl.DateTimeFormat("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric",
	}).format(date);
}

function formatAxisPrice(value: number): string {
	return new Intl.NumberFormat("en-US", {
		notation: "compact",
		maximumFractionDigits: 1,
	}).format(value);
}

function formatCurrency(value: number, currency: string): string {
	if (!Number.isFinite(value)) {
		return "N/A";
	}

	try {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency,
			maximumFractionDigits: 2,
		}).format(value);
	} catch {
		return new Intl.NumberFormat("en-US", {
			maximumFractionDigits: 2,
		}).format(value);
	}
}

export function SymbolPriceHistoryChart({ currency, history }: Props) {
	const chartData = useMemo(
		() =>
			history
				.map((historyPoint) => {
					const timestamp = toChartTimestamp(historyPoint.priceDate);
					if (timestamp === null) {
						return null;
					}

					return {
						price: historyPoint.price,
						timestamp,
					};
				})
				.filter(isChartDatum)
				.sort((first, second) => first.timestamp - second.timestamp),
		[history],
	);

	if (chartData.length === 0) {
		return (
			<div className="flex min-h-80 items-center justify-center rounded-box border border-dashed border-base-300 bg-base-200/50 px-6 text-center">
				<p className="text-sm text-base-content/65">
					No historical prices are available for this symbol.
				</p>
			</div>
		);
	}

	return (
		<div className="h-80 w-full text-primary">
			<ResponsiveContainer width="100%" height="100%">
				<AreaChart
					data={chartData}
					margin={{ top: 8, right: 8, bottom: 8, left: 0 }}
					title="One-year price history chart"
				>
					<CartesianGrid stroke="var(--color-base-300)" strokeDasharray="3 3" />
					<XAxis
						dataKey="timestamp"
						domain={["dataMin", "dataMax"]}
						minTickGap={24}
						scale="time"
						tick={{ fill: "var(--color-base-content)", fontSize: 12 }}
						tickFormatter={(value) => formatDateLabel(Number(value))}
						tickLine={false}
						type="number"
					/>
					<YAxis
						axisLine={false}
						tick={{ fill: "var(--color-base-content)", fontSize: 12 }}
						tickFormatter={(value) => formatAxisPrice(Number(value))}
						tickLine={false}
						width={48}
					/>
					<Tooltip
						contentStyle={{
							backgroundColor: "var(--color-base-100)",
							border: "1px solid var(--color-base-300)",
							borderRadius: "0.5rem",
							color: "var(--color-base-content)",
						}}
						formatter={(value) => [
							formatCurrency(Number(value), currency),
							"Price",
						]}
						labelFormatter={(value) => formatDateLabel(Number(value))}
					/>
					<Area
						dataKey="price"
						fill="var(--color-primary)"
						fillOpacity={0.16}
						isAnimationActive={false}
						name="Price"
						stroke="currentColor"
						strokeWidth={2}
						type="monotone"
					/>
				</AreaChart>
			</ResponsiveContainer>
		</div>
	);
}
