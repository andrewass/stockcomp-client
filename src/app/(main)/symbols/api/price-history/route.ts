import { isApiHttpStatusError } from "@/api/httpClient.ts";
import { getSymbolPriceHistoryData } from "@/symbols/priceHistoryData.ts";
import { parsePriceHistoryPeriod } from "@/symbols/priceHistoryPeriods.ts";

function getSymbolFromRequest(request: Request): string | null {
	const { searchParams } = new URL(request.url);
	const symbol = searchParams.get("symbol")?.trim().toUpperCase();

	return symbol ? symbol : null;
}

function getPeriodFromRequest(request: Request) {
	const { searchParams } = new URL(request.url);
	return parsePriceHistoryPeriod(searchParams.get("period") ?? undefined);
}

function toErrorResponse(error: unknown): Response {
	if (isApiHttpStatusError(error, 400) || isApiHttpStatusError(error, 404)) {
		return Response.json(
			{ message: "Unable to load price history." },
			{ status: error.status },
		);
	}

	return Response.json(
		{ message: "Unable to load price history." },
		{ status: 502 },
	);
}

export async function GET(request: Request): Promise<Response> {
	const symbol = getSymbolFromRequest(request);
	if (!symbol) {
		return Response.json({ message: "symbol is required." }, { status: 400 });
	}

	try {
		const history = await getSymbolPriceHistoryData(
			symbol,
			getPeriodFromRequest(request),
		);
		return Response.json({ history });
	} catch (error) {
		return toErrorResponse(error);
	}
}
