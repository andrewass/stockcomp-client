import "server-only";
import { isApiHttpStatusError } from "@/api/httpClient.ts";
import { resourceGet, resourcePost } from "@/api/resourceServerClient.ts";
import {
	type ContestDto,
	mapContestDto,
} from "@/contests/contestDataMappers.ts";
import {
	CONTEST_STATUS,
	type Contest,
} from "@/domain/contests/contestTypes.ts";
import type {
	SymbolContestInvestmentStatusViewModel,
	SymbolContestListItemViewModel,
} from "@/symbols/domain.ts";

interface UserParticipantDto {
	rank?: number | null;
	totalValue: number;
	totalInvestmentValue: number;
	remainingFunds: number;
}

interface ContestParticipantDto {
	contest: ContestDto;
	participant: UserParticipantDto;
}

interface InvestmentDto {
	totalProfit: number;
}

interface DetailedParticipantDto {
	participant: UserParticipantDto;
	investments: InvestmentDto[];
}

type ContestListResponseItemDto = ContestDto | ContestParticipantDto;

export async function getUnregisteredContests(): Promise<
	SymbolContestListItemViewModel[]
> {
	const contests = await resourceGet<ContestListResponseItemDto[]>({
		url: "/participants/unregistered",
	});
	return mapToSymbolContestListItemViewModel(contests);
}

export async function getRegisteredContests(): Promise<
	SymbolContestListItemViewModel[]
> {
	const contests = await resourceGet<ContestListResponseItemDto[]>({
		url: "/participants/registered",
	});
	const detailedParticipantsByContestId =
		await getRunningDetailedParticipantsByContestId(contests);

	return mapToSymbolContestListItemViewModel(
		contests,
		detailedParticipantsByContestId,
	);
}

export async function signUpParticipant(contestId: number): Promise<void> {
	await resourcePost<void>({
		url: "/participants/sign-up",
		body: {
			contestId,
		} satisfies SignUpParticipantRequest,
	});
}

function mapContestListResponseItem(item: ContestListResponseItemDto): Contest {
	const contest = "contest" in item ? item.contest : item;
	return mapContestDto(contest);
}

function mapToSymbolContestListItemViewModel(
	contests: ContestListResponseItemDto[],
	detailedParticipantsByContestId: Map<
		number,
		DetailedParticipantDto
	> = new Map(),
): SymbolContestListItemViewModel[] {
	return contests.map((item) => {
		const contest = mapContestListResponseItem(item);
		const detailedParticipant = detailedParticipantsByContestId.get(
			contest.contestId,
		);

		return {
			contestId: contest.contestId,
			contestName: contest.contestName,
			contestStatus: contest.contestStatus,
			startTime: contest.startTime,
			endTime: contest.endTime,
			investmentStatus: detailedParticipant
				? mapInvestmentStatus(detailedParticipant)
				: undefined,
		};
	});
}

interface SignUpParticipantRequest {
	contestId: number;
}

async function getDetailedParticipantForContest(
	contestId: number,
): Promise<DetailedParticipantDto | null> {
	try {
		return await resourceGet<DetailedParticipantDto | null>({
			url: `/participants/detailed/contest/${contestId}`,
		});
	} catch (error) {
		if (isApiHttpStatusError(error, 400) || isApiHttpStatusError(error, 404)) {
			return null;
		}

		throw error;
	}
}

async function getRunningDetailedParticipantsByContestId(
	contests: ContestListResponseItemDto[],
): Promise<Map<number, DetailedParticipantDto>> {
	const runningContests = contests
		.map(mapContestListResponseItem)
		.filter((contest) => contest.contestStatus === CONTEST_STATUS.RUNNING);

	const detailedParticipants = await Promise.all(
		runningContests.map((contest) =>
			getDetailedParticipantForContest(contest.contestId),
		),
	);

	return new Map(
		detailedParticipants.flatMap((detailedParticipant, index) =>
			detailedParticipant
				? [[runningContests[index].contestId, detailedParticipant]]
				: [],
		),
	);
}

function toFiniteNumber(value: number | null | undefined): number {
	return value === undefined || value === null || !Number.isFinite(value)
		? 0
		: value;
}

function mapInvestmentStatus(
	detailedParticipant: DetailedParticipantDto,
): SymbolContestInvestmentStatusViewModel {
	return {
		remainingFunds: toFiniteNumber(
			detailedParticipant.participant.remainingFunds,
		),
		totalInvestmentValue: toFiniteNumber(
			detailedParticipant.participant.totalInvestmentValue,
		),
		totalProfit: detailedParticipant.investments.reduce(
			(sum, investment) => sum + toFiniteNumber(investment.totalProfit),
			0,
		),
		totalValue: toFiniteNumber(detailedParticipant.participant.totalValue),
		rank: detailedParticipant.participant.rank ?? null,
	};
}
