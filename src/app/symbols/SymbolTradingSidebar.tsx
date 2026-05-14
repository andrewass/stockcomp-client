"use client";

import {
	ArrowPathIcon,
	BanknotesIcon,
	ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type React from "react";
import { useEffect, useMemo, useState } from "react";
import {
	CONTEST_STATUS,
	contestStatusRecord,
} from "@/domain/contests/contestTypes.ts";
import {
	ORDER_STATUS,
	TRANSACTION_TYPE,
} from "@/domain/investmentorder/investmentOrderTypes.ts";
import { formatDateTimeValue, formatMappedLabel } from "@/lib/formatters.ts";
import type {
	SymbolTradingContestViewModel,
	SymbolTradingViewModel,
} from "@/symbols/domain.ts";

interface Props {
	symbol: string;
	currentPrice: number;
	currency: string;
	initialTradingData: SymbolTradingViewModel;
}

type OrderRequest = {
	contestId: number;
	symbol: string;
	transactionType: "BUY" | "SELL";
	amount: number;
};

const terminalOrderStatuses = new Set<string>([
	ORDER_STATUS.COMPLETED,
	ORDER_STATUS.FAILED,
	ORDER_STATUS.TERMINATED,
]);

function getTradingQueryKey(symbol: string) {
	return ["symbols", "trading", symbol] as const;
}

function hasActiveOrders(data: SymbolTradingViewModel | undefined): boolean {
	return (
		data?.contests.some((contest) =>
			contest.orders.some(
				(order) => !terminalOrderStatuses.has(order.orderStatus),
			),
		) ?? false
	);
}

function formatCurrency(
	value: number,
	currency: string,
	options?: Intl.NumberFormatOptions,
): string {
	try {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency,
			...options,
		}).format(value);
	} catch {
		return new Intl.NumberFormat("en-US", {
			maximumFractionDigits: 2,
			...options,
		}).format(value);
	}
}

function formatNumber(
	value: number,
	options?: Intl.NumberFormatOptions,
): string {
	return new Intl.NumberFormat("en-US", options).format(value);
}

function formatSignedCurrency(value: number, currency: string): string {
	const sign = value > 0 ? "+" : value < 0 ? "-" : "";
	return `${sign}${formatCurrency(Math.abs(value), currency, {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	})}`;
}

function getProfitClassName(value: number): string {
	if (value > 0) {
		return "text-success";
	}

	if (value < 0) {
		return "text-error";
	}

	return "text-base-content";
}

function getOrderStatusBadgeClassName(status: string): string {
	switch (status) {
		case ORDER_STATUS.COMPLETED:
			return "badge badge-success badge-outline";
		case ORDER_STATUS.FAILED:
		case ORDER_STATUS.TERMINATED:
			return "badge badge-error badge-outline";
		case ORDER_STATUS.ACTIVE:
			return "badge badge-info badge-outline";
		default:
			return "badge badge-neutral badge-outline";
	}
}

function getContestStatusBadgeClassName(status: string): string {
	switch (status) {
		case CONTEST_STATUS.RUNNING:
			return "badge badge-success badge-outline";
		case CONTEST_STATUS.AWAITING_START:
			return "badge badge-warning badge-outline";
		case CONTEST_STATUS.STOPPED:
			return "badge badge-error badge-outline";
		default:
			return "badge badge-neutral badge-outline";
	}
}

async function fetchTradingData(
	symbol: string,
): Promise<SymbolTradingViewModel> {
	const response = await fetch(
		`/symbols/api/trading?symbol=${encodeURIComponent(symbol)}`,
	);
	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}

	return (await response.json()) as SymbolTradingViewModel;
}

async function createInvestmentOrder(request: OrderRequest): Promise<void> {
	const response = await fetch("/symbols/api/trading/orders", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(request),
	});

	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}
}

function getFirstRunningContest(
	contests: SymbolTradingContestViewModel[],
): SymbolTradingContestViewModel | undefined {
	return contests.find(
		(contest) => contest.contestStatus === CONTEST_STATUS.RUNNING,
	);
}

