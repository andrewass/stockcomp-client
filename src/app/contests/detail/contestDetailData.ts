import "server-only";
import { isApiHttpStatusError } from "@/api/httpClient.ts";
import {
	isUnauthenticatedError,
	resourceGet,
} from "@/api/resourceServerClient.ts";
import {
	type ContestDto,
	mapContestDto,
} from "@/contests/contestDataMappers.ts";
import type {
	ContestLeaderboardPage,
	ContestParticipantDetail,
	ContestParticipantInvestmentOrder,
} from "@/domain/contests/contestParticipantTypes.ts";
import type { Contest } from "@/domain/contests/contestTypes.ts";
import { isInvestmentOrderStatus } from "@/domain/investmentorder/investmentOrderTypes.ts";

export interface ContestDetailPageData {
	contest: Contest;
	leaderboard: ContestLeaderboardPage;
	participantDetail: ContestParticipantDetail | null;
}

type ContestParticipantInvestmentOrderDto = Omit<
	ContestParticipantInvestmentOrder,
	"orderStatus"
> & {
	orderStatus: unknown;
};

type ContestParticipantDetailDto = Omit<
	ContestParticipantDetail,
	"activeOrders" | "completedOrders" | "contest"
> & {
	activeOrders: ContestParticipantInvestmentOrderDto[];
	completedOrders: ContestParticipantInvestmentOrderDto[];
	contest: ContestDto;
};

function mapInvestmentOrderStatus(
	value: unknown,
): ContestParticipantInvestmentOrder["orderStatus"] {
	if (isInvestmentOrderStatus(value)) {
		return value;
	}

	throw new Error(
		"Unknown investment order status returned by resource server.",
	);
}

function mapInvestmentOrderDto(
	order: ContestParticipantInvestmentOrderDto,
): ContestParticipantInvestmentOrder {
	return {
		...order,
		orderStatus: mapInvestmentOrderStatus(order.orderStatus),
	};
}

function mapContestParticipantDetailDto(
	detail: ContestParticipantDetailDto,
): ContestParticipantDetail {
	return {
		...detail,
		contest: mapContestDto(detail.contest),
		activeOrders: detail.activeOrders.map(mapInvestmentOrderDto),
		completedOrders: detail.completedOrders.map(mapInvestmentOrderDto),
	};
}

async function getContest(contestId: number): Promise<Contest> {
	const contest = await resourceGet<ContestDto>({
		url: `/contests/${contestId}`,
	});

	return mapContestDto(contest);
}

async function getContestLeaderboard(
	contestId: number,
	pageNumber: number,
	pageSize: number,
): Promise<ContestLeaderboardPage> {
	return resourceGet<ContestLeaderboardPage>({
		url: "/participants/sorted",
		params: { contestId, pageNumber, pageSize },
	});
}

async function getParticipantDetailForContest(
	contestId: number,
): Promise<ContestParticipantDetail | null> {
	try {
		const detail = await resourceGet<ContestParticipantDetailDto>({
			url: `/participants/detailed/contest/${contestId}`,
		});

		return mapContestParticipantDetailDto(detail);
	} catch (error) {
		if (isUnauthenticatedError(error)) {
			throw error;
		}

		if (isApiHttpStatusError(error, 400) || isApiHttpStatusError(error, 404)) {
			return null;
		}

		throw error;
	}
}

export async function getContestDetailPageData(
	contestId: number,
	pageNumber: number,
	pageSize: number,
): Promise<ContestDetailPageData | null> {
	try {
		const [contest, leaderboard, participantDetail] = await Promise.all([
			getContest(contestId),
			getContestLeaderboard(contestId, pageNumber, pageSize),
			getParticipantDetailForContest(contestId),
		]);

		return {
			contest,
			leaderboard,
			participantDetail,
		};
	} catch (error) {
		if (isApiHttpStatusError(error, 404)) {
			return null;
		}

		throw error;
	}
}
