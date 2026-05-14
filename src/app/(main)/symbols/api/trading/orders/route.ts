import { isApiHttpStatusError } from "@/api/httpClient.ts";
import { isUnauthenticatedError } from "@/api/resourceServerClient.ts";
import {
	createInvestmentOrder,
	isTransactionType,
} from "@/symbols/api/tradingData.ts";

interface CreateInvestmentOrderBody {
	contestId?: unknown;
	symbol?: unknown;
	transactionType?: unknown;
	amount?: unknown;
}

function parsePositiveInteger(value: unknown): number | null {
	return typeof value === "number" && Number.isInteger(value) && value > 0
		? value
		: null;
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
	const amount = parsePositiveInteger(body.amount);
	const symbol =
		typeof body.symbol === "string" ? body.symbol.trim().toUpperCase() : "";

	if (
		!contestId ||
		!amount ||
		!symbol ||
		!isTransactionType(body.transactionType)
	) {
		return Response.json(
			{
				message:
					"contestId, symbol, transactionType, and positive integer amount are required.",
			},
			{ status: 400 },
		);
	}

	try {
		const order = await createInvestmentOrder({
			contestId,
			symbol,
			transactionType: body.transactionType,
			amount,
		});

		return Response.json(order, { status: 201 });
	} catch (error) {
		return toErrorResponse(error);
	}
}
