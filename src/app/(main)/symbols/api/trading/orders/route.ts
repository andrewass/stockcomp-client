import {
	parseJsonRequestBody,
	toRouteErrorResponse,
} from "@/api/routeHandlerResponses.ts";
import { parseIsoInstant } from "@/lib/dateTime.ts";
import {
	cancelInvestmentOrder,
	createInvestmentOrder,
	isTransactionType,
} from "@/symbols/detail/trading/tradingData.ts";

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

function parseFutureIsoInstant(value: unknown): string | null {
	const isoInstant = parseIsoInstant(value);
	if (!isoInstant || Date.parse(isoInstant) <= Date.now()) {
		return null;
	}

	return isoInstant;
}

function toErrorResponse(error: unknown): Response {
	return toRouteErrorResponse(error, {
		message: "Unable to create investment order.",
	});
}

function toCancelErrorResponse(error: unknown): Response {
	return toRouteErrorResponse(error, {
		message: "Unable to cancel investment order.",
	});
}

export async function POST(request: Request): Promise<Response> {
	const parsedBody =
		await parseJsonRequestBody<CreateInvestmentOrderBody>(request);
	if (!parsedBody.ok) {
		return parsedBody.response;
	}

	const body = parsedBody.body;
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
	const expirationTime = parseFutureIsoInstant(body.expirationTime);

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

export async function DELETE(request: Request): Promise<Response> {
	const { searchParams } = new URL(request.url);
	const contestId = parsePositiveInteger(Number(searchParams.get("contestId")));
	const orderId = parsePositiveInteger(Number(searchParams.get("orderId")));

	if (!contestId || !orderId) {
		return Response.json(
			{ message: "contestId and orderId are required." },
			{ status: 400 },
		);
	}

	try {
		await cancelInvestmentOrder({ contestId, orderId });
		return new Response(null, { status: 204 });
	} catch (error) {
		return toCancelErrorResponse(error);
	}
}
