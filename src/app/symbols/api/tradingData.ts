import "server-only";
import { isApiHttpStatusError } from "@/api/httpClient.ts";
import { resourceGet, resourcePost } from "@/api/resourceServerClient.ts";
import type { Contest } from "@/domain/contests/contestTypes.ts";
import type {
	CreateInvestmentOrderRequest,
	TransactionType,
} from "@/domain/investmentorder/investmentOrderTypes.ts";
import type {
	SymbolTradingContestViewModel,
	SymbolTradingOrderViewModel,
	SymbolTradingViewModel,
} from "@/symbols/domain.ts";

interface UserParticipantDto {
	participantId: number;
	remainingFunds: number;
}

interface ContestParticipantDto {
	contest: Contest;
	participant: UserParticipantDto;
}

interface InvestmentDto {
	symbol: string;
	amount: number;
	averageUnitCost: number;
	totalProfit: number;
	totalValue: number;
}

interface InvestmentOrderDto {
	orderId: number | null;
	symbol: string;
	totalAmount: number;
	remainingAmount: number;
	acceptedPrice: number;
	currency: string;
	expirationTime: string;
	transactionType: TransactionType;
	orderStatus: string;
}

interface DetailedParticipantDto {
	contest: Contest;
	participant: UserParticipantDto;
	investments: InvestmentDto[];
	activeOrders: InvestmentOrderDto[];
	completedOrders: InvestmentOrderDto[];
}

function normalizeSymbol(symbol: string): string {
	return symbol.trim().toUpperCase();
}

function toFiniteNumber(value: number | null | undefined): number {
	return value === undefined || value === null || !Number.isFinite(value)
		? 0
		: value;
}

function getDefaultExpirationTime(): string {
	const expiration = new Date(Date.now() + 24 * 60 * 60 * 1000);
	return expiration.toISOString().slice(0, 19);
}

function mapTradingOrder(
	order: InvestmentOrderDto,
): SymbolTradingOrderViewModel {
	return {
		investmentOrderId: order.orderId,
		transactionType: order.transactionType,
		totalAmount: order.totalAmount,
		remainingAmount: order.remainingAmount,
		acceptedPrice: order.acceptedPrice,
		currency: order.currency,
		orderStatus: order.orderStatus,
		expirationTime: order.expirationTime,
	};
}

function mapContestTradingData(
	registeredContest: ContestParticipantDto,
	detailedParticipant: DetailedParticipantDto | null,
	symbol: string,
): SymbolTradingContestViewModel {
	const investment = detailedParticipant?.investments.find(
		(item) => normalizeSymbol(item.symbol) === symbol,
	);
	const totalCost =
		toFiniteNumber(investment?.averageUnitCost) *
		toFiniteNumber(investment?.amount);
	const totalProfit = toFiniteNumber(investment?.totalProfit);
	const orders = [
		...(detailedParticipant?.activeOrders ?? []),
		...(detailedParticipant?.completedOrders ?? []),
	].filter((order) => normalizeSymbol(order.symbol) === symbol);

	return {
		contestId: registeredContest.contest.contestId,
		participantId: registeredContest.participant.participantId,
		contestName: registeredContest.contest.contestName,
		contestStatus: registeredContest.contest.contestStatus,
		startTime: registeredContest.contest.startTime,
		endTime: registeredContest.contest.endTime,
		remainingFunds: toFiniteNumber(
			detailedParticipant?.participant.remainingFunds ??
				registeredContest.participant.remainingFunds,
		),
		investment: {
			amount: toFiniteNumber(investment?.amount),
			totalCost,
			totalProfit,
			totalProfitPercentage:
				totalCost === 0 ? 0 : (totalProfit / totalCost) * 100,
			totalValue: toFiniteNumber(investment?.totalValue),
		},
		orders: orders.map(mapTradingOrder),
	};
}

async function getRegisteredContests(): Promise<ContestParticipantDto[]> {
	return resourceGet<ContestParticipantDto[]>({
		url: "/participants/registered",
	});
}

async function getDetailedParticipantForContest(
	contestId: number,
): Promise<DetailedParticipantDto | null> {
	try {
		return await resourceGet<DetailedParticipantDto | null>({
			url: `/participants/detailed/contest/${contestId}`,
		});
	} catch (error) {
		if (isApiHttpStatusError(error, 404)) {
			return null;
		}

		throw error;
	}
}

export async function getSymbolTradingData(
	symbol: string,
): Promise<SymbolTradingViewModel> {
	const normalizedSymbol = normalizeSymbol(symbol);
	const registeredContests = await getRegisteredContests();
	const detailedParticipants = await Promise.all(
		registeredContests.map((registeredContest) =>
			getDetailedParticipantForContest(registeredContest.contest.contestId),
		),
	);

	return {
		symbol: normalizedSymbol,
		contests: registeredContests.map((registeredContest, index) =>
			mapContestTradingData(
				registeredContest,
				detailedParticipants[index] ?? null,
				normalizedSymbol,
			),
		),
	};
}

export async function createInvestmentOrder(
	request: CreateInvestmentOrderRequest,
): Promise<void> {
	await resourcePost<void>({
		url: "/participants/investmentorders/order",
		body: {
			participantId: request.participantId,
			symbol: normalizeSymbol(request.symbol),
			amount: request.totalAmount,
			currency: request.currency,
			expirationTime: request.expirationTime || getDefaultExpirationTime(),
			acceptedPrice: request.acceptedPrice,
			transactionType: request.transactionType,
		},
	});
}

export function isTransactionType(value: unknown): value is TransactionType {
	return value === "BUY" || value === "SELL";
}
