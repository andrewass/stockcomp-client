"use client";

import {
	ArrowPathIcon,
	BanknotesIcon,
	ChevronDownIcon,
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
	participantId: number;
	symbol: string;
	transactionType: "BUY" | "SELL";
	totalAmount: number;
	currency: string;
	acceptedPrice: number;
	expirationTime: string;
};

const terminalOrderStatuses = new Set<string>([
	ORDER_STATUS.COMPLETED,
	ORDER_STATUS.FAILED,
	ORDER_STATUS.TERMINATED,
]);

function getTradingQueryKey(symbol: string) {
	return ["symbols", "trading", symbol] as const;
}

function toDateTimeLocalInputValue(date: Date): string {
	const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60_000);
	return localDate.toISOString().slice(0, 16);
}

function getDefaultExpirationTimeInput(): string {
	return toDateTimeLocalInputValue(new Date(Date.now() + 24 * 60 * 60 * 1000));
}

function getMinimumExpirationTimeInput(): string {
	return toDateTimeLocalInputValue(new Date(Date.now() + 60_000));
}

function getLocalTimeZoneName(): string {
	return Intl.DateTimeFormat().resolvedOptions().timeZone || "local time";
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

function getContestTimelineLabel(contest: SymbolTradingContestViewModel): string {
	if (contest.contestStatus === CONTEST_STATUS.AWAITING_START) {
		return `Starts ${formatDateTimeValue(contest.startTime, "dd/MM HH:mm")}`;
	}

	if (contest.contestStatus === CONTEST_STATUS.COMPLETED) {
		return `Ended ${formatDateTimeValue(contest.endTime, "dd/MM HH:mm")}`;
	}

	return `Ends ${formatDateTimeValue(contest.endTime, "dd/MM HH:mm")}`;
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
	const [acceptedPriceInput, setAcceptedPriceInput] = useState(() =>
		currentPrice.toFixed(2),
	);
	const [expirationTimeInput, setExpirationTimeInput] = useState(
		getDefaultExpirationTimeInput,
	);
	const [showOrderCreatedMessage, setShowOrderCreatedMessage] = useState(false);
	const [expandedContestId, setExpandedContestId] = useState<
		number | undefined
	>(() => initialTradingData.contests[0]?.contestId);
	const timeZoneName = useMemo(getLocalTimeZoneName, []);

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
	const acceptedPrice = Number.parseFloat(acceptedPriceInput);
	const acceptedPriceIsValid =
		acceptedPriceInput.trim() !== "" &&
		Number.isFinite(acceptedPrice) &&
		acceptedPrice > 0;
	const expirationTimeIsValid =
		expirationTimeInput.trim() !== "" &&
		!Number.isNaN(Date.parse(expirationTimeInput)) &&
		Date.parse(expirationTimeInput) > Date.now();
	const estimatedValue = amount * (acceptedPriceIsValid ? acceptedPrice : 0);
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
		!acceptedPriceIsValid ||
		!expirationTimeIsValid ||
		sellAmountExceedsHolding ||
		buyAmountExceedsFunds;

	const orderMutation = useMutation({
		mutationFn: createInvestmentOrder,
		onSuccess: async () => {
			setAmountInput("");
			setExpirationTimeInput(getDefaultExpirationTimeInput());
			setShowOrderCreatedMessage(true);
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

	useEffect(() => {
		if (
			expandedContestId !== undefined &&
			contests.some((contest) => contest.contestId === expandedContestId)
		) {
			return;
		}

		setExpandedContestId(contests[0]?.contestId);
	}, [contests, expandedContestId]);

	useEffect(() => {
		setAcceptedPriceInput(currentPrice.toFixed(2));
		setExpirationTimeInput(getDefaultExpirationTimeInput());
	}, [currentPrice, symbol]);

	useEffect(() => {
		if (!showOrderCreatedMessage) {
			return;
		}

		const timeoutId = window.setTimeout(() => {
			setShowOrderCreatedMessage(false);
			orderMutation.reset();
		}, 3_000);

		return () => window.clearTimeout(timeoutId);
	}, [orderMutation, showOrderCreatedMessage]);

	function clearOrderCreatedMessage() {
		if (showOrderCreatedMessage) {
			setShowOrderCreatedMessage(false);
			orderMutation.reset();
		}
	}

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		if (submitDisabled || !selectedContest) {
			return;
		}

		orderMutation.mutate({
			contestId: selectedContest.contestId,
			participantId: selectedContest.participantId,
			symbol,
			transactionType,
			totalAmount: amount,
			currency,
			acceptedPrice,
			expirationTime: expirationTimeInput,
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
						name="contestId"
						className="select select-bordered w-full"
						value={selectedContestId ?? ""}
						disabled={runningContests.length === 0}
						onChange={(event) => {
							clearOrderCreatedMessage();
							setSelectedContestId(Number.parseInt(event.target.value, 10));
						}}
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
						onClick={() => {
							clearOrderCreatedMessage();
							setTransactionType(TRANSACTION_TYPE.BUY);
						}}
					>
						<ShoppingCartIcon className="size-4" />
						Buy
					</button>
					<button
						type="button"
						className={`btn join-item ${transactionType === TRANSACTION_TYPE.SELL ? "btn-primary" : "btn-outline"}`}
						onClick={() => {
							clearOrderCreatedMessage();
							setTransactionType(TRANSACTION_TYPE.SELL);
						}}
					>
						<BanknotesIcon className="size-4" />
						Sell
					</button>
				</div>

				<div className="form-control">
					<label className="label" htmlFor="symbol-trading-amount">
						<span className="label-text">Total shares</span>
					</label>
					<input
						id="symbol-trading-amount"
						name="totalAmount"
						type="number"
						inputMode="numeric"
						min="1"
						step="1"
						required
						autoComplete="off"
						className="input input-bordered w-full"
						value={amountInput}
						onChange={(event) => {
							clearOrderCreatedMessage();
							setAmountInput(event.target.value);
						}}
						placeholder="0"
					/>
				</div>

				<div className="grid gap-3 sm:grid-cols-2">
					<div className="form-control">
						<label className="label" htmlFor="symbol-trading-accepted-price">
							<span className="label-text">
								{transactionType === TRANSACTION_TYPE.BUY
									? "Max price"
									: "Min price"}
							</span>
						</label>
						<input
							id="symbol-trading-accepted-price"
							name="acceptedPrice"
							type="number"
							inputMode="decimal"
							min="0.01"
							step="0.01"
							required
							autoComplete="off"
							className="input input-bordered w-full"
							value={acceptedPriceInput}
							onChange={(event) => {
								clearOrderCreatedMessage();
								setAcceptedPriceInput(event.target.value);
							}}
							placeholder={currentPrice.toFixed(2)}
						/>
					</div>

					<div className="form-control">
						<label className="label" htmlFor="symbol-trading-expiration">
							<span className="label-text">Expires</span>
						</label>
						<input
							id="symbol-trading-expiration"
							name="expirationTime"
							type="datetime-local"
							min={getMinimumExpirationTimeInput()}
							required
							autoComplete="off"
							className="input input-bordered w-full"
							value={expirationTimeInput}
							onChange={(event) => {
								clearOrderCreatedMessage();
								setExpirationTimeInput(event.target.value);
							}}
						/>
						<p className="mt-1 text-xs text-base-content/55">
							Local time: {timeZoneName}
						</p>
					</div>
				</div>

				<div className="rounded-box bg-base-200/70 p-3 text-sm">
					<div className="flex justify-between gap-3">
						<span className="text-base-content/65">Current price</span>
						<span className="font-semibold">
							{formatCurrency(currentPrice, currency, {
								minimumFractionDigits: 2,
								maximumFractionDigits: 2,
							})}
						</span>
					</div>
					<div className="mt-2 flex justify-between gap-3">
						<span className="text-base-content/65">
							{transactionType === TRANSACTION_TYPE.BUY
								? "Max order value"
								: "Min order value"}
						</span>
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
				{!acceptedPriceIsValid && acceptedPriceInput.trim() !== "" && (
					<div className="alert alert-warning py-2 text-sm">
						Limit price must be greater than zero.
					</div>
				)}
				{!expirationTimeIsValid && expirationTimeInput.trim() !== "" && (
					<div className="alert alert-warning py-2 text-sm">
						Expiration must be in the future.
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
				{showOrderCreatedMessage && (
					<div className="alert alert-success py-2 text-sm" aria-live="polite">
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
							const isExpanded = expandedContestId === contest.contestId;
							const statusLabel = formatMappedLabel(
								contest.contestStatus,
								contestStatusRecord,
							);
							const panelId = `symbol-trading-contest-panel-${contest.contestId}`;
							const triggerId = `symbol-trading-contest-trigger-${contest.contestId}`;

							return (
								<article
									key={contest.contestId}
									className="overflow-hidden rounded-box border border-base-300 bg-base-100"
								>
									<button
										id={triggerId}
										type="button"
										className="flex w-full items-start justify-between gap-3 p-4 text-left"
										aria-expanded={isExpanded}
										aria-controls={panelId}
										onClick={() =>
											setExpandedContestId(
												isExpanded ? undefined : contest.contestId,
											)
										}
									>
										<div className="min-w-0">
											<div className="flex items-center gap-2">
												<h4 className="truncate font-semibold">
													{contest.contestName}
												</h4>
												<ChevronDownIcon
													className={`size-4 shrink-0 text-base-content/45 transition-transform ${
														isExpanded ? "rotate-180" : ""
													}`}
													aria-hidden="true"
												/>
											</div>
											<p className="mt-1 text-xs text-base-content/55">
												{getContestTimelineLabel(contest)}
											</p>
										</div>
										<span
											className={`${getContestStatusBadgeClassName(
												contest.contestStatus,
											)} shrink-0`}
										>
											{statusLabel}
										</span>
									</button>

									{isExpanded && (
										<div
											id={panelId}
											aria-labelledby={triggerId}
											className="border-t border-base-300 p-4"
										>
											<div className="grid grid-cols-2 gap-2 text-sm">
												<div className="rounded-box bg-base-200/60 px-3 py-2">
													<p className="text-xs uppercase tracking-[0.14em] text-base-content/45">
														Shares
													</p>
													<p className="font-semibold tabular-nums">
														{formatNumber(contest.investment.amount, {
															maximumFractionDigits: 0,
														})}
													</p>
												</div>
												<div className="rounded-box bg-base-200/60 px-3 py-2">
													<p className="text-xs uppercase tracking-[0.14em] text-base-content/45">
														Value
													</p>
													<p className="font-semibold tabular-nums">
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
												<div className="rounded-box bg-base-200/60 px-3 py-2">
													<p className="text-xs uppercase tracking-[0.14em] text-base-content/45">
														P/L
													</p>
													<p
														className={`font-semibold tabular-nums ${profitClassName}`}
													>
														{formatSignedCurrency(
															contest.investment.totalProfit,
															currency,
														)}
													</p>
												</div>
												<div className="rounded-box bg-base-200/60 px-3 py-2">
													<p className="text-xs uppercase tracking-[0.14em] text-base-content/45">
														Return
													</p>
													<p
														className={`font-semibold tabular-nums ${profitClassName}`}
													>
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
												<div className="flex items-center justify-between gap-3">
													<p className="text-xs font-semibold uppercase tracking-[0.16em] text-base-content/45">
														Orders
													</p>
													{contest.orders.length > 2 && (
														<span className="text-xs text-base-content/50">
															Scroll to view all
														</span>
													)}
												</div>
												{contest.orders.length === 0 ? (
													<p className="text-sm text-base-content/55">
														No orders for this symbol.
													</p>
												) : (
													<div
														className={`space-y-2 ${
															contest.orders.length > 2
																? "max-h-56 overflow-y-auto overscroll-contain pr-1 [scrollbar-gutter:stable]"
																: ""
														}`}
													>
														{contest.orders.map((order, orderIndex) => (
															<div
																key={`${order.investmentOrderId ?? "order"}-${orderIndex}`}
																className="rounded-box bg-base-200/60 px-3 py-2 text-sm"
															>
																<div className="flex items-start justify-between gap-3">
																	<div className="min-w-0">
																		<p className="font-medium">
																			Order{" "}
																			{order.investmentOrderId === null
																				? "-"
																				: `#${order.investmentOrderId}`}
																		</p>
																		<p className="text-xs text-base-content/50">
																			{formatMappedLabel(order.transactionType, {
																				BUY: "Buy",
																				SELL: "Sell",
																			})}
																		</p>
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
																<div className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1 text-xs text-base-content/55">
																	<span>Remaining</span>
																	<span className="text-right tabular-nums">
																		{formatNumber(order.remainingAmount, {
																			maximumFractionDigits: 0,
																		})}{" "}
																		/{" "}
																		{formatNumber(order.totalAmount, {
																			maximumFractionDigits: 0,
																		})}
																	</span>
																	<span>Limit</span>
																	<span className="text-right tabular-nums">
																		{formatCurrency(
																			order.acceptedPrice,
																			order.currency,
																			{
																				minimumFractionDigits: 2,
																				maximumFractionDigits: 2,
																			},
																		)}
																	</span>
																	{order.expirationTime && (
																		<>
																			<span>Expires</span>
																			<span className="text-right tabular-nums">
																				{formatDateTimeValue(
																					order.expirationTime,
																					"dd/MM HH:mm",
																				)}
																			</span>
																		</>
																	)}
																</div>
															</div>
														))}
													</div>
												)}
											</div>
										</div>
									)}
								</article>
							);
						})}
					</div>
				)}
			</section>
		</div>
	);
}
