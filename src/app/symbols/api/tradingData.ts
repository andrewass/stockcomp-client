import "server-only";
import { resourceGet, resourcePost } from "@/api/resourceServerClient.ts";
import type { Contest } from "@/domain/contests/contestTypes.ts";
import { CONTEST_STATUS } from "@/domain/contests/contestTypes.ts";
import type { SymbolInvestmentSummary } from "@/domain/investment/investmentTypes.ts";
import {
	type CreateInvestmentOrderRequest,
	type InvestmentOrder,
	ORDER_STATUS,
	TRANSACTION_TYPE,
	type TransactionType,
} from "@/domain/investmentorder/investmentOrderTypes.ts";
import type {
	SymbolTradingContestViewModel,
	SymbolTradingOrderViewModel,
	SymbolTradingViewModel,
} from "@/symbols/domain.ts";

interface ParticipantPortfolioSummary {
	remainingFunds?: number;
}

interface SymbolPortfolioContestResponse {
	contest?: Contest;
	contestId?: number;
	contestName?: string;
	contestStatus?: string;
	startTime?: string;
	endTime?: string;
	participant?: ParticipantPortfolioSummary;
	remainingFunds?: number;
	investment?: Partial<SymbolInvestmentSummary> | null;
	orders?: InvestmentOrder[];
	investmentOrders?: InvestmentOrder[];
}

const USE_DUMMY_TRADING_DATA = true;

let dummyOrderSequence = 10_000;
const dummyOrdersBySymbol = new Map<string, InvestmentOrder[]>();

function normalizeSymbol(symbol: string): string {
	return symbol.trim().toUpperCase();
}

function toFiniteNumber(value: number | null | undefined): number {
	return value === undefined || value === null || !Number.isFinite(value)
		? 0
		: value;
}

function mapTradingOrder(order: InvestmentOrder): SymbolTradingOrderViewModel {
	return {
		investmentOrderId: order.investmentOrderId,
		transactionType: order.transactionType,
		amount: order.amount,
		orderStatus: order.orderStatus,
		createdAt: order.createdAt ?? null,
		updatedAt: order.updatedAt ?? null,
	};
}

function mapPortfolioContest(
	item: SymbolPortfolioContestResponse,
): SymbolTradingContestViewModel {
	const investment = item.investment;
	const orders = item.orders ?? item.investmentOrders ?? [];

	return {
		contestId: item.contest?.contestId ?? item.contestId ?? 0,
		contestName:
			item.contest?.contestName ?? item.contestName ?? "Unknown contest",
		contestStatus:
			item.contest?.contestStatus ?? item.contestStatus ?? "UNKNOWN",
		startTime: item.contest?.startTime ?? item.startTime ?? "",
		endTime: item.contest?.endTime ?? item.endTime ?? "",
		remainingFunds: toFiniteNumber(
			item.remainingFunds ?? item.participant?.remainingFunds,
		),
		investment: {
			amount: toFiniteNumber(investment?.amount),
			totalCost: toFiniteNumber(investment?.totalCost),
			totalProfit: toFiniteNumber(investment?.totalProfit),
			totalProfitPercentage: toFiniteNumber(investment?.totalProfitPercentage),
			totalValue: toFiniteNumber(investment?.totalValue),
		},
		orders: orders.map(mapTradingOrder),
	};
}

function getDummyOrders(symbol: string): InvestmentOrder[] {
	const normalizedSymbol = normalizeSymbol(symbol);
	const existingOrders = dummyOrdersBySymbol.get(normalizedSymbol);
	if (existingOrders) {
		return existingOrders;
	}

	const initialOrders: InvestmentOrder[] = [
		{
			investmentOrderId: 9_001,
			contestId: 101,
			symbol: normalizedSymbol,
			transactionType: TRANSACTION_TYPE.BUY,
			amount: 5,
			orderStatus: ORDER_STATUS.COMPLETED,
			createdAt: "2026-05-12T09:30:00Z",
			updatedAt: "2026-05-12T09:30:08Z",
		},
		{
			investmentOrderId: 9_002,
			contestId: 102,
			symbol: normalizedSymbol,
			transactionType: TRANSACTION_TYPE.BUY,
			amount: 3,
			orderStatus: ORDER_STATUS.FAILED,
			createdAt: "2026-05-13T13:15:00Z",
			updatedAt: "2026-05-13T13:15:04Z",
		},
	];

	dummyOrdersBySymbol.set(normalizedSymbol, initialOrders);
	return initialOrders;
}