export default function SymbolTradingSidebar({
	symbol,
	currentPrice,
	currency,
	initialTradingData,
}: Props) {
	const queryClient = useQueryClient();
	const [selectedContestId, setSelectedContestId] = useState<
		number | undefined
	>(() => getFirstRunningContest(initialTradingData.contests)?.contestId);
	const [transactionType, setTransactionType] = useState<"BUY" | "SELL">(
		TRANSACTION_TYPE.BUY,
	);
	const [amountInput, setAmountInput] = useState("");

	const tradingQuery = useQuery({
		queryKey: getTradingQueryKey(symbol),
		queryFn: () => fetchTradingData(symbol),
		initialData: initialTradingData,
		refetchInterval: (query) =>
			hasActiveOrders(query.state.data) ? 5_000 : false,
	});

	const contests = tradingQuery.data.contests;
	const runningContests = useMemo(
		() =>
			contests.filter(
				(contest) => contest.contestStatus === CONTEST_STATUS.RUNNING,
			),
		[contests],
	);
	const selectedContest = contests.find(
		(contest) => contest.contestId === selectedContestId,
	);
	const selectedContestIsTradable =
		selectedContest?.contestStatus === CONTEST_STATUS.RUNNING;
	const amountIsPositiveInteger = /^[1-9]\d*$/.test(amountInput);
	const amount = amountIsPositiveInteger ? Number.parseInt(amountInput, 10) : 0;
	const estimatedValue = amount * currentPrice;
	const sellAmountExceedsHolding =
		transactionType === TRANSACTION_TYPE.SELL &&
		selectedContest !== undefined &&
		amount > selectedContest.investment.amount;
	const buyAmountExceedsFunds =
		transactionType === TRANSACTION_TYPE.BUY &&
		selectedContest !== undefined &&
		estimatedValue > selectedContest.remainingFunds;
	const submitDisabled =
		!selectedContest ||
		!selectedContestIsTradable ||
		!amountIsPositiveInteger ||
		sellAmountExceedsHolding ||
		buyAmountExceedsFunds;

	const orderMutation = useMutation({
		mutationFn: createInvestmentOrder,
		onSuccess: async () => {
			setAmountInput("");
			await queryClient.invalidateQueries({
				queryKey: getTradingQueryKey(symbol),
			});
		},
	});

	useEffect(() => {
		if (
			selectedContestId !== undefined &&
			contests.some(
				(contest) =>
					contest.contestId === selectedContestId &&
					contest.contestStatus === CONTEST_STATUS.RUNNING,
			)
		) {
			return;
		}

		setSelectedContestId(getFirstRunningContest(contests)?.contestId);
	}, [contests, selectedContestId]);

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		if (submitDisabled || !selectedContest) {
			return;
		}

		orderMutation.mutate({
			contestId: selectedContest.contestId,
			symbol,
			transactionType,
			amount,
		});
	}

	return (
		<div className="space-y-4 rounded-box border border-base-300 bg-base-100 p-4 shadow-sm">
			<div className="flex items-start justify-between gap-3">
				<div>
					<h2 className="text-lg font-semibold text-base-content">Trade</h2>
					<p className="text-sm text-base-content/65">
						Create orders for {symbol}.
					</p>
				</div>
				{tradingQuery.isFetching && (
					<ArrowPathIcon className="mt-1 size-5 animate-spin text-base-content/45" />
				)}
			</div>

			<form className="space-y-4" onSubmit={handleSubmit}>
				<div className="form-control">
					<label className="label" htmlFor="symbol-trading-contest">
						<span className="label-text">Contest</span>
					</label>
					<select
						id="symbol-trading-contest"
						className="select select-bordered w-full"
						value={selectedContestId ?? ""}
						disabled={runningContests.length === 0}
						onChange={(event) =>
							setSelectedContestId(Number.parseInt(event.target.value, 10))
						}
					>
						{runningContests.length === 0 ? (
							<option value="">No running contests</option>
						) : (
							runningContests.map((contest) => (
								<option key={contest.contestId} value={contest.contestId}>
									{contest.contestName}
								</option>
							))
						)}
					</select>
				</div>

				<div className="join grid grid-cols-2">
					<button
						type="button"
						className={`btn join-item ${transactionType === TRANSACTION_TYPE.BUY ? "btn-primary" : "btn-outline"}`}
						onClick={() => setTransactionType(TRANSACTION_TYPE.BUY)}
					>
						<ShoppingCartIcon className="size-4" />
						Buy
					</button>
					<button
						type="button"
						className={`btn join-item ${transactionType === TRANSACTION_TYPE.SELL ? "btn-primary" : "btn-outline"}`}
						onClick={() => setTransactionType(TRANSACTION_TYPE.SELL)}
					>
						<BanknotesIcon className="size-4" />
						Sell
					</button>
				</div>

				<div className="form-control">
					<label className="label" htmlFor="symbol-trading-amount">
						<span className="label-text">Shares</span>
					</label>
					<input
						id="symbol-trading-amount"
						type="number"
						inputMode="numeric"
						min="1"
						step="1"
						className="input input-bordered w-full"
						value={amountInput}
						onChange={(event) => setAmountInput(event.target.value)}
						placeholder="0"
					/>
				</div>

				<div className="rounded-box bg-base-200/70 p-3 text-sm">
					<div className="flex justify-between gap-3">
						<span className="text-base-content/65">Estimated value</span>
						<span className="font-semibold">
							{formatCurrency(estimatedValue, currency, {
								minimumFractionDigits: 2,
								maximumFractionDigits: 2,
							})}
						</span>
					</div>
					{selectedContest && (
						<div className="mt-2 flex justify-between gap-3">
							<span className="text-base-content/65">Remaining funds</span>
							<span>
								{formatCurrency(selectedContest.remainingFunds, currency, {
									minimumFractionDigits: 2,
									maximumFractionDigits: 2,
								})}
							</span>
						</div>
					)}
				</div>

				{buyAmountExceedsFunds && (
					<div className="alert alert-warning py-2 text-sm">
						Not enough remaining funds for this order.
					</div>
				)}
				{sellAmountExceedsHolding && (
					<div className="alert alert-warning py-2 text-sm">
						Sell quantity exceeds current holding.
					</div>
				)}
				{orderMutation.isError && (
					<div className="alert alert-error py-2 text-sm">
						Unable to create investment order.
					</div>
				)}
				{orderMutation.isSuccess && (
					<div className="alert alert-success py-2 text-sm">
						Investment order created.
					</div>
				)}

				<button
					type="submit"
					className="btn btn-primary w-full"
					disabled={submitDisabled || orderMutation.isPending}
				>
					{orderMutation.isPending && (
						<span className="loading loading-spinner loading-sm" />
					)}
					Create order
				</button>
			</form>

			<div className="divider my-2" />

			<section className="space-y-3">
				<div>
					<h3 className="font-semibold text-base-content">Investments</h3>
					<p className="text-sm text-base-content/65">
						Current position and symbol orders by contest.
					</p>
				</div>

				{tradingQuery.isError && (
					<div className="alert alert-error text-sm">
						Unable to refresh trading data.
					</div>
				)}

				{contests.length === 0 ? (
					<div className="rounded-box border border-dashed border-base-300 bg-base-200/50 px-4 py-6 text-sm text-base-content/60">
						You have not joined any contests yet.
					</div>
				) : (
					<div className="space-y-3">
						{contests.map((contest) => {
							const profitClassName = getProfitClassName(
								contest.investment.totalProfit,
							);

							return (
								<article
									key={contest.contestId}
									className="rounded-box border border-base-300 bg-base-100 p-4"
								>
									<div className="flex items-start justify-between gap-3">
										<div className="min-w-0">
											<h4 className="truncate font-semibold">
												{contest.contestName}
											</h4>
											<p className="text-xs text-base-content/55">
												{formatDateTimeValue(contest.endTime, "dd/MM HH:mm")}
											</p>
										</div>
										<span
											className={getContestStatusBadgeClassName(
												contest.contestStatus,
											)}
										>
											{formatMappedLabel(
												contest.contestStatus,
												contestStatusRecord,
											)}
										</span>
									</div>

									<div className="mt-4 grid grid-cols-2 gap-3 text-sm">
										<div>
											<p className="text-xs uppercase tracking-[0.16em] text-base-content/45">
												Shares
											</p>
											<p className="font-semibold">
												{formatNumber(contest.investment.amount, {
													maximumFractionDigits: 0,
												})}
											</p>
										</div>
										<div>
											<p className="text-xs uppercase tracking-[0.16em] text-base-content/45">
												Value
											</p>
											<p className="font-semibold">
												{formatCurrency(
													contest.investment.totalValue,
													currency,
													{
														minimumFractionDigits: 2,
														maximumFractionDigits: 2,
													},
												)}
											</p>
										</div>
										<div>
											<p className="text-xs uppercase tracking-[0.16em] text-base-content/45">
												P/L
											</p>
											<p className={`font-semibold ${profitClassName}`}>
												{formatSignedCurrency(
													contest.investment.totalProfit,
													currency,
												)}
											</p>
										</div>
										<div>
											<p className="text-xs uppercase tracking-[0.16em] text-base-content/45">
												Return
											</p>
											<p className={`font-semibold ${profitClassName}`}>
												{formatNumber(
													contest.investment.totalProfitPercentage,
													{
														minimumFractionDigits: 2,
														maximumFractionDigits: 2,
													},
												)}
												%
											</p>
										</div>
									</div>

									<div className="mt-4 space-y-2">
										<p className="text-xs font-semibold uppercase tracking-[0.16em] text-base-content/45">
											Orders
										</p>
										{contest.orders.length === 0 ? (
											<p className="text-sm text-base-content/55">
												No orders for this symbol.
											</p>
										) : (
											<div className="space-y-2">
												{contest.orders.map((order) => (
													<div
														key={order.investmentOrderId}
														className="flex items-center justify-between gap-3 rounded-box bg-base-200/60 px-3 py-2 text-sm"
													>
														<div>
															<p className="font-medium">
																{formatMappedLabel(order.transactionType, {
																	BUY: "Buy",
																	SELL: "Sell",
																})}{" "}
																{formatNumber(order.amount, {
																	maximumFractionDigits: 0,
																})}
															</p>
															{order.createdAt && (
																<p className="text-xs text-base-content/50">
																	{formatDateTimeValue(
																		order.createdAt,
																		"dd/MM HH:mm",
																	)}
																</p>
															)}
														</div>
														<span
															className={getOrderStatusBadgeClassName(
																order.orderStatus,
															)}
														>
															{formatMappedLabel(order.orderStatus, {
																ACTIVE: "Active",
																COMPLETED: "Completed",
																FAILED: "Failed",
																TERMINATED: "Terminated",
															})}
														</span>
													</div>
												))}
											</div>
										)}
									</div>
								</article>
							);
						})}
					</div>
				)}
			</section>
		</div>
	);
}
