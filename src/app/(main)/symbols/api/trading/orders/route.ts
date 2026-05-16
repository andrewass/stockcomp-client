import { isApiHttpStatusError } from "@/api/httpClient.ts";
import { isUnauthenticatedError } from "@/api/resourceServerClient.ts";
import {
	createInvestmentOrder,
	isTransactionType,
} from "@/symbols/api/tradingData.ts";

interface CreateInvestmentOrderBody {
	contestId?: unknown;
	participantId?: unknown;
	symbol?: unknown;
	transactionType?: unknown;
	amount?: unknown;
	totalAmount?: unknown;
	currency?: unknown;
	acceptedPrice?: unknown;
	expirationTime?: unknown;
}

function parsePositiveInteger(value: unknown): number | null {
	return typeof value === "number" && Number.isInteger(value) && value > 0
		? value
		: null;
}

function parseFutureLocalDateTime(value: unknown): string | null {
	if (typeof value !== "string" || !value.trim()) {
		return null;
	}

	const expirationTimestamp = Date.parse(value);
	if (Number.isNaN(expirationTimestamp) || expirationTimestamp <= Date.now()) {
		return null;
	}

	return value.trim();
}

function toErrorResponse(error: unknown): Response {
	if (isUnauthenticatedError(error)) {
		return Response.json(
			{ message: "Authentication required." },
			{ status: 401 },
		);
	}

	if (isApiHttpStatusError(error, 400) || isApiHttpStatusError(error, 404)) {
		return Response.json(
			{ message: "Unable to create investment order." },
			{ status: error.status },
		);
	}

	return Response.json(
		{ message: "Unable to create investment order." },
		{ status: 502 },
	);
}

export async function POST(request: Request): Promise<Response> {
	let body: CreateInvestmentOrderBody;
	try {
		body = (await request.json()) as CreateInvestmentOrderBody;
	} catch {
		return Response.json({ message: "Invalid JSON body." }, { status: 400 });
	}

	const contestId = parsePositiveInteger(body.contestId);
	const participantId = parsePositiveInteger(body.participantId);
	const totalAmount = parsePositiveInteger(body.totalAmount ?? body.amount);
	const symbol =
		typeof body.symbol === "string" ? body.symbol.trim().toUpperCase() : "";
	const currency =
		typeof body.currency === "string" ? body.currency.trim().toUpperCase() : "";
	const acceptedPrice =
		typeof body.acceptedPrice === "number" &&
		Number.isFinite(body.acceptedPrice) &&
		body.acceptedPrice > 0
			? body.acceptedPrice
			: null;
	const expirationTime = parseFutureLocalDateTime(body.expirationTime);

	if (
		!contestId ||
		!participantId ||
		!totalAmount ||
		!symbol ||
		!currency ||
		!acceptedPrice ||
		!expirationTime ||
		!isTransactionType(body.transactionType)
	) {
		return Response.json(
			{
				message:
					"contestId, participantId, symbol, transactionType, currency, acceptedPrice, expirationTime, and positive integer totalAmount are required.",
			},
			{ status: 400 },
		);
	}

	try {
		const order = await createInvestmentOrder({
			participantId,
			symbol,
			transactionType: body.transactionType,
			totalAmount,
			currency,
			acceptedPrice,
			expirationTime,
		});

		return Response.json(order ?? null, { status: 201 });
	} catch (error) {
		return toErrorResponse(error);
	}
}