function getDummySymbolTradingData(symbol: string): SymbolTradingViewModel {
	const normalizedSymbol = normalizeSymbol(symbol);
	const orders = getDummyOrders(normalizedSymbol);

	return {
		symbol: normalizedSymbol,
		contests: [
			{
				contestId: 101,
				contestName: "Spring Trading League",
				contestStatus: CONTEST_STATUS.RUNNING,
				startTime: "2026-05-01T08:00:00Z",
				endTime: "2026-06-01T08:00:00Z",
				remainingFunds: 14_820.75,
				investment: {
					amount: 12,
					totalCost: 2_040,
					totalProfit: 318.24,
					totalProfitPercentage: 15.6,
					totalValue: 2_358.24,
				},
				orders: orders
					.filter((order) => order.contestId === 101)
					.map(mapTradingOrder),
			},
			{
				contestId: 102,
				contestName: "Nordic Momentum",
				contestStatus: CONTEST_STATUS.RUNNING,
				startTime: "2026-05-10T08:00:00Z",
				endTime: "2026-05-31T08:00:00Z",
				remainingFunds: 8_500,
				investment: {
					amount: 0,
					totalCost: 0,
					totalProfit: 0,
					totalProfitPercentage: 0,
					totalValue: 0,
				},
				orders: orders
					.filter((order) => order.contestId === 102)
					.map(mapTradingOrder),
			},
			{
				contestId: 103,
				contestName: "Summer Value Challenge",
				contestStatus: CONTEST_STATUS.AWAITING_START,
				startTime: "2026-06-03T08:00:00Z",
				endTime: "2026-07-03T08:00:00Z",
				remainingFunds: 10_000,
				investment: {
					amount: 4,
					totalCost: 720,
					totalProfit: -42.8,
					totalProfitPercentage: -5.94,
					totalValue: 677.2,
				},
				orders: [],
			},
		],
	};
}

export async function getSymbolTradingData(
	symbol: string,
): Promise<SymbolTradingViewModel> {
	const normalizedSymbol = normalizeSymbol(symbol);
	if (USE_DUMMY_TRADING_DATA) {
		return getDummySymbolTradingData(normalizedSymbol);
	}

	const contests = await resourceGet<SymbolPortfolioContestResponse[]>({
		url: `/participants/registered/symbols/${encodeURIComponent(
			normalizedSymbol,
		)}/portfolio`,
	});

	return {
		symbol: normalizedSymbol,
		contests: contests.map(mapPortfolioContest),
	};
}

export async function createInvestmentOrder(
	request: CreateInvestmentOrderRequest,
): Promise<InvestmentOrder | null> {
	if (USE_DUMMY_TRADING_DATA) {
		const normalizedSymbol = normalizeSymbol(request.symbol);
		const order: InvestmentOrder = {
			investmentOrderId: dummyOrderSequence++,
			contestId: request.contestId,
			symbol: normalizedSymbol,
			transactionType: request.transactionType,
			amount: request.amount,
			orderStatus: ORDER_STATUS.ACTIVE,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
		};
		const orders = getDummyOrders(normalizedSymbol);
		dummyOrdersBySymbol.set(normalizedSymbol, [order, ...orders]);

		return order;
	}

	return resourcePost<InvestmentOrder | null>({
		url: "/investment-orders",
		body: {
			contestId: request.contestId,
			symbol: normalizeSymbol(request.symbol),
			transactionType: request.transactionType,
			amount: request.amount,
		},
	});
}

export function isTransactionType(value: unknown): value is TransactionType {
	return value === "BUY" || value === "SELL";
}
