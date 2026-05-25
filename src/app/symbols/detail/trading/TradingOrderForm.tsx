"use client";

import { BanknotesIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import type React from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { CONTEST_STATUS } from "@/domain/contests/contestTypes.ts";
import {
	TRANSACTION_TYPE,
	type TransactionType,
} from "@/domain/investmentorder/investmentOrderTypes.ts";
import { formatCurrency } from "@/lib/formatters.ts";
import type { SymbolTradingOrderRequest } from "@/symbols/detail/trading/tradingTypes.ts";
import type { SymbolTradingContestViewModel } from "@/symbols/domain.ts";

interface Props {
	symbol: string;
	currentPrice: number;
	currency: string;
	contests: SymbolTradingContestViewModel[];
	orderIsError: boolean;
	orderIsPending: boolean;
	onCreateOrder: (
		request: SymbolTradingOrderRequest,
		onSuccess: () => void,
	) => void;
	onOrderStatusReset: () => void;
}

function getFirstRunningContest(
	contests: SymbolTradingContestViewModel[],
): SymbolTradingContestViewModel | undefined {
	return contests.find(
		(contest) => contest.contestStatus === CONTEST_STATUS.RUNNING,
	);
}

function toDateTimeLocalInputValue(date: Date): string {
	const localDate = new Date(
		date.getTime() - date.getTimezoneOffset() * 60_000,
	);
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

export function TradingOrderForm({
	symbol,
	currentPrice,
	currency,
	contests,
	orderIsError,
	orderIsPending,
	onCreateOrder,
	onOrderStatusReset,
}: Props) {
	const [selectedContestId, setSelectedContestId] = useState<
		number | undefined
	>(() => getFirstRunningContest(contests)?.contestId);
	const [transactionType, setTransactionType] = useState<TransactionType>(
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
	const previousSymbolRef = useRef(symbol);
	const previousCurrentPriceRef = useRef(currentPrice);
	const timeZoneName = useMemo(getLocalTimeZoneName, []);
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
		const symbolChanged = previousSymbolRef.current !== symbol;
		const currentPriceChanged =
			previousCurrentPriceRef.current !== currentPrice;
		previousSymbolRef.current = symbol;
		previousCurrentPriceRef.current = currentPrice;

		if (!symbolChanged && !currentPriceChanged) {
			return;
		}

		setAcceptedPriceInput(currentPrice.toFixed(2));
		setExpirationTimeInput(getDefaultExpirationTimeInput());
	}, [currentPrice, symbol]);

	useEffect(() => {
		if (!showOrderCreatedMessage) {
			return;
		}

		const timeoutId = window.setTimeout(() => {
			setShowOrderCreatedMessage(false);
			onOrderStatusReset();
		}, 3_000);

		return () => window.clearTimeout(timeoutId);
	}, [onOrderStatusReset, showOrderCreatedMessage]);

	function clearOrderCreatedMessage() {
		if (showOrderCreatedMessage) {
			setShowOrderCreatedMessage(false);
			onOrderStatusReset();
		}
	}

	function handleContestChange(contestId: number) {
		clearOrderCreatedMessage();
		setSelectedContestId(contestId);
	}

	function handleTransactionTypeChange(nextTransactionType: TransactionType) {
		clearOrderCreatedMessage();
		setTransactionType(nextTransactionType);
	}

	function handleAmountChange(nextAmount: string) {
		clearOrderCreatedMessage();
		setAmountInput(nextAmount);
	}

	function handleAcceptedPriceChange(nextAcceptedPrice: string) {
		clearOrderCreatedMessage();
		setAcceptedPriceInput(nextAcceptedPrice);
	}

	function handleExpirationTimeChange(nextExpirationTime: string) {
		clearOrderCreatedMessage();
		setExpirationTimeInput(nextExpirationTime);
	}

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		if (submitDisabled || !selectedContest) {
			return;
		}

		onCreateOrder(
			{
				contestId: selectedContest.contestId,
				participantId: selectedContest.participantId,
				symbol,
				transactionType,
				totalAmount: amount,
				currency,
				acceptedPrice,
				expirationTime: expirationTimeInput,
			},
			() => {
				setAmountInput("");
				setExpirationTimeInput(getDefaultExpirationTimeInput());
				setShowOrderCreatedMessage(true);
			},
		);
	}

	return (
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
					onChange={(event) =>
						handleContestChange(Number.parseInt(event.target.value, 10))
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

			<div className="grid grid-cols-2 gap-1 rounded-box bg-base-200 p-1">
				<button
					type="button"
					className={`btn border ${
						transactionType === TRANSACTION_TYPE.BUY
							? "btn-primary border-primary"
							: "border-transparent bg-transparent shadow-none hover:border-transparent hover:bg-base-100"
					}`}
					aria-pressed={transactionType === TRANSACTION_TYPE.BUY}
					onClick={() => handleTransactionTypeChange(TRANSACTION_TYPE.BUY)}
				>
					<ShoppingCartIcon className="size-4" />
					Buy
				</button>
				<button
					type="button"
					className={`btn border ${
						transactionType === TRANSACTION_TYPE.SELL
							? "btn-primary border-primary"
							: "border-transparent bg-transparent shadow-none hover:border-transparent hover:bg-base-100"
					}`}
					aria-pressed={transactionType === TRANSACTION_TYPE.SELL}
					onClick={() => handleTransactionTypeChange(TRANSACTION_TYPE.SELL)}
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
					onChange={(event) => handleAmountChange(event.target.value)}
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
						onChange={(event) => handleAcceptedPriceChange(event.target.value)}
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
						onChange={(event) => handleExpirationTimeChange(event.target.value)}
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
			{orderIsError && (
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
				disabled={submitDisabled || orderIsPending}
			>
				{orderIsPending && (
					<span className="loading loading-spinner loading-sm" />
				)}
				Create order
			</button>
		</form>
	);
}
